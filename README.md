# Adventure Game Template

An interactive choose-your-own-adventure game template built with React and TypeScript.

## 🚀 Quick Start (For Mac Users)

**The easiest way to start:**

1. Double-click the file: **"Start Adventure Game.command"**
2. The app will automatically open in your browser
3. Start creating your adventure game!

**First time only:** You may need to make the file executable. Open Terminal and run:
```bash
chmod +x "Start Adventure Game.command"
```

📖 **See [QUICK_START.md](QUICK_START.md) for detailed instructions and troubleshooting.**

## Features

### Main Page
- **Scene Images**: Upload multiple images for your scene (displayed above narrative)
- **Editable Narrative**: Write your story narrative with a large text area
- **Narration Audio**: Upload audio files for narration
- **Multiple Choices**: Add, edit, and remove choice options for the player
- **Scene Characters**: Display characters in the current scene with:
  - Character images
  - Character dialogue audio
  - Add/remove characters from the scene

### Characters Page
- **Character Management**: Add and remove characters
- **Profile Pictures**: Upload profile images for each character
- **Image Positioning Controls**: Adjust how character portraits are displayed:
  - **Image Fit**: Choose between Cover, Contain, Fill, or Scale Down
  - **Image Position**: Position images (center, top, bottom, left, right, corners)
- **Editable Names**: Edit character names directly
- **Biography Modal**: Click "Biography" button to open a modal where you can write detailed character biographies

### Data Persistence
- All data is automatically saved to a file on your computer: `data/game-data.json`
- A "Saved to file!" indicator appears whenever changes are made
- Your work is saved permanently and survives browser restarts
- Data includes all text, images, and audio as embedded data

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Starts both the backend server (port 3001) and frontend dev server (port 5173).
The app will be available at `http://localhost:5173`

To run servers separately:
```bash
npm run server  # Backend only
npm run dev     # Frontend only
```

### Build

```bash
npm run build
```

Builds the production-ready application to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Main Page**:
   - Enter your narrative text in the text area
   - Upload audio for narration (optional)
   - Add choices using the "Add Choice" button
   - Add scene characters using the "Add" button in the side panel
   - Upload images and audio for each scene character

2. **Characters Page**:
   - Click "Add Character" to create a new character
   - Upload a profile picture
   - Edit the character's name
   - Click "Biography" to open the modal and write their backstory
   - Click "Remove" to delete a character

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Node.js + Express** - Backend server for file-based storage
- **Vite** - Build tool and dev server
- **CSS3** - Styling

## Data Structure

All data is saved to `data/game-data.json` on your computer with the following structure:

```typescript
{
  characters: Character[],  // List of all characters with profile pics
  scene: {
    narrative: string,         // Main narrative text
    narrativeAudio: string,    // Audio file as data URL
    sceneImages: SceneImage[], // Images for the scene
    choices: Choice[],         // Available choices
    sceneCharacters: []        // Characters with images/audio in scene
  }
}
```

## System Requirements

- **Node.js** (v14 or higher) - Download from https://nodejs.org/
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Works on Mac, Windows, and Linux
