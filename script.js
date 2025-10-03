/* General page styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Dark mode with stars */
body.dark {
  background: black;
  color: white;
}

.space {
  display: none;
}

body.dark .space {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
}

.starfield {
  position: absolute;
  width: 200%;
  height: 200%;
  background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
  animation: moveStars 100s linear infinite;
}

@keyframes moveStars {
  from { transform: translateY(0); }
  to { transform: translateY(-1000px); }
}

/* Container */
.container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 90%;
  max-width: 500px;
  text-align: center;
}

body.dark .container {
  background: #1e1e1e;
}

/* Buttons */
button {
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.primary {
  background: #007bff;
  color: white;
}

.ghost {
  background: #ddd;
  color: #333;
}

.toggle {
  background: #444;
  color: white;
}

/* Inputs */
input, select {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Progress bar */
.progress-bar {
  width: 100%;
  height: 20px;
  background: #ddd;
  border-radius: 10px;
  margin-top: 1rem;
}

#progress {
  height: 100%;
  width: 0%;
  border-radius: 10px;
  transition: width 0.5s ease, background 0.5s ease;
}

/* Popups */
.popup {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  z-index: 10;
}

.popup img {
  width: 120px;
}

.popup.right {
  right: 10px;
}

.popup.left {
  left: 10px;
}
