import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, MoreHorizontal, Clock, Heart } from 'lucide-react';
import TrackCard from '../components/UI/TrackCard';
import { usePlayer } from '../context/PlayerContext';
import { indianPlaylists, allIndianTracks } from '../data/indianMusicData';

// Mock data with playable audio URLs
const mockPlaylist = {
  id: '1',
  title: 'Today\'s Top Hits',
  description: 'The most played songs right now',
  cover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400',
  owner: 'Spotify',
  followers: 12543298,
  tracks: [
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
    },
    {
      id: '3',
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      duration: 178,
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      cover: 'https://images.pexels.com/photos/4505456/pexels-photo-4505456.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '4',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: 203,
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '5',
      title: 'drivers license',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      duration: 242,
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      cover: 'https://images.pexels.com/photos/4505456/pexels-photo-4505456.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ]
};

const Playlist: React.FC = () => {
  const { id } = useParams();
  const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayer();

  // Check if it's an Indian playlist
  const indianPlaylist = indianPlaylists.find(p => p.id === id);
  
  // Use Indian playlist if found, otherwise use mock playlist
  const playlist = indianPlaylist ? {
    ...indianPlaylist,
    owner: 'Indian Music Collection',
    followers: Math.floor(Math.random() * 1000000) + 100000
  } : mockPlaylist;

  const totalDuration = playlist.tracks.reduce((sum, track) => sum + track.duration, 0);
  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  };

  const handlePlayPlaylist = () => {
    if (playlist.tracks.length > 0) {
      const isPlaylistPlaying = playlist.tracks.some(track => 
        currentTrack?.id === track.id && isPlaying
      );
      
      if (isPlaylistPlaying) {
        pauseTrack();
      } else {
        playTrack(playlist.tracks[0], playlist.tracks);
      }
    }
  };

  const isPlaylistPlaying = playlist.tracks.some(track => 
    currentTrack?.id === track.id && isPlaying
  );

  // Get gradient color based on playlist type
  const getGradientColor = () => {
    if (indianPlaylist) {
      switch (indianPlaylist.id) {
        case 'bollywood-hits':
          return 'from-orange-800 to-spotify-dark-secondary';
        case 'classical-ragas':
          return 'from-yellow-800 to-spotify-dark-secondary';
        case 'regional-gems':
          return 'from-green-800 to-spotify-dark-secondary';
        case 'devotional-peace':
          return 'from-purple-800 to-spotify-dark-secondary';
        default:
          return 'from-blue-800 to-spotify-dark-secondary';
      }
    }
    return 'from-purple-800 to-spotify-dark-secondary';
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-spotify-dark-secondary to-black overflow-y-auto">
      {/* Hero Section */}
      <div className={`bg-gradient-to-b ${getGradientColor()} p-8`}>
        <div className="flex items-end space-x-6">
          <img
            src={playlist.cover}
            alt={playlist.title}
            className="w-60 h-60 shadow-2xl rounded"
          />
          
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium mb-2">PLAYLIST</p>
            <h1 className="text-white text-5xl font-bold mb-4 truncate">
              {playlist.title}
            </h1>
            <p className="text-spotify-gray text-sm mb-4 line-clamp-2">
              {playlist.description}
            </p>
            <div className="flex items-center text-sm text-white">
              <span className="font-medium">{playlist.owner}</span>
              <span className="mx-1">•</span>
              <span>{playlist.followers?.toLocaleString()} likes</span>
              <span className="mx-1">•</span>
              <span>{playlist.tracks.length} songs,</span>
              <span className="ml-1 text-spotify-gray">
                {formatTotalDuration(totalDuration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-8 bg-gradient-to-b from-black/20 to-transparent">
        <div className="flex items-center space-x-6">
          <button
            onClick={handlePlayPlaylist}
            className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 hover:bg-spotify-green-hover transition-all"
          >
            {isPlaylistPlaying ? (
              <Pause className="w-6 h-6 text-black" />
            ) : (
              <Play className="w-6 h-6 text-black ml-1" />
            )}
          </button>
          
          <button className="text-spotify-gray hover:text-white transition-colors">
            <Heart className="w-8 h-8" />
          </button>
          
          <button className="text-spotify-gray hover:text-white transition-colors">
            <MoreHorizontal className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-8 pb-8">
        {/* Header */}
        <div className="grid grid-cols-[16px_6fr_4fr_3fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-sm text-spotify-gray border-b border-spotify-gray-dark mb-2">
          <div className="text-center">#</div>
          <div>TITLE</div>
          <div className="hidden md:block">ALBUM</div>
          <div className="hidden md:block">{indianPlaylist ? 'LANGUAGE' : 'DATE ADDED'}</div>
          <div className="text-right">
            <Clock className="w-4 h-4 ml-auto" />
          </div>
        </div>

        {/* Tracks */}
        <div className="space-y-1">
          {playlist.tracks.map((track, index) => (
            <div key={track.id} className="group flex items-center space-x-4 p-2 rounded-md hover:bg-spotify-dark-tertiary hover:bg-opacity-50 transition-colors">
              {/* Track Number / Play Button */}
              <div className="w-6 flex items-center justify-center">
                <div className="relative">
                  <span className={`text-sm ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-spotify-gray'} group-hover:hidden`}>
                    {index + 1}
                  </span>
                  <button
                    onClick={() => {
                      if (currentTrack?.id === track.id && isPlaying) {
                        pauseTrack();
                      } else {
                        playTrack(track, playlist.tracks);
                      }
                    }}
                    className="hidden group-hover:block text-white hover:text-spotify-green transition-colors"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-10 h-10 rounded"
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}>
                      {track.title}
                    </div>
                    <div className="text-sm text-spotify-gray truncate">
                      {track.artist}
                    </div>
                  </div>
                </div>
              </div>

              {/* Album */}
              <div className="hidden md:block flex-1 min-w-0">
                <div className="text-sm text-spotify-gray truncate">
                  {track.album}
                </div>
              </div>

              {/* Language or Date */}
              <div className="hidden md:block flex-1 min-w-0">
                <div className="text-sm text-spotify-gray truncate">
                  {indianPlaylist && track.language ? track.language : '2 days ago'}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button className="opacity-0 group-hover:opacity-100 text-spotify-gray hover:text-white transition-all">
                  <Heart className="w-4 h-4" />
                </button>
                
                <div className="text-sm text-spotify-gray min-w-[40px] text-right">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </div>
                
                <button className="opacity-0 group-hover:opacity-100 text-spotify-gray hover:text-white transition-all">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;