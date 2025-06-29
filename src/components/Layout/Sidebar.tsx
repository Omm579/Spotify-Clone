import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Plus, Heart, Music } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library', requireAuth: true },
  ];

  const libraryItems = [
    { icon: Plus, label: 'Create Playlist', path: '/create-playlist', requireAuth: true },
    { icon: Heart, label: 'Liked Songs', path: '/liked', requireAuth: true },
  ];

  return (
    <div className="w-64 bg-black h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <Music className="text-spotify-green w-8 h-8" />
          <span className="text-white font-bold text-xl">Spotify</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          {mainNavItems.map((item) => {
            if (item.requireAuth && !user) return null;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-spotify-dark-tertiary text-white'
                      : 'text-spotify-gray hover:text-white hover:bg-spotify-dark-tertiary'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Separator */}
        <div className="border-t border-spotify-gray-dark my-4 mx-4" />

        {/* Library Section */}
        {user && (
          <ul className="space-y-2">
            {libraryItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-spotify-dark-tertiary text-white'
                      : 'text-spotify-gray hover:text-white hover:bg-spotify-dark-tertiary'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}

            {/* Playlists */}
            <div className="mt-4 space-y-2">
              <div className="px-4 py-2 text-xs text-spotify-gray uppercase tracking-wider font-semibold">
                Playlists
              </div>
              {/* Mock playlists */}
              {['My Playlist #1', 'Chill Vibes', 'Workout Mix', 'Road Trip'].map((playlist, index) => (
                <Link
                  key={index}
                  to={`/playlist/${index + 1}`}
                  className="block px-4 py-2 text-sm text-spotify-gray hover:text-white transition-colors"
                >
                  {playlist}
                </Link>
              ))}
            </div>
          </ul>
        )}
      </nav>

      {/* Install App Prompt */}
      <div className="p-4 border-t border-spotify-gray-dark">
        <button className="flex items-center space-x-2 text-sm text-spotify-gray hover:text-white transition-colors">
          <div className="w-5 h-5 rounded border border-spotify-gray flex items-center justify-center">
            <div className="w-2 h-2 bg-spotify-gray rounded-full" />
          </div>
          <span>Install App</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;