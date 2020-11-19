import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MechACovClient from '../../../clients/MechacovClient';
import SampleFilterActions from '../../../actions/SampleFilterActions';
import { connect } from 'react-redux';


interface ComponentProps {
    values: string[];
    resetValues: () => void;
    addValue: (value: string) => void;
    removeValue: (value: string) => void;
}


interface ComponentState {
    open: boolean;
    allValues: string[];

}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    private abortController = new AbortController();

    state = {
        open: false,
        allValues: [],
    };

    componentDidMount() {
        this.fetchAllValues();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        const { values } = this.props;
        const { open, allValues } = this.state;
        return (
            <Accordion expanded={open} onChange={this.handleToggle}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Platforms</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box display="flex" flexDirection="column" width="100%">
                        <FormControl component="fieldset">
                            {/* <FormLabel component="legend">Select the studies:</FormLabel> */}
                            <FormGroup>
                                {
                                    allValues.map(value => (
                                        <FormControlLabel key={value} label={value} control={<Checkbox checked={values.includes(value)} onChange={this.handleChange} name={value} />} />
                                    ))
                                }
                            </FormGroup>
                        </FormControl>
                        <Box alignSelf="flex-end">
                            <Button variant="text" color="default" onClick={this.handleReset} size="small">Clear</Button>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        );
    }


    private readonly handleToggle = () => {
        this.setState({ open: !this.state.open });
    }

    private readonly fetchAllValues = async () => {
        this.abortController.abort();
        this.abortController = new AbortController();
        const studies = MechACovClient.getPlatforms(this.abortController.signal).then((values: string[]) => {
            this.setState({ allValues: values });
        }).catch((error: Error) => {
            if ("AbortError" !== error.name) {
                // TODO
            }
        });
    }

    private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const { addValue, removeValue } = this.props;
        const value = event.target.name as string;
        // const checked = !!event.target.checked;
        if (!!checked) {
            addValue(value);
        } else {
            removeValue(value);
        }
    }

    private readonly handleReset = () => {
        const { resetValues } = this.props;
        resetValues();
    }

}


const mapStateToProps = (state: any) => ({
    values: (state.sampleFilter.platforms || []) as string[],
});


const mapDispatchToProps = (dispatch: any) => ({
    resetValues: () => { dispatch(SampleFilterActions.resetPlatforms()); },
    addValue: (value: string) => { dispatch(SampleFilterActions.addPlatform(value)); },
    removeValue: (value: string) => { dispatch(SampleFilterActions.removePlatform(value)); },

});


export default connect(mapStateToProps, mapDispatchToProps)(Component);