import React, { useEffect, useState } from 'react';
import DiveSiteCard from '../components/DiveSiteCard';
import diveSitesData from '../data/diveSites.json';

const Home: React.FC = () => {
  const [diveSites, setDiveSites] = useState([]);

  useEffect(() => {
    setDiveSites(diveSitesData);
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dive Site Planner</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {diveSites.map((site) => (
          <DiveSiteCard key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
};

export default Home;
