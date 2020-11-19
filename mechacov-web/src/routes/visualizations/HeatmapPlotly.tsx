import * as React from 'react';
// import PlotlyChart from 'react-plotlyjs-ts';

class HeatmapPlotly extends React.Component {

    public render() {
        const data = [
            {
              z: [[1, null, 30, 35, 1, -10, 30, 35, -3, 33, 32, 12, 21, 25, 15, 16, -17, -18, 19, 0], [20, 20, 38, 33, 30, -10, -15, -16, 20, 34, 22, 20, -30, -25, 10, 5, 1, -15, -16, -20, 3, 30, 0], [30, 20, 46, 32, 20, -10, 10, 8, 9, 30, 50, 45, 20, -20, -10, 10, -17, -18, 10, -20]],
              x: ['TXNIP', 'SPCS1', 'GMEB2', 'SPATA2', 'ANXA4','DUSP1','TNFRSF21','NQO1','PPP1R15A','UBE2T','ZBTB48','SNRPD3','C4orf3','SOD1','MRPL11','TNFRSF10D','SLC35E2B','ATP1B1','ZBTB39','PTGES' ],
              y: ['Study B', 'Study A','Meta-analysis'],
              type: 'heatmap',
              hoverongaps: false
            }
          ];
        // const layout = {
        //     annotations: [
        //         {
        //             text: 'simple annotation',
        //             x: 0,
        //             xref: 'paper',
        //             y: 0,
        //             yref: 'paper'
        //         }
        //     ],
        //     title: 'simple example',
        //     xaxis: {
        //         title: 'time'
        //     },
        // };
        // TODO: resolve npm conflicts
        return (
            <></>
            // <PlotlyChart data={data}
            //     // layout={layout}
            // />
        );
    }
}

export default HeatmapPlotly;