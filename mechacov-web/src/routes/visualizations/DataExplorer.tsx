import * as React from 'react';
import PlotlyChart from 'react-plotlyjs-ts';

class DataExplorer extends React.Component {
  public handleClick = (evt: any) => alert('click')
  public handleHover = (evt: any) => alert('hover')

  public render() {
    const data = [
      {
        marker: {
          color: 'rgb(16, 32, 77)'
        },
        type: 'scatter',
        x: [1, 2, 3],
        y: [6, 2, 3]
      },
      {
        name: 'bar chart example',
        type: 'bar',
        x: [1, 2, 3],
        y: [6, 2, 3],
      }
    ];
    const layout = {
      annotations: [
        {
          text: 'simple annotation',
          x: 0,
          xref: 'paper',
          y: 0,
          yref: 'paper'
        }
      ],
      title: 'simple example',
      xaxis: {
        title: 'time'
      },
    };
    return (


      <div>

        <PlotlyChart data={data}
          layout={layout}
          onClick={this.handleClick}
          // onHover={this.handleHover}
        />


      </div>
    );
  }
}

export default DataExplorer;