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
      biography: '',
      imageObjectFit: 'cover',
      imageObjectPosition: 'center'
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

  const handleImageFitChange = (characterId: string, objectFit: 'cover' | 'contain' | 'fill' | 'scale-down') => {
    const updatedCharacters = characters.map(char =>
      char.id === characterId ? { ...char, imageObjectFit: objectFit } : char
    );
    onCharactersUpdate(updatedCharacters);
  };

  const handleImagePositionChange = (characterId: string, objectPosition: string) => {
    const updatedCharacters = characters.map(char =>
      char.id === characterId ? { ...char, imageObjectPosition: objectPosition } : char
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
                  <img
                    src={character.profilePicture}
                    alt={character.name || 'Character'}
                    style={{
                      objectFit: character.imageObjectFit || 'cover',
                      objectPosition: character.imageObjectPosition || 'center'
                    }}
                  />
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

              {character.profilePicture && (
                <div className="image-positioning-controls">
                  <div style={{ marginBottom: '0.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#555' }}>
                      Image Fit:
                    </label>
                    <select
                      className="input"
                      value={character.imageObjectFit || 'cover'}
                      onChange={(e) => handleImageFitChange(character.id, e.target.value as any)}
                    >
                      <option value="cover">Cover (fill frame)</option>
                      <option value="contain">Contain (fit inside)</option>
                      <option value="fill">Fill (stretch)</option>
                      <option value="scale-down">Scale Down (shrink if needed)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#555' }}>
                      Image Position:
                    </label>
                    <select
                      className="input"
                      value={character.imageObjectPosition || 'center'}
                      onChange={(e) => handleImagePositionChange(character.id, e.target.value)}
                    >
                      <option value="center">Center</option>
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                      <option value="top left">Top Left</option>
                      <option value="top right">Top Right</option>
                      <option value="bottom left">Bottom Left</option>
                      <option value="bottom right">Bottom Right</option>
                    </select>
                  </div>
                </div>
              )}

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
