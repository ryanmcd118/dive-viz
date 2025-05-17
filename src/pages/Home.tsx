import { useRef, useState } from 'react';
import DiveMap from '../components/DiveMap';
import DiveSiteCard from '../components/DiveSiteCard';
import PlanDiveModal from '../components/PlanDiveModal';
import diveSites from '../data/diveSites.json';

export default function Home() {
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planningSite, setPlanningSite] = useState(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [minDepth, setMinDepth] = useState<string>('');
  const [maxDepth, setMaxDepth] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleSelectSite = (siteId: number) => {
    setSelectedSiteId(siteId);
    cardRefs.current[siteId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const clearFilters = () => {
    setDifficultyFilter(null);
    setMinDepth('');
    setMaxDepth('');
    setSearchQuery('');
  };

  const filteredSites = diveSites.filter((site) => {
    const matchesDifficulty =
      !difficultyFilter || site.difficulty === difficultyFilter;

    const matchesDepth =
      (!minDepth || site.depth >= parseInt(minDepth)) &&
      (!maxDepth || site.depth <= parseInt(maxDepth));

    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDifficulty && matchesDepth && matchesSearch;
  });

  const toastMessages = [
    "🐠 Dive logged! You're one step closer to your next giant stride.",
    "🫧 Dive planned! Don't forget your buddy check.",
    '🌊 Dive saved! Time to prep your gear.',
    '🐢 Dive logged! Hope you spot a turtle!',
    '🦑 Dive planned! May the viz be with you.',
  ];

  return (
    <div className='space-y-6 px-4 pb-10'>
      <h1 className='text-2xl font-bold'>Dive Site Planner</h1>

      {/* 🔍 FILTER BAR */}
      <div className='bg-white border rounded p-4 space-y-4 shadow-sm'>
        {/* Difficulty */}
        <div className='flex flex-wrap gap-2 items-center'>
          <span className='text-sm font-medium text-gray-700'>Difficulty:</span>
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <button
              key={level}
              onClick={() =>
                setDifficultyFilter(difficultyFilter === level ? null : level)
              }
              className={`px-3 py-1 rounded border text-sm ${
                difficultyFilter === level
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Depth */}
        <div className='flex flex-wrap gap-4 items-center'>
          <label className='text-sm text-gray-700'>
            Min Depth:
            <input
              type='number'
              min='0'
              value={minDepth}
              onChange={(e) => setMinDepth(e.target.value)}
              className='ml-2 border rounded px-2 py-1 text-sm w-20'
              placeholder='ft'
            />
          </label>

          <label className='text-sm text-gray-700'>
            Max Depth:
            <input
              type='number'
              min='0'
              value={maxDepth}
              onChange={(e) => setMaxDepth(e.target.value)}
              className='ml-2 border rounded px-2 py-1 text-sm w-20'
              placeholder='ft'
            />
          </label>
        </div>

        {/* Search */}
        <div className='flex flex-wrap gap-2 items-center'>
          <label className='text-sm text-gray-700'>
            Search:
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Name or location'
              className='ml-2 border rounded px-2 py-1 text-sm w-64'
            />
          </label>

          <button
            onClick={clearFilters}
            className='text-sm text-gray-500 underline'
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* 🗺 MAP */}
      <DiveMap
        diveSites={filteredSites}
        selectedSiteId={selectedSiteId}
        onSelectSite={handleSelectSite}
      />

      {/* 📇 CARDS */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredSites.map((site) => (
          <DiveSiteCard
            key={site.id}
            site={site}
            selected={site.id === selectedSiteId}
            onSelect={() => handleSelectSite(site.id)}
            onPlanDive={() => {
              setPlanningSite(site);
              setIsModalOpen(true);
            }}
            ref={(el) => (cardRefs.current[site.id] = el)}
          />
        ))}
      </div>

      {/* 🧭 MODAL */}
      <PlanDiveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        site={planningSite}
        onConfirm={() => {
          setIsModalOpen(false);
          const message =
            toastMessages[Math.floor(Math.random() * toastMessages.length)];
          setToastMessage(message);
          setTimeout(() => setToastMessage(null), 3500);
        }}
      />

      {/* 🐠 TOAST */}
      {toastMessage && (
        <div className='fixed bottom-6 right-6 bg-blue-700 text-white px-4 py-3 rounded-lg shadow-lg text-sm z-50 animate-fade-in-out'>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
