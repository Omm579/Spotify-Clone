import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  trackCount?: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  title,
  description,
  cover,
  trackCount
}) => {
  return (
    <Link
      to={`/playlist/${id}`}
      className="group bg-spotify-dark-secondary p-4 rounded-lg hover:bg-spotify-dark-tertiary transition-all duration-300 cursor-pointer"
    >
      <div className="relative mb-4">
        <img
          src={cover}
          alt={title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105">
          <Play className="w-5 h-5 text-black ml-0.5" />
        </button>
      </div>
      
      <div>
        <h3 className="text-white font-medium mb-1 truncate group-hover:text-spotify-green transition-colors">
          {title}
        </h3>
        <p className="text-spotify-gray text-sm line-clamp-2">
          {description}
        </p>
        {trackCount && (
          <p className="text-spotify-gray text-xs mt-1">
            {trackCount} songs
          </p>
        )}
      </div>
    </Link>
  );
};

export default PlaylistCard;