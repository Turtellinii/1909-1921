import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ImagePositionDraggerProps {
  imageUrl: string;
  currentFit: 'cover' | 'contain' | 'fill' | 'scale-down';
  currentPosition: string;
  onPositionChange: (position: string) => void;
  onFitChange: (fit: 'cover' | 'contain' | 'fill' | 'scale-down') => void;
}

export const ImagePositionDragger: React.FC<ImagePositionDraggerProps> = ({
  imageUrl,
  currentFit,
  currentPosition,
  onPositionChange,
  onFitChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(currentPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    setPosition(currentPosition);
  }, [currentPosition]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp values between 0 and 100
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    const newPosition = `${clampedX.toFixed(1)}% ${clampedY.toFixed(1)}%`;
    setPosition(newPosition);
    onPositionChange(newPosition);
  }, [onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="image-position-dragger">
      <div className="dragger-controls">
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#555' }}>
          Image Fit:
        </label>
        <select
          className="input"
          value={currentFit}
          onChange={(e) => onFitChange(e.target.value as any)}
          style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}
        >
          <option value="cover">Cover (fill frame)</option>
          <option value="contain">Contain (fit inside)</option>
          <option value="fill">Fill (stretch)</option>
          <option value="scale-down">Scale Down (shrink if needed)</option>
        </select>
      </div>

      <div className="dragger-preview-label">
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#555' }}>
          Image Position: (drag to adjust)
        </label>
      </div>

      <div
        ref={containerRef}
        className={`dragger-preview ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <img
          src={imageUrl}
          alt="Position preview"
          style={{
            objectFit: currentFit,
            objectPosition: position,
          }}
          draggable={false}
        />
        <div className="dragger-crosshair">
          <div className="crosshair-vertical"></div>
          <div className="crosshair-horizontal"></div>
        </div>
        {isDragging && <div className="drag-overlay">Positioning...</div>}
      </div>

      <div className="dragger-hint">
        Click and drag the image to reposition it
      </div>
    </div>
  );
};
