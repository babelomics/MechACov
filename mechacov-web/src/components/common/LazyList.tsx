import React, { useState, useEffect, useReducer } from 'react';
import { TableRow, TableCell, LinearProgress } from '@material-ui/core';
import { Waypoint } from 'react-waypoint';


// TODO: define a criteria for these params and compute them
const maxPageCount = 20;
const pageSize = 25;


const Wrapper = (props: any) => (
    <TableRow>
        <TableCell colSpan={10}>
            {props.children}
        </TableCell>
    </TableRow>
);


interface FetchingPageProps<T> {
    fetch: (abortSignal: AbortSignal) => Promise<T[]>;
    onSuccess: (items: T[]) => void;
    onError: (error: Error) => void;
}


function FetchingPage<T>(props: FetchingPageProps<T>) {
    const { fetch, onSuccess, onError } = props;
    useEffect(() => {
        const abortController = new AbortController();
        (async () => {
            try {
                const items = await fetch(abortController.signal);
                onSuccess(items);
            } catch (error) {
                if ("AbortError" !== error.name) {
                    onError(error);
                }
            }
        })();
        return () => {
            abortController.abort();
        }
    });
    return (
        <Wrapper>
            <LinearProgress variant="query" />
        </Wrapper>
    );
}


function removeItemsAtStart<T>(items: T[], count: number) {
    return 0 === count || 0 === items.length ? items : (items.length <= count ? [] : items.slice(count));
}

function removeItemsAtEnd<T>(items: T[], count: number) {
    return 0 === count || 0 === items.length ? items : (items.length <= count ? [] : items.slice(0, items.length - count));
}

function addItemsAtStart<T>(items: T[], itemsToAdd: T[]) {
    return 0 === itemsToAdd.length ? items : [...itemsToAdd, ...items];
}

function addItemsAtEnd<T>(items: T[], itemsToAdd: T[]) {
    return 0 === itemsToAdd.length ? items : [...items, ...itemsToAdd];
}


interface ComponentProps<T> {
    Wrapper?: React.ElementType;
    items: T[];
    setItems: (newItems: T[]) => void;
    children: React.ReactNode;
    token: any;
    fetchPage: (pageNumber: number, pageSize: number, abortSignal: AbortSignal) => Promise<T[]>;
}


enum ComponentStatus { IDLE, LOADING_HEAD, LOADING_TAIL, ERROR, RESET };


