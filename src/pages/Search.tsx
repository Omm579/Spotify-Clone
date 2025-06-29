import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import PlaylistCard from '../components/UI/PlaylistCard';
import TrackCard from '../components/UI/TrackCard';
import { allIndianTracks, indianMusicCategories } from '../data/indianMusicData';

// Mock data with playable audio URLs - Mix of International and Indian
const allTracks = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    url: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
    cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    url: 'https://www.bensound.com/bensound-music/bensound-love.mp3',
    cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    url: 'https://www.bensound.com/bensound-music/bensound-dance.mp3',
    cover: 'https://images.pexels.com/photos/4505456/pexels-photo-4505456.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    url: 'https://www.bensound.com/bensound-music/bensound-melodic.mp3',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '5',
    title: 'drivers license',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 242,
    url: 'https://www.bensound.com/bensound-music/bensound-romantic.mp3',
    cover: 'https://images.pexels.com/photos/4505456/pexels-photo-4505456.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '6',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'Stay',
    duration: 141,
    url: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
    cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  // Add Indian tracks to search
  ...allIndianTracks
];

const browseCategories = [
  {
    id: 'pop',
    title: 'Pop',
    description: 'The biggest pop hits',
    cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-pink-500'
  },
  {
    id: 'bollywood',
    title: 'Bollywood',
    description: 'Hindi film music hits',
    cover: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-orange-500'
  },
  {
    id: 'classical',
    title: 'Indian Classical',
    description: 'Traditional ragas and compositions',
    cover: 'https://images.pexels.com/photos/4472010/pexels-photo-4472010.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-yellow-600'
  },
  {
    id: 'rock',
    title: 'Rock',
    description: 'Rock classics and new hits',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-red-500'
  },
  {
    id: 'regional',
    title: 'Regional Indian',
    description: 'Songs from across India',
    cover: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-green-600'
  },
  {
    id: 'devotional',
    title: 'Devotional',
    description: 'Sacred and spiritual music',
    cover: 'https://images.pexels.com/photos/2850290/pexels-photo-2850290.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-purple-600'
  },
  // Add Indian music categories
  ...indianMusicCategories,
  {
    id: 'hiphop',
    title: 'Hip-Hop',
    description: 'The hottest hip-hop tracks',
    cover: 'https://images.pexels.com/photos/4505456/pexels-photo-4505456.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-gray-700'
  },
  {
    id: 'electronic',
    title: 'Electronic',
    description: 'Electronic beats and vibes',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-blue-500'
  },
  {
    id: 'indie',
    title: 'Indie',
    description: 'Independent artists and sounds',
    cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-teal-500'
  },
  {
    id: 'jazz',
    title: 'Jazz',
    description: 'Smooth jazz and classics',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: 'bg-indigo-500'
  }
];

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState(allTracks);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredTracks(allTracks);
    } else {
      const filtered = allTracks.filter(track =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase()) ||
        (track.genre && track.genre.toLowerCase().includes(query.toLowerCase())) ||
        (track.language && track.language.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredTracks(filtered);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-spotify-dark-secondary to-black p-6 overflow-y-auto">
      {/* Search Header */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-spotify-gray" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-spotify-green"
          />
        </div>
      </div>

      {searchQuery ? (
        /* Search Results */
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Search Results for "{searchQuery}"
          </h2>
          
          {filteredTracks.length > 0 ? (
            <div className="bg-spotify-dark-secondary bg-opacity-30 rounded-lg p-4">
              {filteredTracks.map((track, index) => (
                <TrackCard 
                  key={track.id} 
                  track={track} 
                  index={index}
                  playlist={filteredTracks}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-spotify-gray mx-auto mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">
                No results found
              </h3>
              <p className="text-spotify-gray">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Browse Categories */
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Browse all
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {browseCategories.map((category) => (
              <div
                key={category.id}
                className={`relative p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform ${category.color}`}
              >
                <h3 className="text-white font-bold text-lg mb-2">
                  {category.title}
                </h3>
                <p className="text-white text-sm opacity-80 mb-4">
                  {category.description}
                </p>
                <img
                  src={category.cover}
                  alt={category.title}
                  className="absolute bottom-0 right-0 w-20 h-20 object-cover rounded-lg shadow-lg transform rotate-12 translate-x-2 translate-y-2"
                />
              </div>
            ))}
          </div>

          {/* Popular Searches - Mix of International and Indian */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Popular right now
            </h2>
            
            <div className="bg-spotify-dark-secondary bg-opacity-30 rounded-lg p-4">
              {[...allTracks.slice(0, 2), ...allIndianTracks.slice(0, 4)].map((track, index) => (
                <TrackCard 
                  key={track.id} 
                  track={track} 
                  index={index}
                  playlist={allTracks}
                />
              ))}
            </div>
          </section>

          {/* Indian Music Spotlight */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              🇮🇳 Indian Music Spotlight
            </h2>
            
            <div className="bg-spotify-dark-secondary bg-opacity-30 rounded-lg p-4">
              {allIndianTracks.slice(0, 6).map((track, index) => (
                <TrackCard 
                  key={track.id} 
                  track={track} 
                  index={index}
                  playlist={allIndianTracks}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Search;