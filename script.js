document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("gpaForm");
  const coursesDiv = document.getElementById("courses");
  const result = document.getElementById("result");
  const progress = document.getElementById("progress");
  const toggleDark = document.getElementById("toggleDark");

  const audioWin = document.getElementById("audioWin");
  const audioLose = document.getElementById("audioLose");
  const marioPopup = document.getElementById("marioPopup");
  const sadPopup = document.getElementById("sadPopup");

  const gradePoints = {
    "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0
  };

  // ------- UI Setup -------
  function addCourse() {
    const row = document.createElement("div");
    row.className = "courseRow";
    row.innerHTML = `
      <input type="text" placeholder="Course Name" />
      <input type="number" placeholder="Credits" min="0" />
      <select>
        ${Object.keys(gradePoints).map(g => `<option value="${g}">${g}</option>`).join("")}
      </select>`;
    coursesDiv.appendChild(row);
  }
  document.getElementById("addCourse").addEventListener("click", addCourse);
  document.getElementById("clearAll").addEventListener("click", () => {
    coursesDiv.innerHTML = "";
    result.textContent = "Your GPA: 0";
    progress.style.width = "0%";
  });
  addCourse(); // first row

  // ------- Dark Mode -------
  toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // ------- GPA Calculation -------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const rows = coursesDiv.querySelectorAll(".courseRow");
    let totalPoints = 0, totalCredits = 0;

    rows.forEach(r => {
      const [nameIn, credIn, gradeSel] = r.querySelectorAll("input, select");
      const credits = parseFloat(credIn.value) || 0;
      const grade = gradeSel.value;
      if (credits > 0) {
        totalPoints += (gradePoints[grade] || 0) * credits;
        totalCredits += credits;
      }
    });

    const gpa = totalCredits ? (totalPoints / totalCredits) : 0;
    const gpaText = gpa.toFixed(2);
    result.textContent = `Your GPA: ${gpaText}`;

    // progress + color
    const pct = Math.min(100, (gpa / 4) * 100);
    progress.style.width = pct + "%";
    if (gpa >= 3) {
      progress.style.background = "linear-gradient(90deg, #2ecc71, #a3ff9b)";
      popup(marioPopup, audioWin);
      confetti({ particleCount: 180, spread: 90, origin: { y: 0.6 } });
    } else if (gpa >= 2) {
      progress.style.background = "linear-gradient(90deg, #ffb84d, #ffd66b)";
    } else {
      progress.style.background = "linear-gradient(90deg, #ff4d4d, #b30000)";
      popup(sadPopup, audioLose);
    }
  });

  function popup(el, sound) {
    el.classList.add("show");
    try { sound.currentTime = 0; sound.play(); } catch {}
    setTimeout(() => el.classList.remove("show"), 2800);
  }
});
