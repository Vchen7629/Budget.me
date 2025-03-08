import { useState, useRef, useEffect } from 'react';
import { LucideLogIn } from 'lucide-react';
import StockList from '../components/StockList';
import PortfolioSummary from '../components/PortfolioSummary';
import NewsPanel from '../components/NewsPanel';
import GameControls from '../components/GameControls';
import MarketOverview from '../components/MarketOverview';
import { Volume, Volume1Icon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const BudgetPage = () => {
    const [isGameStarted, _] = useState(false);
    const [volume, setVolume] = useState(1);
    const navigate = useNavigate()
    const audioRef = useRef<HTMLAudioElement | null>(null); 

    // Automatically start the music when the game starts
    useEffect(() => {
        if (isGameStarted && audioRef.current) {
        audioRef.current.play(); // Start playing music
        }
    }, [isGameStarted]);

    // Pause music when game is not started
    useEffect(() => {
        if (!isGameStarted && audioRef.current) {
        audioRef.current.pause(); // Pause music
        }
    }, [isGameStarted]);

    // Update volume when the user adjusts the slider
    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = volume; // Set volume
        }
    }, [volume]);

    function navigateLogin() {
      navigate("/login")
    }
    
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container flex justify-between mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Budget App</h1>
            <div className='flex space-x-2'>
              <button onClick={navigateLogin} className='flex items-center space-x-1 bg-blue-500 rounded-lg p-2 shadow-lg'>
                <LucideLogIn/>
                <h1>Login</h1>
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto h-[80vh] px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GameControls />
              <StockList />
              <MarketOverview />
            </div>

            <div className="space-y-6">
              <PortfolioSummary />
              <NewsPanel />
            </div>
          </div>
        </main>

        <footer className="bg-gray-800 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm">
            Market Mayhem &copy; 2025
          </div>
        </footer>

        {/* Background Music */}
        <audio
          ref={audioRef}
          loop
          src="/bg_music.mp3"
          preload="auto"
        />

        {/* Volume Control */}
        <div className="fixed flex bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-md">
          <>
            {volume == 0.00 && <VolumeXIcon size={20} className="mr-2"/>}
            {volume > 0.00 && volume <= 0.33 && <Volume size={20} className="mr-2"/>}
            {volume > 0.33 && volume <= 0.66 && <Volume1Icon size={20} className="mr-2"/>}
            {volume > 0.66 && volume <= 1 && <Volume2Icon size={20} className="mr-2"/>}
          </>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="ml-2"
          />
        </div>
      </div>
    )
}

export default BudgetPage