import React from 'react';
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  cover: string;
}

interface TrackCardProps {
  track: Track;
  index?: number;
  playlist?: Track[];
  showAlbum?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({ 
  track, 
  index, 
  playlist = [], 
  showAlbum = true 
}) => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isCurrentTrack && isPlaying) {
      pauseTrack();
    } else {
      playTrack(track, playlist.length > 0 ? playlist : [track]);
    }
  };

  return (
    <div className="group flex items-center space-x-4 p-2 rounded-md hover:bg-spotify-dark-tertiary hover:bg-opacity-50 transition-colors">
      {/* Track Number / Play Button */}
      <div className="w-6 flex items-center justify-center">
        {typeof index === 'number' ? (
          <div className="relative">
            <span className={`text-sm ${isCurrentTrack ? 'text-spotify-green' : 'text-spotify-gray'} group-hover:hidden`}>
              {index + 1}
            </span>
            <button
              onClick={handlePlayPause}
              className="hidden group-hover:block text-white hover:text-spotify-green transition-colors"
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={handlePlayPause}
            className="text-white hover:text-spotify-green transition-colors"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        )}
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
            <div className={`font-medium truncate ${isCurrentTrack ? 'text-spotify-green' : 'text-white'}`}>
              {track.title}
            </div>
            <div className="text-sm text-spotify-gray truncate">
              {track.artist}
            </div>
          </div>
        </div>
      </div>

      {/* Album */}
      {showAlbum && (
        <div className="hidden md:block flex-1 min-w-0">
          <div className="text-sm text-spotify-gray truncate">
            {track.album}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button className="opacity-0 group-hover:opacity-100 text-spotify-gray hover:text-white transition-all">
          <Heart className="w-4 h-4" />
        </button>
        
        <div className="text-sm text-spotify-gray min-w-[40px] text-right">
          {formatDuration(track.duration)}
        </div>
        
        <button className="opacity-0 group-hover:opacity-100 text-spotify-gray hover:text-white transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TrackCard;