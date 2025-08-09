function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editTask(taskSpan);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(taskSpan);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}

function editTask(span) {
  const currentText = span.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;

  const parent = span.parentElement;
  parent.insertBefore(input, span);
  parent.removeChild(span);

  input.addEventListener("blur", () => {
    const updatedText = input.value.trim();
    const newSpan = document.createElement("span");
    newSpan.textContent = updatedText || currentText;

    parent.insertBefore(newSpan, input);
    parent.removeChild(input);
  });

  input.focus();
}
