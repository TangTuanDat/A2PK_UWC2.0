import React from 'react';
import Map from '../../components/map/map';

const center: [number, number] = [10.7731603,
  106.6595802]; 
const zoom = 18;

const AssignTask: React.FC = () => {
  return (
    <div style={{ height: '50rem', width: '50rem' }}>
      <Map center={center} zoom={zoom} />
    </div>
  );
};

export default AssignTask;