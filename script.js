// GPA values
const gradePoints = {
  A: 4.0,
  B: 3.0,
  C: 2.0,
  D: 1.0,
  F: 0.0
};

const form = document.getElementById("gpaForm");
const coursesDiv = document.getElementById("courses");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const addCourseBtn = document.getElementById("addCourse");
const clearBtn = document.getElementById("clearAll");
const darkToggle = document.getElementById("toggleDark");

// Popups and sounds
const popupWin = document.getElementById("popupWin");
const popupLose = document.getElementById("popupLose");
const audioWin = document.getElementById("audioWin");
const audioLose = document.getElementById("audioLose");

// Load dark mode setting
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Add first course by default
addCourse();

// Add new course input
addCourseBtn.addEventListener("click", addCourse);
function addCourse() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Course Name" />
    <input type="number" placeholder="Credits" min="1" />
    <select>
      <option>A</option>
      <option>B</option>
      <option>C</option>
      <option>D</option>
      <option>F</option>
    </select>
  `;
  coursesDiv.appendChild(div);
}

// Clear all
clearBtn.addEventListener("click", () => {
  coursesDiv.innerHTML = "";
  result.textContent = "Your GPA: 0";
  progress.style.width = "0%";
  hidePopups();
  addCourse();
});

// Toggle dark mode
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// GPA calculation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const rows = coursesDiv.querySelectorAll("div");
  let totalCredits = 0;
  let totalPoints = 0;

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input, select");
    const credits = parseFloat(inputs[1].value) || 0;
    const grade = inputs[2].value;
    totalCredits += credits;
    totalPoints += gradePoints[grade] * credits;
  });

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
  result.textContent = `Your GPA: ${gpa}`;

  // Update progress bar
  const percent = (gpa / 4) * 100;
  progress.style.width = percent + "%";
  progress.style.background = gpa >= 3 ? "green" : gpa >= 2 ? "orange" : "red";

  hidePopups();

  if (gpa >= 3) {
    popupWin.style.display = "block";
    audioWin.play();
    setTimeout(() => popupWin.style.display = "none", 3000);
  } else if (gpa > 0) {
    popupLose.style.display = "block";
    audioLose.play();
    setTimeout(() => popupLose.style.display = "none", 3000);
  }
});

// Hide popups
function hidePopups() {
  popupWin.style.display = "none";
  popupLose.style.display = "none";
}
