import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-grow p-4 bg-gradient-to-b from-blue-50 to-white'>
        <Outlet />
      </main>
    </div>
  );
}
