import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import Heatmap from './components/Heatmap';
import './styles.css';

render(
  <ParentSize>{({ width, height }) => <Heatmap width={width} height={height} />}</ParentSize>,
  document.getElementById('root'),
);
