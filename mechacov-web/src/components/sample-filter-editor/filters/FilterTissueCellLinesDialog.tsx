import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import React from 'react';
import MechACovClient from '../../../clients/MechacovClient';


interface ComponentProps {
    open: boolean;
    tissueCellLines: string[] | undefined;
    setTissueCellLines: (newTissueCellLines: string[]) => void;
    onClose: () => void;
}


interface ComponentState {
    tissueCellLines: string[];
    allTissueCellLines: string[];
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();

    state = {
        tissueCellLines: [],
        allTissueCellLines: [],
    };

    componentDidMount() {
        this.fetchSampleTissueCellLines();
        this.setState({ tissueCellLines: this.props.tissueCellLines || [] });
    }

    componentDidUpdate(prevProps: ComponentProps) {
        if (this.props.open && !prevProps.open && this.props.tissueCellLines !== this.state.tissueCellLines) {
            this.setState({ tissueCellLines: this.props.tissueCellLines || [] });
        }
        if (prevProps.open && !this.props.open && 0 < this.state.tissueCellLines.length) {
            this.setState({ tissueCellLines: [] });
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }


    render() {
        const { open } = this.props;
        const { tissueCellLines, allTissueCellLines } = this.state;
        const active = 0 < (tissueCellLines.length || []);
        return (
            <Dialog open={open} onClose={this.handleAccept}>
                <DialogTitle>
                    Select tissue cell lines
                </DialogTitle>
                <DialogContent dividers>
                    <FormControl component="fieldset">
                        {/* <FormLabel component="legend">Select the studies:</FormLabel> */}
                        <FormGroup>
                            {
                                allTissueCellLines.map(cellLine => (
                                    <FormControlLabel key={cellLine} label={cellLine} control={<Checkbox checked={tissueCellLines.includes(cellLine)} onChange={this.handleChange} name={cellLine} />} />
                                ))
                            }
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button disabled={0 === tissueCellLines.length} onClick={this.handleClear}>Clear</Button>
                    <Button variant="contained" color="primary" onClick={this.handleAccept}>Accept</Button>
                </DialogActions>
            </Dialog>

        );
    }

    private readonly handleAccept = () => {
        const { onClose, tissueCellLines: filterTissueCellLines, setTissueCellLines } = this.props;
        const { tissueCellLines } = this.state;
        if (tissueCellLines !== filterTissueCellLines) {
            setTissueCellLines(tissueCellLines);
        }
        onClose();
    }

    private readonly fetchSampleTissueCellLines = async () => {
        this.abortController = new AbortController();
        const studies = MechACovClient.getTissueCellLines(this.abortController.signal).then((cellLines: string[]) => {
            this.setState({ allTissueCellLines: cellLines });
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {
                // TODO
            }
        });
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tissueCellLines = this.state.tissueCellLines as string[];
        const cellLine = event.target.name as string;
        const checked = !!event.target.checked;
        const existing = tissueCellLines.includes(cellLine);
        if (checked && !existing) {
            const newTissueCellLines = [...tissueCellLines, cellLine];
            this.setState({ tissueCellLines: newTissueCellLines });
        } else if (!checked && existing) {
            const newTissueCellLines = tissueCellLines.filter(x => cellLine !== x);
            this.setState({ tissueCellLines: newTissueCellLines });
        }
    }

    private readonly handleClear = () => {
        const { tissueCellLines, setTissueCellLines, onClose } = this.props;
        if (0 < (tissueCellLines || []).length) {
            setTissueCellLines([]);
        }
        onClose();
    }
}


export default Component;