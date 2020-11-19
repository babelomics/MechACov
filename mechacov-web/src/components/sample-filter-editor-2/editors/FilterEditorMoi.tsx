import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MechACovClient from '../../../clients/MechacovClient';
import SampleFilterActions from '../../../actions/SampleFilterActions';
import { connect } from 'react-redux';


interface ComponentProps {

}


interface ComponentState {
    open: boolean;
}


class Component extends React.PureComponent<ComponentProps, ComponentState> {

    state = {
        open: false,
        allValues: [],
    };

    render() {        
        const { open } = this.state;
        
        return (
            <Accordion expanded={open} onChange={this.handleToggle}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>MOI</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    TODO...                    
                </AccordionDetails>
            </Accordion>
        );
    }


    private readonly handleToggle = () => {
        this.setState({ open: !this.state.open });
    }

    
    private readonly handleReset = () => {
    }

}


const mapStateToProps = (state: any) => ({

});


const mapDispatchToProps = (dispatch: any) => ({    

});


export default connect(mapStateToProps, mapDispatchToProps)(Component);