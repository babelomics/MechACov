interface Experiment {
    experimentId: string;
    creationDate: string;
    state: string;
    controls: string[];
    cases: string[];
}


export default Experiment;