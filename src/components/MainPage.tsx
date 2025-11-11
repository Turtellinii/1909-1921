import React from 'react';
import { Scene, Choice, SceneCharacter } from '../types';
import { generateId, readFileAsDataURL } from '../utils';

interface MainPageProps {
  scene: Scene;
  onSceneUpdate: (scene: Scene) => void;
}

export const MainPage: React.FC<MainPageProps> = ({ scene, onSceneUpdate }) => {
  const handleNarrativeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onSceneUpdate({ ...scene, narrative: e.target.value });
  };

  const handleNarrativeAudioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      onSceneUpdate({ ...scene, narrativeAudio: dataUrl });
    }
  };

  const handleChoiceChange = (choiceId: string, text: string) => {
    const updatedChoices = scene.choices.map(choice =>
      choice.id === choiceId ? { ...choice, text } : choice
    );
    onSceneUpdate({ ...scene, choices: updatedChoices });
  };

  const handleAddChoice = () => {
    const newChoice: Choice = {
      id: generateId(),
      text: ''
    };
    onSceneUpdate({ ...scene, choices: [...scene.choices, newChoice] });
  };

  const handleRemoveChoice = (choiceId: string) => {
    const updatedChoices = scene.choices.filter(choice => choice.id !== choiceId);
    onSceneUpdate({ ...scene, choices: updatedChoices });
  };

  const handleAddSceneCharacter = () => {
    const newSceneCharacter: SceneCharacter = {
      id: generateId(),
      characterId: '',
      image: '',
      audioUrl: ''
    };
    onSceneUpdate({ ...scene, sceneCharacters: [...scene.sceneCharacters, newSceneCharacter] });
  };

  const handleSceneCharacterImageChange = async (sceneCharId: string, file: File) => {
    const dataUrl = await readFileAsDataURL(file);
    const updatedSceneCharacters = scene.sceneCharacters.map(sc =>
      sc.id === sceneCharId ? { ...sc, image: dataUrl } : sc
    );
    onSceneUpdate({ ...scene, sceneCharacters: updatedSceneCharacters });
  };

  const handleSceneCharacterAudioChange = async (sceneCharId: string, file: File) => {
    const dataUrl = await readFileAsDataURL(file);
    const updatedSceneCharacters = scene.sceneCharacters.map(sc =>
      sc.id === sceneCharId ? { ...sc, audioUrl: dataUrl } : sc
    );
    onSceneUpdate({ ...scene, sceneCharacters: updatedSceneCharacters });
  };

  const handleRemoveSceneCharacter = (sceneCharId: string) => {
    const updatedSceneCharacters = scene.sceneCharacters.filter(sc => sc.id !== sceneCharId);
    onSceneUpdate({ ...scene, sceneCharacters: updatedSceneCharacters });
  };

  return (
    <div className="main-page">
      <div className="main-section">
        <div className="card narrative-section">
          <h2>Narrative</h2>
          <textarea
            className="textarea"
            value={scene.narrative}
            onChange={handleNarrativeChange}
            placeholder="Enter your story narrative here..."
          />
          <div className="file-upload">
            <label>Narration Audio:</label>
            <input
              type="file"
              accept="audio/*"
              className="file-input"
              onChange={handleNarrativeAudioChange}
            />
            {scene.narrativeAudio && (
              <audio controls className="audio-player" src={scene.narrativeAudio} />
            )}
          </div>
        </div>

        <div className="card choices-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Choices</h2>
            <button className="btn btn-primary" onClick={handleAddChoice}>
              Add Choice
            </button>
          </div>
          <div className="choices-list">
            {scene.choices.length === 0 ? (
              <div className="empty-state">
                <p>No choices yet. Click "Add Choice" to create one.</p>
              </div>
            ) : (
              scene.choices.map((choice) => (
                <div key={choice.id} className="choice-item">
                  <input
                    type="text"
                    className="input"
                    value={choice.text}
                    onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
                    placeholder="Enter choice text..."
                  />
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveChoice(choice.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="side-section">
        <div className="card scene-characters">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Scene Characters</h3>
            <button className="btn btn-secondary" onClick={handleAddSceneCharacter}>
              Add
            </button>
          </div>
          <div className="scene-character-list">
            {scene.sceneCharacters.length === 0 ? (
              <div className="empty-state">
                <p>No characters in this scene yet.</p>
              </div>
            ) : (
              scene.sceneCharacters.map((sceneChar) => (
                <div key={sceneChar.id} className="scene-character-item">
                  {sceneChar.image ? (
                    <img src={sceneChar.image} alt="Scene character" />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '150px',
                      background: '#f0f0f0',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                      marginBottom: '0.75rem'
                    }}>
                      No Image
                    </div>
                  )}
                  <div className="file-upload">
                    <label>Character Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleSceneCharacterImageChange(sceneChar.id, file);
                      }}
                    />
                  </div>
                  <div className="file-upload">
                    <label>Character Dialogue:</label>
                    <input
                      type="file"
                      accept="audio/*"
                      className="file-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleSceneCharacterAudioChange(sceneChar.id, file);
                      }}
                    />
                    {sceneChar.audioUrl && (
                      <audio controls className="audio-player" src={sceneChar.audioUrl} />
                    )}
                  </div>
                  <div className="scene-character-controls">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveSceneCharacter(sceneChar.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
