const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 100;

let drawing = false;
let brushColor = "#000000";
let brushSize = 5;
let currentTool = "brush";

// Load saved canvas
function loadCanvas() {
  const data = localStorage.getItem("whiteboardData");
  if (data) {
    const img = new Image();
    img.src = data;
    img.onload = () => ctx.drawImage(img, 0, 0);
  }
}
loadCanvas();

// Save canvas every 2 seconds
setInterval(() => {
  localStorage.setItem("whiteboardData", canvas.toDataURL());
}, 2000);

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener("mouseout", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  if (currentTool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(0,0,0,1)";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = currentTool === "pencil" ? 1 : brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

document.getElementById("colorPicker").addEventListener("input", e => {
  brushColor = e.target.value;
});

document.getElementById("brushSize").addEventListener("input", e => {
  brushSize = e.target.value;
});

document.getElementById("toolSelector").addEventListener("change", e => {
  currentTool = e.target.value;
});

function clearBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  localStorage.removeItem("whiteboardData");
}

document.getElementById("imageUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    if (currentTool === "scale") {
      ctx.drawImage(img, 50, 50, img.width * 0.3, img.height * 0.3);
    } else if (currentTool === "align") {
      const x = (canvas.width - img.width * 0.5) / 2;
      const y = (canvas.height - img.height * 0.5) / 2;
      ctx.drawImage(img, x, y, img.width * 0.5, img.height * 0.5);
    } else {
      ctx.drawImage(img, 50, 50, img.width * 0.5, img.height * 0.5);
    }
  };
  img.src = URL.createObjectURL(file);
});

// Basic fill tool (experimental)
canvas.addEventListener("click", e => {
  if (currentTool !== "fill") return;
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  ctx.fillStyle = brushColor;
  ctx.fillRect(x - 5, y - 5, 10, 10); // basic fill simulation
});
