// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector('.new-task__input');
var addButton = document.querySelector('.add-btn');
var incompleteTaskHolder = document.querySelector('.incompleted-tasks');
var completedTasksHolder = document.querySelector('.completed-tasks');

//Create new task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');

  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');
  var deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.classList.add('task', 'li__label');

  checkBox.type = 'checkbox';
  checkBox.classList.add('checkbox');

  editInput.type = 'text';
  editInput.classList.add('task', 'input_text', 'li__input_text');

  editButton.innerText = 'Edit'; // innerText encodes special characters, HTML does not.
  editButton.classList.add('edit-btn');

  deleteButton.classList.add('delete-btn');

  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.classList.add('delete-btn__img');
  deleteButtonImg.alt = 'Delete button';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Add new task
var addTask = function () {
  console.log('Add Task...');

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

// Edit an existing task.
var editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  console.log(editInput);
  var label = listItem.querySelector('label');
  console.log(label);
  var editBtn = listItem.querySelector('.edit-btn');
  var containsClass = listItem.classList.contains('edit-mode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

// Delete task.
var deleteTask = function () {
  console.log('Delete Task...');

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

// Mark task completed
var taskCompleted = function () {
  console.log('Complete Task...');

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete Task...');
  // Mark task as incomplete when the checkbox is unchecked
  // Append the task list item to the incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log('AJAX Request');
};

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');

  var checkBox = taskListItem.querySelector('.checkbox');
  var editButton = taskListItem.querySelector('.edit-btn');
  var deleteButton = taskListItem.querySelector('.delete-btn');

  // Bind editTask to edit button.
  editButton.onclick = editTask;
  // Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
