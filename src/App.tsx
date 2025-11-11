import { useState, useEffect } from 'react';
import './App.css';
import { MainPage } from './components/MainPage';
import { CharactersPage } from './components/CharactersPage';
import { GameData, Character, Scene } from './types';

type Page = 'main' | 'characters';

const STORAGE_KEY = 'adventure-game-data';

const getInitialData = (): GameData => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }

  return {
    characters: [],
    scene: {
      narrative: '',
      narrativeAudio: '',
      choices: [],
      sceneCharacters: []
    }
  };
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [gameData, setGameData] = useState<GameData>(getInitialData);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));

    setShowSaveIndicator(true);
    const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
    return () => clearTimeout(timer);
  }, [gameData]);

  const handleSceneUpdate = (scene: Scene) => {
    setGameData({ ...gameData, scene });
  };

  const handleCharactersUpdate = (characters: Character[]) => {
    setGameData({ ...gameData, characters });
  };

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
          Saved!
        </div>
      )}
    </div>
  );
}

export default App;
