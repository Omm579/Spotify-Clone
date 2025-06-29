import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import AudioPlayer from './components/Player/AudioPlayer';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <div className="h-screen bg-black text-white overflow-hidden">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              
              {/* Main App Routes */}
              <Route path="/*" element={
                <div className="flex h-full">
                  {/* Sidebar */}
                  <Sidebar />
                  
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <TopBar />
                    
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/library" element={
                        <ProtectedRoute>
                          <Library />
                        </ProtectedRoute>
                      } />
                      <Route path="/playlist/:id" element={<Playlist />} />
                      <Route path="/liked" element={
                        <ProtectedRoute>
                          <div className="flex-1 bg-gradient-to-b from-spotify-dark-secondary to-black p-6 flex items-center justify-center">
                            <div className="text-center">
                              <h2 className="text-2xl font-bold text-white mb-4">Liked Songs</h2>
                              <p className="text-spotify-gray">Your liked songs will appear here</p>
                            </div>
                          </div>
                        </ProtectedRoute>
                      } />
                      <Route path="/create-playlist" element={
                        <ProtectedRoute>
                          <div className="flex-1 bg-gradient-to-b from-spotify-dark-secondary to-black p-6 flex items-center justify-center">
                            <div className="text-center">
                              <h2 className="text-2xl font-bold text-white mb-4">Create Playlist</h2>
                              <p className="text-spotify-gray">Playlist creation feature coming soon</p>
                            </div>
                          </div>
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </div>
                </div>
              } />
            </Routes>
            
            {/* Audio Player */}
            <AudioPlayer />
          </div>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;