import React from 'react';
import { Box, Button, Grid, Paper } from '@material-ui/core';

import SampleFilter from '../../models/SampleFilter';

import FilterStudiesButton from './filters/FilterStudiesButton';
import FilterGroupButton from './filters/FilterGroupButton';
import FilterTissueCellLinesButton from './filters/FilterTissueCellLinesButton';


// <Tab label="Studies" value="study" />
// <Tab label="Group" value="group" />
// Tab label="Strain" value="strain" />
// Tab label="Tissue cell type" value="tissue-cell-line" />
// Tab label="Platform" value="platform" />
// Tab label="HPI" value="hpi" />
// Tab label="MOI" value="moi" />


interface ComponentProps {
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
}


class Component extends React.PureComponent<ComponentProps> {

    render() {
        const { sampleFilter } = this.props;

        return (
            <div>
                <Paper>
                    <Grid container justify="center" spacing={10} alignItems="stretch">
                        <Grid item xs={12} sm={2} />
                        <Grid xs={12} sm={1}>
                            <FilterStudiesButton studyIds={sampleFilter.studyIds} setStudyIds={this.setStudyIds} />
                        </Grid>
                        <Grid xs={12} sm={1}>
                            <FilterGroupButton values={sampleFilter.groups} setValues={this.setGroups} />
                        </Grid>
                        <Grid xs={12} sm={1}>
                            <Button fullWidth color="default" variant="contained">Strain</Button>
                        </Grid>
                        <Grid xs={12} sm={1}>
                            <Button fullWidth color="default" variant="contained">HPI</Button>
                        </Grid>
                        <Grid xs={12} sm={1}>
                            <Button fullWidth color="default" variant="contained">MOI</Button>
                        </Grid>
                        <Grid xs={12} sm={1}>
                            <FilterTissueCellLinesButton tissueCellLines={sampleFilter.tissueCellLines} setTissueCellLines={this.setTissueCellLines} />
                        </Grid>
                        <Grid xs={12} sm={1}>
                            <Button fullWidth color="default" variant="contained">Platform</Button>
                        </Grid>
                        <Grid xs={12} sm={1}>
                            <Button fullWidth color="default" variant="contained">Platform details</Button>
                        </Grid>
                    </Grid>
                </Paper >
            </div>
        );

    }

    private readonly setStudyIds = (newStudyIds: string[]) => {
        const { sampleFilter, setSampleFilter } = this.props;
        if (newStudyIds !== sampleFilter.studyIds) {
            if (0 === newStudyIds.length) {
                const { studyIds, ...newSampleFilter } = sampleFilter;
                setSampleFilter(newSampleFilter as SampleFilter);
            } else {
                const newSampleFilter = { ...sampleFilter, studyIds: newStudyIds };
                setSampleFilter(newSampleFilter as SampleFilter);
            }
        }
    }

    private readonly setTissueCellLines = (newValues: string[]) => {
        const { sampleFilter, setSampleFilter } = this.props;
        if (newValues !== sampleFilter.tissueCellLines) {
            if (0 === newValues.length) {
                const { tissueCellLines, ...newSampleFilter } = sampleFilter;
                setSampleFilter(newSampleFilter as SampleFilter);
            } else {
                const newSampleFilter = { ...sampleFilter, tissueCellLines: newValues };
                setSampleFilter(newSampleFilter as SampleFilter);
            }
        }
    }

    private readonly setGroups = (newValues: string[]) => {
        const { sampleFilter, setSampleFilter } = this.props;
        if (newValues !== sampleFilter.groups) {
            if (0 === newValues.length) {
                const { groups, ...newSampleFilter } = sampleFilter;
                setSampleFilter(newSampleFilter as SampleFilter);
            } else {
                const newSampleFilter = { ...sampleFilter, groups: newValues };
                setSampleFilter(newSampleFilter as SampleFilter);
            }
        }
    }

}


export default Component;