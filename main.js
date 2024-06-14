// Clock functionality
function updateClock() {
  const clockElement = document.getElementById('clock');
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  clockElement.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();  // Initial call to display clock immediately

// Todo list functionality
const addTodoButton = document.getElementById('add-todo-button');
const todoInput = document.getElementById('todo-input');
const todoDeadline = document.getElementById('todo-deadline');
const todoList = document.getElementById('todo-list');

addTodoButton.addEventListener('click', addTodo);

function addTodo() {
  const todoText = todoInput.value.trim();
  const deadline = todoDeadline.value;
  if (todoText === '' || deadline === '') return;

  const li = document.createElement('li');
  const prioritySpan = document.createElement('span');
  prioritySpan.className = 'priority';
  li.appendChild(prioritySpan);
  
  const todoTextNode = document.createTextNode(`${todoText} (Due: ${deadline})`);
  li.appendChild(todoTextNode);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    todoList.removeChild(li);
    updatePriorities();
  });

  li.appendChild(deleteButton);

  // Store the deadline as a data attribute
  li.setAttribute('data-deadline', deadline);
  todoList.appendChild(li);

  updatePriorities();

  todoInput.value = '';
  todoDeadline.value = '';
}

function updatePriorities() {
  const items = Array.from(todoList.children);

  items.sort((a, b) => {
    const deadlineA = new Date(a.getAttribute('data-deadline'));
    const deadlineB = new Date(b.getAttribute('data-deadline'));

    return deadlineA - deadlineB;
  });

  items.forEach((item, index) => {
    item.querySelector('.priority').textContent = `Priority: ${index + 1}`;
    todoList.appendChild(item);
  });
}

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});
