import React, { useState } from 'react';
import { Character } from '../types';

interface BiographyModalProps {
  character: Character;
  onClose: () => void;
  onSave: (biography: string) => void;
}

export const BiographyModal: React.FC<BiographyModalProps> = ({ character, onClose, onSave }) => {
  const [biography, setBiography] = useState(character.biography);

  const handleSave = () => {
    onSave(biography);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>{character.name || 'Character'} Biography</h2>
        <div className="modal-content">
          <textarea
            className="textarea"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="Enter character biography..."
            style={{ minHeight: '300px' }}
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
