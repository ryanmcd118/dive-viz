import React from 'react';

interface DiveSite {
  id: number;
  name: string;
  location: string;
  depth: number;
  difficulty: string;
}

const DiveSiteCard: React.FC<{ site: DiveSite }> = ({ site }) => (
  <div className='border p-4 rounded shadow'>
    <h2 className='text-xl font-bold'>{site.name}</h2>
    <p>Location: {site.location}</p>
    <p>Depth: {site.depth} ft</p>
    <p>Difficulty: {site.difficulty}</p>
    <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>
      Plan Dive
    </button>
  </div>
);

export default DiveSiteCard;
