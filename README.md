# NuwuBench

A retro-styled human benchmark testing website featuring 45 interactive games to test various cognitive and motor skills.

## Features

- **VT323 Retro Font**: Authentic pixel-style monospace typography
- **Theme Switcher**: Toggle between dark mode (default) and light mode
- **Auto-Start Games**: Games begin as soon as you start interacting - no START buttons needed!
- **45 Unique Tests**: Comprehensive collection of human capability benchmarks
- **Sound Effects**: Interactive audio feedback using Web Audio API
- **Animations & Effects**: Confetti, shake effects, smooth transitions, and particle effects
- **Fully Customizable**: Adjustable difficulty, duration, and settings for all tests
- **Local Records**: Track your best scores and performances
- **Responsive Design**: Works on desktop and mobile devices

## Games/Tests

### 1. Click Speed Test
Measure your clicking speed in clicks per second (CPS) with customizable time frames (5s, 10s, 30s, 60s). Tracks records and average CPS.

### 2. Type Speed Test
Calculate your typing speed in words per minute (WPM) and accuracy with adjustable durations (30s, 60s, 120s).

### 3. Reaction Test (Mouse)
Click appearing circles as fast as possible. Measures average reaction time with adjustable target count and delay.

### 4. Reaction Test (Keyboard)
Press displayed letters on your keyboard as quickly as possible. Tracks reaction time across multiple rounds.

### 5. Memory Test
Simon-says style grid memory game with progressive difficulty. Remember and repeat increasingly complex sequences.

### 6. Math Test
Solve arithmetic problems quickly with three difficulty levels (Easy, Medium, Hard) and adjustable time limits.

### 7. Circle Draw Test
Draw a perfect circle with your mouse and get an accuracy rating based on how close you get to a perfect circle.

### 8. Programming Test
Multiple choice quiz testing basic programming knowledge with 20 questions covering HTML, CSS, JavaScript, and general programming concepts. Enhanced with sound effects and celebration animations for perfect scores.

### 9. Advanced Tic Tac Toe
Play against AI with three difficulty levels: Easy, Medium, and Hard (Unbeatable). Tracks wins, losses, and draws.

### 10. Pattern Recognition
Identify and complete number, letter, and shape patterns. Progressive difficulty with scoring system.

### 11. Number Memory
Remember increasingly long number sequences. Tests short-term memory with progressive difficulty.

### 12. Visual Memory
Remember positions of highlighted squares on a grid. Grid size increases with level, with a lives system.

### 13. Sequence Memory
Repeat increasingly complex sequences by clicking squares in the correct order. Score-based progression.

### 14. Aim Trainer
Click targets that appear randomly on screen. Adjustable target size and count to measure accuracy and speed.

### 15. Chimp Test
Click numbers in ascending order before they disappear. Inspired by chimpanzee intelligence tests. Progressive difficulty.

### 16. Word Scramble
Unscramble words as quickly as possible. Tests vocabulary and pattern recognition under time pressure.

### 17. Color Match
Identify if the text color matches the word shown. Tests attention to detail and quick decision making.

### 18. Typing Accuracy
Focus purely on accuracy rather than speed. Type the sample text perfectly to complete the test.

### 19. Reflex Test
Press spacebar when the screen turns green. Measures pure reaction time without cursor movement.

### 20. Stroop Test
Click the color of the text, not what the word says. Classic cognitive test for mental flexibility.

### 21. Verbal Memory
Remember which words you've seen before. Tests short-term verbal memory and recognition.

### 22. Number Sequence
Identify the pattern and continue the number sequence. Tests mathematical reasoning and pattern recognition.

### 23. Typing Rhythm
Maintain a consistent typing speed. Tests motor control and rhythm consistency.

### 24. Multi-Task Test
Click targets AND type text simultaneously. Tests ability to multitask under pressure.

### 25. Countdown Challenge
Type numbers in descending order as fast as possible. Tests speed and accuracy under pressure.

### 26. Speed Clicker
Click as many targets as possible in 15 seconds. Tests mouse speed and accuracy.

### 27. Letter Memory
Remember increasingly long letter sequences. Tests short-term memory with progressive difficulty.

### 28. Color Sequence
Repeat color patterns in a Simon-says style game. Score-based progression with memory challenges.

