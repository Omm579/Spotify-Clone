import React from 'react';
import { Play } from 'lucide-react';
import PlaylistCard from '../components/UI/PlaylistCard';
import TrackCard from '../components/UI/TrackCard';
import { freeAudioSources } from '../data/musicData';
import { indianPlaylists, allIndianTracks } from '../data/indianMusicData';

// Mock data with better organized free music
const featuredPlaylists = [
  {
    id: '1',
    title: 'Chill Vibes',
    description: 'Relax and unwind with these calm tunes',
    cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=300',
    trackCount: 15
  },
  {
    id: '2',
    title: 'Electronic Mix',
    description: 'Electronic beats and digital sounds',
    cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    trackCount: 20
  },
  {
    id: '3',
    title: 'Jazz Collection',
    description: 'Smooth jazz for any occasion',
    cover: 'https://images.pexels.com/photos/4505456/pexels-photo-4505456.jpeg?auto=compress&cs=tinysrgb&w=300',
    trackCount: 12
  },
  {
    id: '4',
    title: 'Rock Essentials',
    description: 'The best of rock music',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    trackCount: 18
  }
];

// Use mix of international and Indian tracks
const recentTracks = [
  ...freeAudioSources.tracks.slice(0, 2),
  ...allIndianTracks.slice(0, 3)
];

const Home: React.FC = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="flex-1 bg-gradient-to-b from-spotify-dark-secondary to-black p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {greeting}
        </h1>
        <p className="text-spotify-gray">
          Discover new music and enjoy your favorites
        </p>
      </div>

      {/* Quick Access - Mix of International and Indian */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[...featuredPlaylists.slice(0, 3), ...indianPlaylists.slice(0, 3)].map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center bg-spotify-dark-tertiary bg-opacity-30 rounded-md overflow-hidden hover:bg-opacity-50 transition-colors group cursor-pointer"
          >
            <img
              src={playlist.cover}
              alt={playlist.title}
              className="w-16 h-16 object-cover"
            />
            <div className="flex-1 px-4">
              <span className="text-white font-medium">{playlist.title}</span>
            </div>
            <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <Play className="w-4 h-4 text-black ml-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indian Music Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">🇮🇳 Indian Music</h2>
          <button className="text-spotify-gray hover:text-white text-sm font-medium transition-colors">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {indianPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Playlists</h2>
          <button className="text-spotify-gray hover:text-white text-sm font-medium transition-colors">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>

      {/* Recently Played - Mix of International and Indian */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recently Played</h2>
          <button className="text-spotify-gray hover:text-white text-sm font-medium transition-colors">
            Show all
          </button>
        </div>
        
        <div className="bg-spotify-dark-secondary bg-opacity-30 rounded-lg p-4">
          {recentTracks.map((track, index) => (
            <TrackCard 
              key={track.id} 
              track={track} 
              index={index}
              playlist={recentTracks}
            />
          ))}
        </div>
      </section>

      {/* Bollywood Hits */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">🎬 Bollywood Superhits</h2>
          <button className="text-spotify-gray hover:text-white text-sm font-medium transition-colors">
            Show all
          </button>
        </div>
        
        <div className="bg-spotify-dark-secondary bg-opacity-30 rounded-lg p-4">
          {allIndianTracks.filter(track => track.genre === 'Bollywood').slice(0, 5).map((track, index) => (
            <TrackCard 
              key={track.id} 
              track={track} 
              index={index}
              playlist={allIndianTracks.filter(track => track.genre === 'Bollywood')}
            />
          ))}
        </div>
      </section>

      {/* Made For You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Made For You</h2>
          <button className="text-spotify-gray hover:text-white text-sm font-medium transition-colors">
            Show all
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...featuredPlaylists.slice().reverse(), ...indianPlaylists.slice().reverse()].slice(0, 6).map((playlist) => (
            <PlaylistCard 
              key={`made-for-you-${playlist.id}`} 
              {...playlist} 
              id={`made-for-you-${playlist.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;