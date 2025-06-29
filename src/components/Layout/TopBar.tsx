import React from 'react';
import { ChevronLeft, ChevronRight, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-16 bg-spotify-dark-secondary bg-opacity-90 backdrop-blur-md flex items-center justify-between px-6">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-black bg-opacity-70 flex items-center justify-center hover:bg-opacity-80 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 rounded-full bg-black bg-opacity-70 flex items-center justify-center hover:bg-opacity-80 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* User Menu */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-black bg-opacity-70 rounded-full px-3 py-1 hover:bg-opacity-80 transition-colors">
              <div className="w-6 h-6 bg-spotify-gray rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium">{user.username}</span>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-spotify-dark-tertiary rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-white hover:bg-spotify-dark-secondary transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="text-spotify-gray hover:text-white font-medium text-sm transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-black px-6 py-2 rounded-full font-medium text-sm hover:scale-105 transition-transform"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;