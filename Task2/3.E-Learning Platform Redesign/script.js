const courses = [
  { title: "Intro to HTML", progress: 0, interest: "Web Development" },
  { title: "JavaScript Basics", progress: 15, interest: "Web Development" },
  { title: "Python for Data Science", progress: 30, interest: "Data Science" },
  { title: "React Fundamentals", progress: 0, interest: "Web Development" },
  { title: "Machine Learning 101", progress: 0, interest: "AI & ML" },
  { title: "UI/UX Design Principles", progress: 0, interest: "Design" },
  { title: "Database Management", progress: 4, interest: "Data Science" },
  { title: "Cybersecurity Essentials", progress: 20, interest: "AI & ML" },
  { title: "Cloud Computing Basics", progress: 0, interest: "AI & ML" },
  { title: "Git & Version Control", progress: 0, interest: "Web Development" }
];

const videoMap = {
  "Web Development": `<iframe width="100%" height="315" src="https://www.youtube.com/embed/3JluqTojuME" frameborder="0" allowfullscreen></iframe>`,
  "Data Science": `<iframe width="100%" height="315" src="https://www.youtube.com/embed/X3paOmcrTjQ" frameborder="0" allowfullscreen></iframe>`,
  "AI & ML": `<iframe width="100%" height="315" src="https://www.youtube.com/embed/ukzFI9rgwfU" frameborder="0" allowfullscreen></iframe>`,
  "Design": `<iframe width="100%" height="315" src="https://www.youtube.com/embed/GQS7wPujL2k" frameborder="0" allowfullscreen></iframe>`
};

const courseVideos = {
  "Intro to HTML": { url: "https://www.youtube.com/embed/BvJYXl2ywUE", duration: 600 },
  "JavaScript Basics": { url: "https://www.youtube.com/embed/xwKbtUP87Dk", duration: 720 },
  "Python for Data Science": { url: "https://www.youtube.com/embed/wUSDVGivd-8", duration: 900 },
  "React Fundamentals": { url: "https://www.youtube.com/embed/6Ied4aZxUzc", duration: 840 },
  "Machine Learning 101": { url: "https://www.youtube.com/embed/i_LwzRVP7bg", duration: 960 },
  "UI/UX Design Principles": { url: "https://www.youtube.com/embed/NTmh8l-Xl4c", duration: 780 },
  "Database Management": { url: "https://www.youtube.com/embed/YRnjGeQbsHQ", duration: 660 },
  "Cybersecurity Essentials": { url: "https://www.youtube.com/embed/gYK_eZCUVr4", duration: 720 },
  "Cloud Computing Basics": { url: "https://www.youtube.com/embed/ksDAQX6MbeE", duration: 600 },
  "Git & Version Control": { url: "https://www.youtube.com/embed/PWqS4NBhEY8", duration: 540 }
};

let currentCourse = null;
let progressInterval = null;

function getSelectedInterests() {
  const selectedButton = document.querySelector(".tags button.selected");
  return selectedButton ? [selectedButton.dataset.interest] : [];
}

function renderCourses() {
  const selectedInterests = getSelectedInterests();
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";

  const filteredCourses = selectedInterests.length === 0
    ? courses
    : courses.filter(course => selectedInterests.includes(course.interest));

  filteredCourses.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <h3 class="course-title" style="cursor:pointer;">${course.title}</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${course.progress}%"></div>
      </div>
      <p>${Math.floor(course.progress)}% completed</p>
    `;
    card.querySelector(".course-title").addEventListener("click", () => openModal(course));
    courseList.appendChild(card);
  });
}

function updateFeaturedVideo(interest) {
  const featuredVideo = document.getElementById("featuredVideo");
  featuredVideo.innerHTML = videoMap[interest] || "";
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function openModal(course) {
  currentCourse = course;
  document.getElementById("modalTitle").textContent = course.title;

  const { url, duration } = courseVideos[course.title];
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = `
    <iframe width="100%" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>
  `;

  document.getElementById("videoModal").style.display = "block";
  document.getElementById("videoProgress").style.width = "0%";
  document.getElementById("videoPercent").textContent = `0:00 / ${formatTime(duration)}`;

  let elapsed = 0;
  const intervalTime = 1000;
  progressInterval = setInterval(() => {
    if (elapsed < duration) {
      elapsed += 1;
      const percentWatched = Math.floor((elapsed / duration) * 100);
      document.getElementById("videoProgress").style.width = percentWatched + "%";
      document.getElementById("videoPercent").textContent = `${formatTime(elapsed)} / ${formatTime(duration)}`;

      currentCourse.progress = Math.min(currentCourse.progress + 0.1, 100);
      renderCourses();
    } else {
      clearInterval(progressInterval);
    }
  }, intervalTime);
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("videoModal").style.display = "none";
  clearInterval(progressInterval);
});

document.querySelectorAll(".tags button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tags button").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    renderCourses();
    updateFeaturedVideo(button.dataset.interest);
  });
});

// Initial render
renderCourses();
