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
- **Editable Names**: Edit character names directly
- **Biography Modal**: Click "Biography" button to open a modal where you can write detailed character biographies

### Data Persistence
- All data is automatically saved to browser localStorage
- A "Saved!" indicator appears whenever changes are made
- Data persists across browser sessions

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the development server at `http://localhost:5173`

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
- **Vite** - Build tool and dev server
- **CSS3** - Styling

## Data Structure

All data is stored in localStorage under the key `adventure-game-data` with the following structure:

```typescript
{
  characters: Character[],  // List of all characters
  scene: {
    narrative: string,       // Main narrative text
    narrativeAudio: string,  // Audio file as data URL
    choices: Choice[],       // Available choices
    sceneCharacters: []      // Characters in current scene
  }
}
```

## Browser Compatibility

Works in all modern browsers that support:
- ES2020
- localStorage
- FileReader API
- Audio/Image upload
