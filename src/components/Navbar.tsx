import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='bg-blue-700 text-white px-6 py-4 flex items-center justify-between'>
      <Link to='/' className='text-xl font-bold tracking-wide'>
        🌊 DiveViz
      </Link>
      <div className='space-x-4'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'underline' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to='/log'
          className={({ isActive }) => (isActive ? 'underline' : '')}
        >
          Dive Log
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'underline' : '')}
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}
