import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

const AudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume,
    seekTo,
    shuffle,
    repeat,
    toggleShuffle,
    toggleRepeat
  } = usePlayer();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-20 bg-spotify-dark-tertiary border-t border-spotify-gray-dark flex items-center justify-between px-4">
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-1/4">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-12 h-12 rounded"
        />
        <div className="min-w-0">
          <div className="text-white text-sm font-medium truncate">
            {currentTrack.title}
          </div>
          <div className="text-spotify-gray text-xs truncate">
            {currentTrack.artist}
          </div>
        </div>
        <button className="text-spotify-gray hover:text-white transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2 w-1/2">
        {/* Control Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleShuffle}
            className={`transition-colors ${shuffle ? 'text-spotify-green' : 'text-spotify-gray hover:text-white'}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          
          <button
            onClick={previousTrack}
            className="text-spotify-gray hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={isPlaying ? pauseTrack : resumeTrack}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          
          <button
            onClick={nextTrack}
            className="text-spotify-gray hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleRepeat}
            className={`transition-colors ${repeat ? 'text-spotify-green' : 'text-spotify-gray hover:text-white'}`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-spotify-gray min-w-[40px] text-right">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 h-1 bg-spotify-gray-dark rounded-full relative group cursor-pointer">
            <div
              className="h-full bg-white rounded-full relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-xs text-spotify-gray min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-end space-x-2 w-1/4">
        <div
          className="relative flex items-center space-x-2"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button className="text-spotify-gray hover:text-white transition-colors">
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <div className={`transition-all duration-200 overflow-hidden ${showVolumeSlider ? 'w-20 opacity-100' : 'w-0 opacity-0'}`}>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1 bg-spotify-gray-dark rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, white 0%, white ${volume}%, #535353 ${volume}%, #535353 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;