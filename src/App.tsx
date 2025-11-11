import { useState, useEffect } from 'react';
import './App.css';
import { MainPage } from './components/MainPage';
import { CharactersPage } from './components/CharactersPage';
import { GameData, Character, Scene } from './types';

type Page = 'main' | 'characters';

const API_URL = 'http://localhost:3001/api';

const getInitialData = (): GameData => {
  return {
    characters: [],
    scene: {
      narrative: '',
      narrativeAudio: '',
      sceneImages: [],
      choices: [],
      sceneCharacters: []
    }
  };
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [gameData, setGameData] = useState<GameData>(getInitialData);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from server on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_URL}/data`);
        if (response.ok) {
          const data = await response.json();
          setGameData(data);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save data to server whenever it changes
  useEffect(() => {
    if (isLoading) return; // Don't save during initial load

    const saveData = async () => {
      try {
        await fetch(`${API_URL}/data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameData),
        });

        setShowSaveIndicator(true);
        const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    };

    saveData();
  }, [gameData, isLoading]);

  const handleSceneUpdate = (scene: Scene) => {
    setGameData({ ...gameData, scene });
  };

  const handleCharactersUpdate = (characters: Character[]) => {
    setGameData({ ...gameData, characters });
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-screen">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="nav">
        <button
          className={`nav-button ${currentPage === 'main' ? 'active' : ''}`}
          onClick={() => setCurrentPage('main')}
        >
          Main Page
        </button>
        <button
          className={`nav-button ${currentPage === 'characters' ? 'active' : ''}`}
          onClick={() => setCurrentPage('characters')}
        >
          Characters
        </button>
      </nav>

      <div className="main-content">
        {currentPage === 'main' ? (
          <MainPage scene={gameData.scene} onSceneUpdate={handleSceneUpdate} />
        ) : (
          <CharactersPage
            characters={gameData.characters}
            onCharactersUpdate={handleCharactersUpdate}
          />
        )}
      </div>

      {showSaveIndicator && (
        <div className="save-indicator">
          Saved to file!
        </div>
      )}
    </div>
  );
}

export default App;
