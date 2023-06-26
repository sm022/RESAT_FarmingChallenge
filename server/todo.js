const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const todosList = document.getElementById('todos-list');
const allTodosButton = document.getElementById('all-todos-button');
const completedTodosButton = document.getElementById('completed-todos-button');
const uncompletedTodosButton = document.getElementById('uncompleted-todos-button');

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const priority = prioritySelect.value;
    const todoItem = createTodoItem(todoText, priority);
    todosList.appendChild(todoItem);
    todoInput.value = '';
  }
});

function createTodoItem(text, priority) {
  const li = document.createElement('li');
  li.classList.add('todo-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');

  const span = document.createElement('span');
  span.textContent = text;

  const prioritySpan = document.createElement('span');
  prioritySpan.textContent = getPriorityLabel(priority);
  prioritySpan.classList.add('priority', getPriorityClass(priority));

  const editButton = document.createElement('button');
  editButton.textContent = '수정';
  editButton.classList.add('edit-button');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '삭제';
  deleteButton.classList.add('delete-button');

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(prioritySpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  checkbox.addEventListener('change', function() {
    handleTodoCheckbox(li);
  });

  editButton.addEventListener('click', function() {
    handleTodoEdit(li);
  });

  deleteButton.addEventListener('click', function() {
    handleTodoDelete(li);
  });

  return li;
}

function getPriorityLabel(priority) {
  switch (priority) {
    case 'low':
      return '낮음';
    case 'normal':
      return '보통';
    case 'high':
      return '높음';
    case 'very-high':
      return '아주 높음';
    default:
      return '';
  }
}

function getPriorityClass(priority) {
  switch (priority) {
    case 'low':
      return 'priority-low';
    case 'normal':
      return 'priority-normal';
    case 'high':
      return 'priority-high';
    case 'very-high':
      return 'priority-very-high';
    default:
      return '';
  }
}

function handleTodoCheckbox(item) {
  if (item.querySelector('.checkbox').checked) {
    item.classList.add('completed');
  } else {
    item.classList.remove('completed');
  }
}

function handleTodoEdit(item) {
  const span = item.querySelector('span');
  const newText = prompt('수정할 내용을 입력하세요:', span.textContent.trim());

  if (newText !== null && newText.trim() !== '') {
    span.textContent = newText.trim();
  }
}

function handleTodoDelete(item) {
  if (confirm('정말로 삭제하시겠습니까?')) {
    item.remove();
  }
}

allTodosButton.addEventListener('click', function() {
  filterTodos('all');
});

completedTodosButton.addEventListener('click', function() {
  filterTodos('completed');
});

uncompletedTodosButton.addEventListener('click', function() {
  filterTodos('uncompleted');
});

function filterTodos(filter) {
  const todoItems = todosList.querySelectorAll('.todo-item');

  todoItems.forEach(function(item) {
    switch (filter) {
      case 'all':
        item.classList.remove('hidden');
        break;
      case 'completed':
        if (item.querySelector('.checkbox').checked) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
        break;
      case 'uncompleted':
        if (!item.querySelector('.checkbox').checked) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
        break;
    }
  });
}
