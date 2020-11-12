import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import React from 'react';
import MechACovClient from '../../../clients/MechacovClient';


interface ComponentProps {
    open: boolean;
    studyIds: string[] | undefined;
    setStudyIds: (newStudyIds: string[]) => void;
    onClose: () => void;
}


interface ComponentState {
    studyIds: string[];
    allStudyIds: string[];
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();

    state = {
        studyIds: [],
        allStudyIds: [],
    };

    componentDidMount() {
        this.fetchSampleStudies();
        this.setState({ studyIds: this.props.studyIds || [] });
    }

    componentDidUpdate(prevProps: ComponentProps) {
        if (this.props.open && !prevProps.open && this.props.studyIds !== this.state.studyIds) {
            this.setState({ studyIds: this.props.studyIds || [] });
        }
        if (prevProps.open && !this.props.open && 0 < this.state.studyIds.length) {
            this.setState({ studyIds: [] });
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }


    render() {
        const { open } = this.props;
        const { studyIds, allStudyIds } = this.state;
        const active = 0 < (studyIds.length || []);
        return (
            <Dialog open={open} onClose={this.handleAccept}>
                <DialogTitle>
                    Select studies
                </DialogTitle>
                <DialogContent dividers>
                    <FormControl component="fieldset">
                        {/* <FormLabel component="legend">Select the studies:</FormLabel> */}
                        <FormGroup>
                            {
                                allStudyIds.map(study => (
                                    <FormControlLabel key={study} label={study} control={<Checkbox checked={studyIds.includes(study)} onChange={this.handleChange} name={study} />} />
                                ))
                            }
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button disabled={0 === studyIds.length} onClick={this.handleClear}>Clear</Button>
                    <Button variant="contained" color="primary" onClick={this.handleAccept}>Accept</Button>
                </DialogActions>
            </Dialog>

        );
    }

    private readonly handleAccept = () => {
        const { onClose, studyIds: filterStudyIds, setStudyIds } = this.props;
        const { studyIds } = this.state;
        if (studyIds !== filterStudyIds) {
            setStudyIds(studyIds);
        }
        onClose();
    }

    private readonly fetchSampleStudies = async () => {
        this.abortController = new AbortController();
        const studies = MechACovClient.getStudies(this.abortController.signal).then((studyIds: string[]) => {
            this.setState({ allStudyIds: studyIds });
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {
                // TODO
            }
        });
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const studyIds = this.state.studyIds as string[];
        const studyId = event.target.name as string;
        const checked = !!event.target.checked;
        const existing = studyIds.includes(studyId);
        if (checked && !existing) {
            const newStudyIds = [...studyIds, studyId];
            this.setState({ studyIds: newStudyIds });
        } else if (!checked && existing) {
            const newStudyIds = studyIds.filter(x => studyId !== x);
            this.setState({ studyIds: newStudyIds });
        }
    }

    private readonly handleClear = () => {
        const { studyIds, setStudyIds, onClose } = this.props;
        if (0 < (studyIds || []).length) {
            setStudyIds([]);
        }
        onClose();
    }
}


export default Component;