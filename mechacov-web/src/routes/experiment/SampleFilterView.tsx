import React from 'react';
import SampleFilter from '../../models/SampleFilter';


interface ComponentProps {
    sampleFilter: SampleFilter;
    setSampleFilter: (newSampleFilter: SampleFilter) => void;
}


function Component(props: ComponentProps) {
    const { sampleFilter, setSampleFilter } = props;
    return (
        <div></div>
    );
}


export default Component;