
import React from 'react';
import { TableRow, TableCell, LinearProgress } from '@material-ui/core';
import { Waypoint } from 'react-waypoint';

// TODO: define a criteria for these params and compute them
const maxPageCount = 20;
const pageSize = 25;


interface ComponentProps<T> {
    items: T[];
    setItems: (newItems: T[]) => void;
    children: React.ReactNode;
    token: any;
    fetchPage: (pageNumber: number, pageSize: number, abortSignal: AbortSignal) => Promise<T[]>;
}


enum ComponentStatus { IDLE, LOADING_HEAD, LOADING_TAIL, ERROR, RESET };


interface ComponentState {
    status: ComponentStatus;
    startPage: number;
    endPage: number;
    endPageItemCount: number;
}


const Wrapper = (props: any) => (
    <TableRow>
        <TableCell colSpan={10}>
            {props.children}
        </TableCell>
    </TableRow>
);


class LazyTable<T> extends React.PureComponent<ComponentProps<T>, ComponentState> {

    private abortController: AbortController = new AbortController();

    state = {
        status: ComponentStatus.IDLE,
        startPage: 0,
        endPage: 0,
        endPageItemCount: 0,
    };

    componentDidMount() {
        this.setItems([]);
    }

    componentDidUpdate(prevProps: ComponentProps<T>, prevState: ComponentState) {
        if (this.props.token !== prevProps.token) {
            this.abortController.abort();
            this.abortController = new AbortController();
            this.setState({ status: ComponentStatus.RESET });
            this.clearItems();
        }
        if (((prevProps.items !== this.props.items) || (prevState.status !== this.state.status)) && ComponentStatus.RESET === this.state.status && 0 === this.props.items.length) {
            this.setState({
                status: ComponentStatus.IDLE,
                startPage: 0,
                endPage: 0,
                endPageItemCount: 0,
            });
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        const status = this.state.status;
        if (ComponentStatus.ERROR === status) {
            return this.renderError();
        } else if (ComponentStatus.RESET === status) {
            return this.renderReset();
        } else {
            return this.renderIdle();
        }
    }

    private renderReset = () => (
        <Wrapper>
            Rendering
        </Wrapper>
    );

    private renderError = () => (
        <Wrapper>Error</Wrapper>
    );

    private renderIdle = () => {
        const { startPage, endPage, endPageItemCount, status } = this.state;
        const lastPageLoaded = 0 !== endPage && endPageItemCount < pageSize;
        const startProbeVisible = ComponentStatus.IDLE === status && 0 < startPage;
        const endProbeVisible = ComponentStatus.IDLE === status && !lastPageLoaded;
        return (
            <>
                {
                    ComponentStatus.LOADING_HEAD === status && <Wrapper>
                        <LinearProgress variant="query" />
                    </Wrapper>
                }
                {
                    startProbeVisible && <Wrapper>
                        <Waypoint onEnter={this.fetchHead} />
                    </Wrapper>
                }
                {
                    this.props.children
                }
                {
                    endProbeVisible && <Wrapper>
                        <Waypoint key={this.props.token} onEnter={this.fetchTail} />
                    </Wrapper>
                }
                {
                    ComponentStatus.LOADING_TAIL === status && <Wrapper>
                        <LinearProgress variant="query" />
                    </Wrapper>
                }
            </>

        );
    };

    private fetchHead = () => {
        this.abortController.abort();
        this.abortController = new AbortController();
        this.setState({
            status: ComponentStatus.LOADING_HEAD
        });
        const { startPage, endPage, endPageItemCount } = this.state;
        this.props.fetchPage(startPage, pageSize, this.abortController.signal).then((itemsToAdd: T[]) => {
            const newStartPage = startPage - 1;
            let newEndPage = endPage;
            let newEndPageItemCount = endPageItemCount;
            let newItems = this.addItemsAtStart(this.props.items, itemsToAdd);
            const newPageCount = endPage - newStartPage;
            if (maxPageCount < newPageCount) {
                newEndPage = endPage - 1;
                newEndPageItemCount = pageSize;
                newItems = this.removeItemsAtEnd(newItems, endPageItemCount);
            }
            this.setItems(newItems);
            this.setState({
                status: ComponentStatus.IDLE,
                startPage: newStartPage,
                endPage: newEndPage,
                endPageItemCount: newEndPageItemCount
            });
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {
                this.setState({
                    status: ComponentStatus.ERROR
                });
            }
        });
    }

    private fetchTail = () => {
        this.abortController.abort();
        this.abortController = new AbortController();
        this.setState({
            status: ComponentStatus.LOADING_TAIL
        });
        const { startPage, endPage, endPageItemCount } = this.state;
        this.props.fetchPage(endPage, pageSize, this.abortController.signal).then((itemsToAdd: any[]) => {
            const newEndPage = endPage + 1;
            const newEndPageItemCount = itemsToAdd.length;
            const newPageCount = newEndPage - startPage;
            let newStartPage = startPage;
            let newItems = this.addItemsAtEnd(this.props.items, itemsToAdd);
            if (maxPageCount < newPageCount) {
                newItems = this.removeItemsAtStart(newItems, pageSize);
                newStartPage = startPage + 1;
            }
            this.setItems(newItems);
            this.setState({
                status: ComponentStatus.IDLE,
                startPage: newStartPage,
                endPage: newEndPage,
                endPageItemCount: newEndPageItemCount
            });
        }).catch((error: Error) => {
            if (undefined !== error && "AbortError" !== error.name) {
                this.setState({ status: ComponentStatus.ERROR });
            }
        });
    }

    private removeItemsAtStart = (items: T[], count: number) => {
        return 0 === count || 0 === items.length ? items : (items.length <= count ? [] : items.slice(count));
    }

    private removeItemsAtEnd = (items: T[], count: number) => {
        return 0 === count || 0 === items.length ? items : (items.length <= count ? [] : items.slice(0, items.length - count));
    }

    private addItemsAtStart = (items: T[], itemsToAdd: T[]) => {
        return 0 === itemsToAdd.length ? items : [...itemsToAdd, ...items];
    }

    private addItemsAtEnd = (items: T[], itemsToAdd: T[]) => {
        return 0 === itemsToAdd.length ? items : [...items, ...itemsToAdd];
    }

    private setItems = (newItems: T[]) => {
        this.props.setItems(newItems);
    }

    private clearItems = () => {
        this.props.setItems([]);
    }
}


export default LazyTable;