### 29. Mental Math Sprint
Quick mental calculations with time pressure. Tests arithmetic skills and streak tracking.

### 30. Pixel Perfect
Draw straight lines between dots. Tests hand-eye coordination and precision.

### 31. Sound Memory
Remember patterns of colored beeps. Visual representation of audio memory patterns.

### 32. Puzzle Slider
Solve sliding number puzzles. Classic 8-puzzle with move tracking.

### 33. Color Reaction
Press SPACE when colors match. Tests reaction time and pattern recognition.

### 34. Typing Ninja
Type falling words before they hit the bottom. Tests typing speed under pressure.

### 35. Button Masher
Press SPACEBAR as many times as possible in 10 seconds. Tests rapid key pressing ability.

### 36. Memory Cards
Match pairs of emoji cards. Classic memory matching game with move tracking.

### 37. Arrow Dodge
Dodge incoming arrows using arrow keys. Tests reflexes and keyboard control.

### 38. Precision Click
Click tiny targets that appear randomly. Tests mouse precision and accuracy.

### 39. Emoji Memory
Remember emoji sequences and identify which emoji appeared. Progressive difficulty levels.

### 40. Quick Decision
Choose the larger number quickly. Tests decision-making speed under time pressure.

### 41. Snake Game 🎮
Classic arcade snake game. Eat food to grow longer, avoid walls and yourself. High score tracking.

### 42. Whack-a-Mole 🎮
Hit the moles as they pop up from holes. Tests reaction time and accuracy with miss tracking.

### 43. Space Invaders Mini 🎮
Retro space shooter. Use arrow keys to move and SPACE to shoot. Defeat all invaders to win.

### 44. Match-3 Puzzle 🎮
Match three or more colored emojis in a row. Limited moves with combo scoring.

### 45. Runner Game 🎮
Endless runner challenge. Press SPACE to jump over obstacles. Progressive speed increase.

## How to Use

1. Open `index.html` in a web browser
2. Select a game from the main menu
3. **No START button needed!** Games automatically begin when you:
   - Click in the game area
   - Start typing
   - Press a key
   - Or simply interact with the game
4. Use the "Back to Menu" button to return to game selection
5. Toggle between light and dark themes using the button in the header

## Interactive Features

### Sound Effects 🔊
- **Click Sounds**: Every interaction provides audio feedback
- **Success Sounds**: Celebratory tones for correct answers and wins
- **Failure Sounds**: Distinct audio cues for mistakes
- **Hover Sounds**: Subtle feedback when hovering over menu items
- **Power-Up Sounds**: Special sounds for achievements

All sound effects are generated using the Web Audio API - no external files needed!

### Visual Effects ✨
- **Confetti Particles**: Celebrate perfect scores and wins
- **Shake Animations**: Visual feedback for errors
- **Pulse Effects**: Highlight successful actions
- **Smooth Transitions**: Elegant animations between screens
- **Staggered Entrances**: Answer options and elements animate in sequence
- **Rainbow Borders**: Colorful borders on game cards

### Enhanced Interactivity
- Animated feedback for all user actions
- Visual and audio confirmation for every interaction
- Celebration effects for achievements
- Progress animations throughout games
- Responsive hover effects on all clickable elements

## Theme Switcher

Click the theme toggle button in the top right corner to switch between:
- **Dark Mode** (default): Easy on the eyes with warm retro colors
- **Light Mode**: Clean and bright interface for daytime use

Your theme preference is saved automatically in your browser.

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- VT323 Google Font
- Local Storage for preferences and records

## Color Palette

### Dark Theme (Default)
- Background: `#2b2b2b` (Dark Gray)
- Primary: `#ffa07a` (Light Salmon)
- Secondary: `#dda15e` (Sandy Brown)
- Accent: `#8b4513` (Saddle Brown)
- Text: `#f0e68c` (Khaki)

### Light Theme
- Background: `#f5f5f5` (Light Gray)
- Cards: `#ffffff` (White)
- Primary: `#d2691e` (Chocolate)
- Secondary: `#8b4513` (Saddle Brown)
- Text: `#2b2b2b` (Dark Gray)

## License

Open source - feel free to use and modify!
