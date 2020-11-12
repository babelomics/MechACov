import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import React from 'react';
import MechACovClient from '../../../clients/MechacovClient';


interface ComponentProps {
    open: boolean;
    values: string[] | undefined;
    setValues: (newValues: string[]) => void;
    onClose: () => void;
}


interface ComponentState {
    values: string[];
    allValues: string[];
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();

    state = {
        values: [],
        allValues: [],
    };

    componentDidMount() {
        this.fetchSampleValues();
        this.setState({ values: this.props.values || [] });
    }

    componentDidUpdate(prevProps: ComponentProps) {
        if (this.props.open && !prevProps.open && this.props.values !== this.state.values) {
            this.setState({ values: this.props.values || [] });
        }
        if (prevProps.open && !this.props.open && 0 < this.state.values.length) {
            this.setState({ values: [] });
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }


    render() {
        const { open } = this.props;
        const { values, allValues } = this.state;
        const active = 0 < (values.length || []);
        return (
            <Dialog open={open} onClose={this.handleAccept}>
                <DialogTitle>
                    Select groups
                </DialogTitle>
                <DialogContent dividers>
                    <FormControl component="fieldset">
                        {/* <FormLabel component="legend">Select the studies:</FormLabel> */}
                        <FormGroup>
                            {
                                allValues.map(study => (
                                    <FormControlLabel key={study} label={study} control={<Checkbox checked={values.includes(study)} onChange={this.handleChange} name={study} />} />
                                ))
                            }
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button disabled={0 === values.length} onClick={this.handleClear}>Clear</Button>
                    <Button variant="contained" color="primary" onClick={this.handleAccept}>Accept</Button>
                </DialogActions>
            </Dialog>

        );
    }

    private readonly handleAccept = () => {
        const { onClose, values: filterValues, setValues } = this.props;
        const { values } = this.state;
        if (values !== filterValues) {
            setValues(values);
        }
        onClose();
    }

    private readonly fetchSampleValues = async () => {
        this.abortController = new AbortController();
        const studies = MechACovClient.getGroups(this.abortController.signal).then((values: string[]) => {
            this.setState({ allValues: values });
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {
                // TODO
            }
        });
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const values = this.state.values as string[];
        const group = event.target.name as string;
        const checked = !!event.target.checked;
        const existing = values.includes(group);
        if (checked && !existing) {
            const newValues = [...values, group];
            this.setState({ values: newValues });
        } else if (!checked && existing) {
            const newValues = values.filter(x => group !== x);
            this.setState({ values: newValues });
        }
    }

    private readonly handleClear = () => {
        const { values, setValues, onClose } = this.props;
        if (0 < (values || []).length) {
            setValues([]);
        }
        onClose();
    }
}


export default Component;