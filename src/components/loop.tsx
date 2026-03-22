import React from 'react';
import './css/loop.css';

const Marquee = () => {
  const items = ["React", "JavaScript", "Physics", "Velocity", "Momentum"];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {/* 同じ内容を2回繰り返すことで、ループの切れ目をなくします */}
        {items.map((item, index) => <span key={index}>{item}</span>)}
        {items.map((item, index) => <span key={`copy-${index}`}>{item}</span>)}
      </div>
    </div>
  );
};

export default Marquee;