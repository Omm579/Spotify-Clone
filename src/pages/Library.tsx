import React, { useState } from 'react';
import { Grid3x3, List, Plus, Search } from 'lucide-react';
import PlaylistCard from '../components/UI/PlaylistCard';
import TrackCard from '../components/UI/TrackCard';

// Mock data
const userPlaylists = [
  {
    id: '1',
    title: 'My Favorites',
    description: 'Your most loved songs',
    cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=300',
    trackCount: 23,
    isOwner: true
  },
  {
    id: '2',
    title: 'Workout Mix',
    description: 'High energy for the gym',
    cover: 'https://images.pexels.com/photos/4505456/pexels-photo-4505456.jpeg?auto=compress&cs=tinysrgb&w=300',
    trackCount: 35,
    isOwner: true
  },
  {
    id: '3',
    title: 'Chill Sunday',
    description: 'Relaxing tunes for lazy days',
    cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    trackCount: 18,
    isOwner: true
  }
];

const likedSongs = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const Library: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterQuery, setFilterQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' }
  ];

  const filteredPlaylists = userPlaylists.filter(playlist =>
    playlist.title.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gradient-to-b from-spotify-dark-secondary to-black p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Library</h1>
          <p className="text-spotify-gray">
            {userPlaylists.length} playlists • {likedSongs.length} liked songs
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 bg-spotify-dark-tertiary rounded-full flex items-center justify-center text-spotify-gray hover:text-white hover:bg-opacity-80 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <div className="flex bg-spotify-dark-tertiary rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-spotify-green text-black' 
                  : 'text-spotify-gray hover:text-white'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-spotify-green text-black' 
                  : 'text-spotify-gray hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Playlist Button */}
      <button className="flex items-center space-x-3 p-4 bg-spotify-dark-tertiary bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors mb-6">
        <div className="w-12 h-12 bg-spotify-gray bg-opacity-30 rounded flex items-center justify-center">
          <Plus className="w-6 h-6 text-spotify-gray" />
        </div>
        <div className="text-left">
          <div className="text-white font-medium">Create playlist</div>
          <div className="text-spotify-gray text-sm">Make your own mix</div>
        </div>
      </button>

      {/* Filters */}
      <div className="flex space-x-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-white text-black'
                : 'bg-spotify-dark-tertiary text-white hover:bg-opacity-80'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-spotify-gray" />
        <input
          type="text"
          placeholder="Search in Your Library"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-spotify-dark-tertiary border border-spotify-gray-dark rounded text-white placeholder-spotify-gray focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
        />
      </div>

      {/* Content */}
      {activeFilter === 'all' || activeFilter === 'playlists' ? (
        <div>
          {/* Liked Songs */}
          <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-spotify-dark-tertiary hover:bg-opacity-50 transition-colors mb-4 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">♥</span>
            </div>
            <div>
              <div className="text-white font-medium">Liked Songs</div>
              <div className="text-spotify-gray text-sm">{likedSongs.length} songs</div>
            </div>
          </div>

          {/* Playlists */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} {...playlist} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-spotify-dark-tertiary hover:bg-opacity-50 transition-colors cursor-pointer"
                >
                  <img
                    src={playlist.cover}
                    alt={playlist.title}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">{playlist.title}</div>
                    <div className="text-spotify-gray text-sm">
                      Playlist • {playlist.trackCount} songs
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-spotify-gray mb-4">
            <List className="w-16 h-16 mx-auto mb-4 opacity-50" />
          </div>
          <h3 className="text-white text-xl font-medium mb-2">
            No {activeFilter} yet
          </h3>
          <p className="text-spotify-gray">
            Your {activeFilter} will appear here when you add them.
          </p>
        </div>
      )}
    </div>
  );
};

export default Library;