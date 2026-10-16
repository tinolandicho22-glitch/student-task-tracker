
const STORAGE_KEY = "studytrack-tasks-v1";

const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const dateInput = document.querySelector("#task-date");
const taskList = document.querySelector("#task-list");
const taskFilter = document.querySelector("#task-filter");
const emptyMessage = document.querySelector("#empty-message");
const formMessage = document.querySelector("#form-message");

let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(task =>
      task &&
      typeof task.id === "string" &&
      typeof task.title === "string" &&
      typeof task.dueDate === "string" &&
      typeof task.completed === "boolean"
    );
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    document.querySelector("#save-status").textContent =
      "Tasks saved in this browser.";
  } catch {
    document.querySelector("#save-status").textContent =
      "Unable to save tasks. Check your browser storage settings.";
  }
}

function updateStats() {
  const completed = tasks.filter(task => task.completed).length;
  document.querySelector("#total-count").textContent = tasks.length;
  document.querySelector("#completed-count").textContent = completed;
  document.querySelector("#pending-count").textContent =
    tasks.length - completed;
}

function renderTasks() {
  taskList.replaceChildren();

  const filter = taskFilter.value;
  const visibleTasks = tasks.filter(task => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  emptyMessage.hidden = visibleTasks.length > 0;
  emptyMessage.textContent = tasks.length === 0
    ? "No tasks yet. Add your first assignment above!"
    : "No tasks match this filter.";

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    item.className = "task-item";
    if (task.completed) item.classList.add("is-complete");

    const details = document.createElement("div");
    details.className = "task-details";

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const dueDate = document.createElement("span");
    dueDate.className = "task-meta";
    dueDate.textContent = `Due: ${task.dueDate}`;

    details.append(title, dueDate);

    const toggleButton = document.createElement("button");
    toggleButton.className = "complete-button";
    toggleButton.type = "button";
    toggleButton.textContent = task.completed ? "Undo" : "Complete";
    toggleButton.setAttribute(
      "aria-label",
      `${task.completed ? "Mark pending" : "Complete"}: ${task.title}`
    );
    toggleButton.addEventListener("click", () => {
      tasks = tasks.map(current =>
        current.id === task.id
          ? { ...current, completed: !current.completed }
          : current
      );
      saveTasks();
      render();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete: ${task.title}`);
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter(current => current.id !== task.id);
      saveTasks();
      render();
    });

    item.append(details, toggleButton, deleteButton);
    taskList.append(item);
  }

  updateStats();
}

function render() {
  renderTasks();
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const dueDate = dateInput.value;

  if (!title || !dueDate) {
    formMessage.textContent = "Please enter a task name and due date.";
    return;
  }

  tasks.push({
    id: crypto.randomUUID(),
    title,
    dueDate,
    completed: false
  });

  saveTasks();
  render();

  form.reset();
  formMessage.textContent = "Task added successfully!";
  titleInput.focus();
});

taskFilter.addEventListener("change", renderTasks);

render();
