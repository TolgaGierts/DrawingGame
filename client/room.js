import drawableCanvas from "./drawableCanvas";

const { io } = require("socket.io-client");

const production = process.env.NODE_ENV === "production";
const serverUrl = production ? "" : "http://localhost:3000";

const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const roomId = urlParams.get("room-id");
console.log(name, roomId);

if (!name || !roomId) window.location = "/index.html";

const socket = io(serverUrl);

const guessForm = document.querySelector("[data-guess-form]");
const guessInput = document.querySelector("[data-guess-input]");
const wordElement = document.querySelector("[data-word]");
const messagesElement = document.querySelector("[data-messages]");
const readyButton = document.querySelector("[data-ready-button]");
const canvas = document.querySelector("[data-canvas]");
const guessTemplate = document.querySelector("[data-guess-template]");
const drawableCanvas = new drawableCanvas(canvas, socket);

socket.emit("join-room", {
  name: name,
  roomId: roomId,
});
socket.on("start-drawer", startRoundDrawer);
socket.on("start-guesser", startRoundGuesser);
socket.on("make-guess", displayGuess);
socket.on("guess", endRound);
endRound();
resizeCanvas();
setupHTMLEvents();

window.addEventListener("resize", resizeCanvas);

function setupHTMLEvents() {
  readyButton.addEventListener("click", (e) => {
    hide(readyButton);
    socket.emit("ready");
  });
  guessForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (guessInput.value === "") return;
    socket.emit("make-guess", { guess: guessInput.value });
    displayGuess(name, guessInput.value);
    guessInput.value = "";
  });
}

function displayGuess(guesserName, guess) {
  const guessTemplateClone = guessTemplate.content.cloneNode(true);
  const messageElement = guessTemplateClone.querySelector("[data-text]");
  const nameElement = guessTemplateClone.querySelector("[data-name]");
  nameElement.innerText = guesserName;
  messageElement.innerText = guess;
  messagesElement.append(guessTemplateClone);
}

function startRoundDrawer(word) {
  drawableCanvas.canDraw = true;
  drawableCanvas.clearCanvas();
  wordElement.innerText = word;
  messagesElement.innerHTML = "";
}

function startRoundGuesser() {
  show(guessForm);
  hide(wordElement);
  drawableCanvas.clearCanvas();
  wordElement.innerText = "";
  messagesElement.innerHTML = "";
}

function endRound(name, word) {
  if (word && name) {
    wordElement.innerText = word;
    show(wordElement);
    displayGuess(`${name}, is the winner`);
  }
  drawableCanvas.canDraw = false;
  show(readyButton);
  hide(guessForm);
}

function resizeCanvas() {
  canvas.width = null;
  canvas.height = null;
  const clientDimensions = canvas.getBoundingClientRect();
  canvas.width = clientDimensions.width;
  canvas.height = clientDimensions.height;
}

function hide(element) {
  element.classList.add("hide");
}

function show(element) {
  element.classList.remove("hide");
}
