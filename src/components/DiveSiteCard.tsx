import React, { forwardRef } from 'react';

const DiveSiteCard = forwardRef(
  ({ site, selected, onSelect, onPlanDive }, ref) => {
    return (
      <div
        ref={ref}
        className={`border p-4 rounded shadow cursor-pointer transition ${
          selected ? 'ring-2 ring-blue-400' : ''
        }`}
        onClick={onSelect}
      >
        <h2 className='text-xl font-bold'>{site.name}</h2>
        <p>Location: {site.location}</p>
        <p>Depth: {site.depth} ft</p>
        <p>Difficulty: {site.difficulty}</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlanDive();
          }}
          className='mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Plan Dive
        </button>
      </div>
    );
  }
);

export default DiveSiteCard;
