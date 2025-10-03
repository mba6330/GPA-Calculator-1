// Load saved courses on page load
window.onload = function() {
  let savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
  savedCourses.forEach(course => addCourse(course));
};

// Add new course input row
document.getElementById("addCourse").addEventListener("click", function() {
  addCourse();
});

function addCourse(saved = null) {
  let courseDiv = document.createElement("div");
  courseDiv.classList.add("course");
  courseDiv.innerHTML = `
    <input type="text" placeholder="Course Name" value="${saved ? saved.name : ""}">
    <input type="number" class="credits" placeholder="Credits" min="1" value="${saved ? saved.credits : ""}">
    <select class="grade">
      <option value="4" ${saved?.grade == 4 ? "selected" : ""}>A</option>
      <option value="3.7" ${saved?.grade == 3.7 ? "selected" : ""}>A-</option>
      <option value="3.3" ${saved?.grade == 3.3 ? "selected" : ""}>B+</option>
      <option value="3" ${saved?.grade == 3 ? "selected" : ""}>B</option>
      <option value="2.7" ${saved?.grade == 2.7 ? "selected" : ""}>B-</option>
      <option value="2.3" ${saved?.grade == 2.3 ? "selected" : ""}>C+</option>
      <option value="2" ${saved?.grade == 2 ? "selected" : ""}>C</option>
      <option value="1.7" ${saved?.grade == 1.7 ? "selected" : ""}>C-</option>
      <option value="1" ${saved?.grade == 1 ? "selected" : ""}>D</option>
      <option value="0" ${saved?.grade == 0 ? "selected" : ""}>F</option>
    </select>
  `;
  document.getElementById("courses").appendChild(courseDiv);
}

// Calculate GPA
document.getElementById("gpaForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let credits = document.querySelectorAll(".credits");
  let grades = document.querySelectorAll(".grade");
  let names = document.querySelectorAll(".course input[type='text']");

  let totalCredits = 0;
  let totalPoints = 0;
  let coursesToSave = [];

  for (let i = 0; i < credits.length; i++) {
    let credit = parseFloat(credits[i].value);
    let grade = parseFloat(grades[i].value);
    let name = names[i].value;

    if (!isNaN(credit) && !isNaN(grade)) {
      totalCredits += credit;
      totalPoints += credit * grade;
      coursesToSave.push({ name, credits: credit, grade });
    }
  }

  localStorage.setItem("courses", JSON.stringify(coursesToSave));

  let gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;

  // Update result
  let resultEl = document.getElementById("result");
  resultEl.textContent = "Your GPA: " + gpa;

  // Color code GPA
  let progress = document.getElementById("progress");
  progress.style.width = (gpa / 4) * 100 + "%";
  if (gpa >= 3.5) {
    resultEl.style.color = "green";
    progress.style.background = "green";
  } else if (gpa >= 2.0) {
    resultEl.style.color = "orange";
    progress.style.background = "orange";
  } else {
    resultEl.style.color = "red";
    progress.style.background = "red";
  }
});

// Dark mode toggle
document.getElementById("toggleDark").addEventListener("click", function() {
  document.body.classList.toggle("dark");
});
