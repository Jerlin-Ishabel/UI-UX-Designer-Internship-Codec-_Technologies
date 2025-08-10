const jobs = [
  {
    title: "Frontend Developer",
    variants: [
      { location: "Remote", type: "Full-time" },
      { location: "Chennai", type: "Internship" },
      { location: "Bangalore", type: "Part-time" }
    ]
  },
  {
    title: "Data Analyst",
    variants: [
      { location: "Hyderabad", type: "Full-time" },
      { location: "Mumbai", type: "Remote" },
      { location: "Chennai", type: "Internship" }
    ]
  },
  {
    title: "AI Researcher",
    variants: [
      { location: "Bangalore", type: "Remote" },
      { location: "Delhi", type: "Full-time" },
      { location: "Pune", type: "Contract" }
    ]
  },
  {
    title: "Backend Engineer",
    variants: [
      { location: "Hyderabad", type: "Full-time" },
      { location: "Remote", type: "Freelance" },
      { location: "Noida", type: "Internship" }
    ]
  },
  {
    title: "UX Designer",
    variants: [
      { location: "Mumbai", type: "Full-time" },
      { location: "Remote", type: "Part-time" },
      { location: "Kolkata", type: "Contract" }
    ]
  },
 

  {
    title: "DevOps Engineer",
    variants: [
      { location: "Pune", type: "Full-time" },
      { location: "Remote", type: "Contract" },
      { location: "Bangalore", type: "Internship" }
    ]
  },
  {
    title: "Product Manager",
    variants: [
      { location: "Delhi", type: "Full-time" },
      { location: "Remote", type: "Freelance" },
      { location: "Mumbai", type: "Part-time" }
    ]
  },
  {
    title: "Cybersecurity Analyst",
    variants: [
      { location: "Noida", type: "Internship" },
      { location: "Remote", type: "Full-time" },
      { location: "Hyderabad", type: "Contract" }
    ]
  },
  {
    title: "Mobile App Developer",
    variants: [
      { location: "Kolkata", type: "Full-time" },
      { location: "Remote", type: "Freelance" },
      { location: "Chennai", type: "Internship" }
    ]
  },
  {
    title: "Cloud Architect",
    variants: [
      { location: "Remote", type: "Full-time" },
      { location: "Bangalore", type: "Contract" },
      { location: "Delhi", type: "Part-time" }
    ]
  },
 
  {
    title: "Data Scientist",
    variants: [
      { location: "Remote", type: "Full-time" },
      { location: "Bangalore", type: "Internship" },
      { location: "Hyderabad", type: "Contract" }
    ]
  },
  {
    title: "Machine Learning Engineer",
    variants: [
      { location: "Chennai", type: "Full-time" },
      { location: "Remote", type: "Freelance" },
      { location: "Mumbai", type: "Internship" }
    ]
  },
  {
    title: "Computer Vision Developer",
    variants: [
      { location: "Delhi", type: "Full-time" },
      { location: "Remote", type: "Contract" },
      { location: "Pune", type: "Part-time" }
    ]
  },
  {
    title: "Software Developer (BCA Fresher)",
    variants: [
      { location: "Noida", type: "Internship" },
      { location: "Remote", type: "Full-time" },
      { location: "Chennai", type: "Part-time" }
    ]
  },
  {
    title: "Database Administrator",
    variants: [
      { location: "Hyderabad", type: "Full-time" },
      { location: "Remote", type: "Contract" },
      { location: "Mumbai", type: "Internship" }
    ]
  },
  {
    title: "Cloud Support Engineer",
    variants: [
      { location: "Remote", type: "Full-time" },
      { location: "Bangalore", type: "Internship" },
      { location: "Delhi", type: "Contract" }
    ]
  },
  {
    title: "AI Ethics Analyst",
    variants: [
      { location: "Remote", type: "Part-time" },
      { location: "Pune", type: "Full-time" },
      { location: "Chennai", type: "Freelance" }
    ]
  },
  {
    title: "Full Stack Developer (BCA Graduate)",
    variants: [
      { location: "Mumbai", type: "Internship" },
      { location: "Remote", type: "Full-time" },
      { location: "Hyderabad", type: "Contract" }
    ]
  }
];



function displayJobs(filteredJobs) {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  filteredJobs.forEach(job => {
    job.variants.forEach(variant => {
      const card = document.createElement("div");
      card.className = "job-card";
      card.innerHTML = `
        <h3>${job.title}</h3>
        <p>📍 ${variant.location}</p>
        <p>🕒 ${variant.type}</p>
      `;
      jobList.appendChild(card);
    });
  });
}

function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const location = document.getElementById("locationFilter").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;

  const filtered = jobs
    .filter(job => job.title.toLowerCase().includes(searchTerm))
    .map(job => {
      const matchedVariants = job.variants.filter(variant =>
        (location === "" || variant.location.toLowerCase().includes(location)) &&
        (type === "" || variant.type === type)
      );
      return { title: job.title, variants: matchedVariants };
    })
    .filter(job => job.variants.length > 0);

  displayJobs(filtered);
}

// Initial display
displayJobs(jobs);

// Enable live search
document.getElementById("searchInput").addEventListener("input", applyFilters);
