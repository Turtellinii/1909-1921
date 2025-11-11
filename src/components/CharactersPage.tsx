import React, { useState } from 'react';
import { Character } from '../types';
import { generateId, readFileAsDataURL } from '../utils';
import { BiographyModal } from './BiographyModal';

interface CharactersPageProps {
  characters: Character[];
  onCharactersUpdate: (characters: Character[]) => void;
}

export const CharactersPage: React.FC<CharactersPageProps> = ({ characters, onCharactersUpdate }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleAddCharacter = () => {
    const newCharacter: Character = {
      id: generateId(),
      name: '',
      profilePicture: '',
      biography: ''
    };
    onCharactersUpdate([...characters, newCharacter]);
  };

  const handleRemoveCharacter = (characterId: string) => {
    const updatedCharacters = characters.filter(char => char.id !== characterId);
    onCharactersUpdate(updatedCharacters);
  };

  const handleNameChange = (characterId: string, name: string) => {
    const updatedCharacters = characters.map(char =>
      char.id === characterId ? { ...char, name } : char
    );
    onCharactersUpdate(updatedCharacters);
  };

  const handleProfilePictureChange = async (characterId: string, file: File) => {
    const dataUrl = await readFileAsDataURL(file);
    const updatedCharacters = characters.map(char =>
      char.id === characterId ? { ...char, profilePicture: dataUrl } : char
    );
    onCharactersUpdate(updatedCharacters);
  };

  const handleBiographyUpdate = (characterId: string, biography: string) => {
    const updatedCharacters = characters.map(char =>
      char.id === characterId ? { ...char, biography } : char
    );
    onCharactersUpdate(updatedCharacters);
    setSelectedCharacter(null);
  };

  return (
    <div className="characters-page">
      <div className="characters-header">
        <h1>Characters</h1>
        <button className="btn btn-primary" onClick={handleAddCharacter}>
          Add Character
        </button>
      </div>

      {characters.length === 0 ? (
        <div className="empty-state">
          <p>No characters yet. Click "Add Character" to create one.</p>
        </div>
      ) : (
        <div className="characters-grid">
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              <div className="character-profile-pic">
                {character.profilePicture ? (
                  <img src={character.profilePicture} alt={character.name || 'Character'} />
                ) : (
                  <span>👤</span>
                )}
              </div>

              <input
                type="text"
                className="input"
                value={character.name}
                onChange={(e) => handleNameChange(character.id, e.target.value)}
                placeholder="Character name..."
              />

              <div className="file-upload">
                <label>Profile Picture:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleProfilePictureChange(character.id, file);
                  }}
                />
              </div>

              <div className="character-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedCharacter(character)}
                >
                  Biography
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveCharacter(character.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCharacter && (
        <BiographyModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
          onSave={(biography) => handleBiographyUpdate(selectedCharacter.id, biography)}
        />
      )}
    </div>
  );
};
