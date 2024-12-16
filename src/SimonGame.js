/*
Scenario:
1.UI with 4 color buttons with a header that initially says "Press any key to start".
2.After clicking any button, the header should change to "Level 1".
3.In Level 1, generate a random color and flash it. After the flash, it should popup to indicate the user to click that button.
4.If the user clicks the correct button, they move to Level 2, and the header should display "Level 2". The game continues.
5.If the user clicks the wrong button, the game ends, and the header should display "Game Over!".
*/
/*
I have added detailed comments for every function and element in the code to ensure better understanding and clarity for other programmers.
*/
import React, { useState, useEffect } from "react";
import "./SimonGame.css";

function SimonGame() {
  // State variables to manage game message, level, random color, user clicked color, and game status
  const [message, setMessage] = useState("Press a key to start");
  const [level, setLevel] = useState(1);
  const [randomColor, setRandomColor] = useState("");
  const [userClickedColor, setUserClickedColor] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const buttons = ["green", "red", "yellow", "blue"];
  // Function to get a random color from the list of buttons
  const getRandomColor = () => {
    // Logic to get a random color from the 'buttons' array using Math.random() is implemented with basic JavaScript.
    const randomIndex = Math.floor(Math.random() * buttons.length);
    const randomColor = buttons[randomIndex];
    console.log("Random Color:", randomColor);
    return randomColor;
  };

  // Function to start the game when any button is clicked
  const startLevel1 = () => {
    const newRandomColor = getRandomColor();
    setRandomColor(newRandomColor);

    setMessage(`Level 1`);

    setGameStarted(true);
    setUserClickedColor("");
    flashColor(newRandomColor);
  };
  // Function to handle flashing the random color
  const flashColor = (color) => {
    buttons.forEach((button) => {
      //  Direct DOM manipulation is used in functions like 'flashColor' to add/remove the 'flash' class on buttons using vanilla JavaScript's document.getElementById().
      const colorButton = document.getElementById(button);
      colorButton.classList.remove("flash");
    });

    const colorButton = document.getElementById(color);
    colorButton.classList.add("flash");

    setTimeout(() => {
      colorButton.classList.remove("flash");
    }, 2000);
  };
  // Function to handle user button click
  const handleButtonClick = (color) => {
    /*
    This block checks if the game has not started yet.
    If the game has not started, the following code inside the block will execute.
    In this case, it calls the startLevel1() function to initiate the game.
    */
    if (!gameStarted) {
      startLevel1(); // Start the game when any button is clicked initially
      return;
    }

    setUserClickedColor(color); // Set the user's clicked color
    console.log(randomColor);

    if (color === randomColor) {
      // If the correct color is clicked, move to the next level

      setLevel(level + 1); // Increase the level
      setMessage(`Level ${level + 1} `); // Update header to next level
      setRandomColor(getRandomColor()); // Get a new random color for the next level
      flashColor(randomColor); // Flash the new color for the next level
    } else {
      // If the wrong color is clicked, the game ends
      setMessage("Game Over!"); // Set header to "Game Over"
      setLevel(1);
      setGameStarted(false); // End the game
    }
  };
  // Effect hook to flash the random color whenever it changes
  useEffect(() => {
    if (randomColor) {
      flashColor(randomColor); // Flash the random color when the game starts
    }
  }, [randomColor]);

  return (
    /*
    Bootstrap:
  - Used for grid layout with classes like 'd-flex', 'd-grid', 'gap-3', 'justify-content-center', 'align-items-center', 'flex-grow-1', 'text-center', 'mb-0', 'sticky-top', 'py-3', 'bg-dark', 'text-white', 'mt-4'.
  - These classes are used for responsive design, centering elements, setting colors, spacing, and sticky headers.
    */
    /* Parent container with a dark background, white text, flexbox layout in a column direction, and full viewport height */
    <div className="bg-dark text-white d-flex flex-column vh-100">
      {/* Sticky header with padding and a retro-style centered heading displaying dynamic game messages  */}
      <header className="sticky-top py-3">
        <h2 className="text-center mb-0 retro-header">{message}</h2>
      </header>
      {/* 
  Outer flex container to center the grid of buttons both vertically and horizontally.
  - d-flex: Enables flexbox layout.
  - justify-content-center: Centers content horizontally.
  - align-items-center: Aligns content vertically.
  - flex-grow-1: Allows the container to grow and fill available space.
*/}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        {/* 
    Inner grid container with a 2x2 layout for buttons.
    - d-grid: Enables CSS Grid layout.
    - gap-3: Adds spacing between grid items.
    - gridTemplateColumns: "auto auto" ensures two equal columns.
  */}
        <div
          className="d-grid gap-3"
          style={{ gridTemplateColumns: "auto auto" }}
        >
          {/* 
      Individual color buttons with specific Bootstrap color classes and click event handlers.
      - simon-button: Custom class for button styling.
      - bg-success: Bootstrap class for green background.
      - onClick: Handles the button click and triggers handleButtonClick("green").
    */}
          <div
            id="green"
            className="simon-button bg-success"
            onClick={() => handleButtonClick("green")}
          ></div>
          <div
            id="red"
            className="simon-button bg-danger"
            onClick={() => handleButtonClick("red")}
          ></div>
          <div
            id="yellow"
            className="simon-button bg-warning"
            onClick={() => handleButtonClick("yellow")}
          ></div>
          <div
            id="blue"
            className="simon-button bg-primary"
            onClick={() => handleButtonClick("blue")}
          ></div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <p>User Clicked Color: {userClickedColor}</p>
      </div>
    </div>
  );
}

export default SimonGame;