function LazyList<T>(props: ComponentProps<T>) {

    const { Wrapper, items, setItems, token, fetchPage, children } = props;
    const ActualWrapper = undefined === Wrapper ? React.Fragment : Wrapper;

    class ActionTypes {
        static readonly SET = "set";
        static readonly RESET = "reset";
        static readonly POST_RESET = "post-reset";
        static readonly FETCH_HEAD = "fetch-head";
        static readonly FETCH_TAIL = "fetch-tail";
        static readonly SET_ERROR = "set-error";
    }

    class Actions {
        static readonly reset = () => ({ type: ActionTypes.RESET });
        static readonly postReset = () => ({ type: ActionTypes.POST_RESET });
        static readonly fetchHead = () => ({ type: ActionTypes.FETCH_HEAD });
        static readonly fetchTail = () => ({ type: ActionTypes.FETCH_TAIL });
        static readonly set = (startPage: number, endPage: number, endPageItemCount: number) => ({
            type: ActionTypes.SET,
            startPage: startPage,
            endPage: endPage,
            endPageItemCount: endPageItemCount
        });
        static readonly setError = () => ({ type: ActionTypes.SET_ERROR });
    }

    function reducer(state: any, action: any) {
        switch (action.type) {
            case ActionTypes.RESET:
                return { ...state, status: ComponentStatus.RESET };
            case ActionTypes.POST_RESET:
                return {
                    status: ComponentStatus.IDLE,
                    startPage: 0,
                    endPage: 0,
                    endPageItemCount: 0
                };
            case ActionTypes.FETCH_HEAD:
                return { ...state, status: ComponentStatus.LOADING_HEAD };
            case ActionTypes.FETCH_TAIL:
                return { ...state, status: ComponentStatus.LOADING_TAIL };
            case ActionTypes.SET:
                return {
                    status: ComponentStatus.IDLE,
                    startPage: action.startPage,
                    endPage: action.endPage,
                    endPageItemCount: action.endPageItemCount
                };
            case ActionTypes.SET_ERROR:
                return {
                    status: ComponentStatus.ERROR,
                };
            default:
                return state;
        }
    }

    const defaultState = {
        status: ComponentStatus.IDLE,
        startPage: 0,
        endPage: 0,
        endPageItemCount: 0
    };
    const [state, dispatch] = useReducer(reducer, defaultState);

    /*
    const [status, setStatus] = useState(ComponentStatus.IDLE);
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [endPageItemCount, setEndPageItemCount] = useState(0);
    */

    useEffect(() => {
        dispatch(Actions.reset());
        setItems([]);
    }, [token]);

    useEffect(() => {
        if (ComponentStatus.RESET === state.status && 0 === items.length) {
            dispatch(Actions.postReset());
        }
    }, [items, state.status]);

    function renderReset() {
        return (
            <ActualWrapper>
                Rendering
            </ActualWrapper>
        );
    }

    function renderError() {
        return (
            <ActualWrapper>Error</ActualWrapper>
        );
    }

    function handleHeadVisible() {
        dispatch(Actions.fetchHead());
    }

    function handleTailVisible() {
        dispatch(Actions.fetchTail());
    }

    function handleHeadFetchSuccess(itemsToAdd: T[]) {
        const { startPage, endPage, endPageItemCount } = state;
        const newStartPage = startPage - 1;
        let newEndPage = endPage;
        let newEndPageItemCount = endPageItemCount;
        let newItems = addItemsAtStart(items, itemsToAdd);
        const newPageCount = endPage - newStartPage;
        if (maxPageCount < newPageCount) {
            newEndPage = endPage - 1;
            newEndPageItemCount = pageSize;
            newItems = removeItemsAtEnd(newItems, endPageItemCount);
        }
        setItems(newItems);
        dispatch(Actions.set(newStartPage, newEndPage, newEndPageItemCount));
    }

    function handleTailFetchSuccess(itemsToAdd: T[]) {
        const { startPage, endPage, endPageItemCount } = state;
        const newEndPage = endPage + 1;
        const newEndPageItemCount = itemsToAdd.length;
        const newPageCount = newEndPage - startPage;
        let newStartPage = startPage;
        let newItems = addItemsAtEnd(items, itemsToAdd);
        if (maxPageCount < newPageCount) {
            newItems = removeItemsAtStart(newItems, pageSize);
            newStartPage = startPage + 1;
        }
        setItems(newItems);
        dispatch(Actions.set(newStartPage, newEndPage, newEndPageItemCount));
    }

    function handleFetchFailure(error: Error) {
        if (undefined !== error && "AbortError" !== error.name) {
            dispatch(Actions.setError());
        }
    }

    async function fetchHead(abortSignal: AbortSignal) {
        return fetchPage(state.startPage, pageSize, abortSignal);
    }

    async function fetchTail(abortSignal: AbortSignal) {
        return fetchPage(state.endPage, pageSize, abortSignal);
    }

    function renderIdle() {
        const { status, startPage, endPage, endPageItemCount } = state;
        const lastPageLoaded = 0 !== endPage && endPageItemCount < pageSize;
        const startProbeVisible = ComponentStatus.IDLE === status && 0 < startPage;
        const endProbeVisible = ComponentStatus.IDLE === status && !lastPageLoaded;
        return (
            <>
                {ComponentStatus.LOADING_HEAD === status && <FetchingPage<T> fetch={fetchHead} onSuccess={handleHeadFetchSuccess} onError={handleFetchFailure} />}
                {startProbeVisible && <ActualWrapper><Waypoint onEnter={handleHeadVisible} /></ActualWrapper>}
                {children}
                {endProbeVisible && <ActualWrapper><Waypoint key={token} onEnter={handleTailVisible} /></ActualWrapper>}
                {ComponentStatus.LOADING_TAIL === status && <FetchingPage<T> fetch={fetchTail} onSuccess={handleTailFetchSuccess} onError={handleFetchFailure} />}
            </>
        );
    };

    switch (state.status) {
        case ComponentStatus.ERROR:
            return renderError();
        case ComponentStatus.RESET:
            return renderReset();
        default:
            return renderIdle();
    }
}


export default LazyList;