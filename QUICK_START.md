# 🎮 Adventure Game Template - Quick Start Guide

## For Mac Users - Super Easy Setup!

### First Time Setup (One-Time Only):

1. **Make the launcher executable:**
   - Open **Terminal** (find it in Applications > Utilities)
   - Type or paste this command, then press Enter:
     ```bash
     chmod +x "Start Adventure Game.command"
     ```
   - You only need to do this once!

### How to Use:

1. **Starting the App:**
   - Double-click the file: **"Start Adventure Game.command"**
   - A Terminal window will open and the app will start
   - Your browser will automatically open to the app
   - ⚠️ **Keep the Terminal window open while using the app!**

2. **Using the App:**
   - The app will open at: `http://localhost:5173`
   - Start creating your adventure game!
   - All your work saves automatically

3. **Stopping the App:**
   - Close the Terminal window that opened, OR
   - Click in the Terminal window and press `Ctrl+C`

### Troubleshooting:

**"Command not found" or permission errors:**
- You need to make the launcher executable (see step 1 above)

**Nothing happens when double-clicking:**
- Right-click the .command file
- Select "Open With" > "Terminal"
- Go to System Preferences > Security & Privacy and allow it to run

**Browser doesn't open automatically:**
- Manually open your browser and go to: `http://localhost:5173`

**Need Node.js?**
- If you get a "node: command not found" error, you need to install Node.js
- Download it from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- After installing, restart and try again

### Alternative: Manual Start

If the .command file doesn't work, you can start manually:

1. Open Terminal
2. Navigate to this folder:
   ```bash
   cd "/path/to/your/1909-1921"
   ```
3. Run:
   ```bash
   npm install    # Only needed the first time
   npm run dev    # Start the app
   ```

---

## What You Can Do in the App:

### Main Page:
- Write your story narrative
- Upload narration audio
- Add/edit/remove player choices
- Add scene characters with images and dialogue audio

### Characters Page:
- Add/remove characters
- Upload profile pictures
- Edit character names
- Write character biographies

Everything saves automatically to your browser!

---

**Need Help?** The app runs locally in your browser - no internet required after setup!
