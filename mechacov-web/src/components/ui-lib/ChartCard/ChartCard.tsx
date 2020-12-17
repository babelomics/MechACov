import * as React from 'react';

import './ChartCard.scss';

interface ChartCardProps extends React.HTMLProps<HTMLDivElement> {
  heading: string
}

const ChartCard: React.FC<ChartCardProps> = ({ heading, children, ...otherProps }) => {
  return (
    <div className="card" {...otherProps}>
      <h2>{heading}</h2>
      {children}
    </div>
  );
};

export default ChartCard;
