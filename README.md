# DrawingGame
The Drawing Game is an interactive web application where two players join a room, one draws a word, and the other player guesses it. It's built with HTML, CSS, JavaScript, and Socket.IO for real-time communication.

## Features

- Real-time multiplayer drawing and guessing game.
- Players join a shared room and take turns drawing and guessing words.
- WebSocket communication using Socket.IO to keep the game in sync.
- Responsive canvas for drawing and a text input for guessing.
- Endless fun with friends and family!

## How to Play

1. To get started, make sure you have the necessary dependencies installed.

2. Open the game using the provided URL.

3. Enter your name and the room ID to join a game room. If you don't have these details, you can't participate in the game.

4. The game will randomly select one player as the drawer and assign a word to draw. The other player becomes the guesser.

5. The drawer can use the canvas to draw the word. The guesser can use the input field to make guesses.

6. When a round ends, the drawer and guesser roles switch, and the game continues.

7. Enjoy the game and have fun guessing and drawing!

## Dependencies

This project relies on the following technologies and libraries:

- HTML, CSS, and JavaScript for the front-end.
- [Socket.IO](https://socket.io/) for real-time communication between players.
