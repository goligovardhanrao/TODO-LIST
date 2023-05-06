// SELECT ELEMENTS
const form11 = document.getElementById('todoform1');
const todoInput1 = document.getElementById('newtodo1');
const todosListEl1 = document.getElementById('todos-list1');
const notificationEl1 = document.querySelector('.notification1');

// VARS
let todos11 = JSON.parse(localStorage.getItem('todos11')) || [];
let EditTodoId1 = -1;

// 1st render
renderTodos1();

// FORM SUBMIT
form11.addEventListener('submit', function (event) {
  event.preventDefault();

  saveTodo1();
  renderTodos1();
  localStorage.setItem('todos11', JSON.stringify(todos11));
});


// SAVE TODO
function saveTodo1() {
  const todoValue1 = todoInput1.value;

  // check if the todo is empty
  const isEmpty = todoValue1 === '';

  // check for duplicate todos
  const isDuplicate = todos11.some((todo1) => todo1.value.toUpperCase() === todoValue1.toUpperCase());

  if (isEmpty) {
    showNotification1("Schedule input is empty");
  } else if (isDuplicate) {
    showNotification1('Schedule already exists!');
  } else {
    if (EditTodoId1 >= 0) {
      todos11 = todos11.map((todo1, index) => ({
        ...todo1,
        value: index === EditTodoId1 ? todoValue1 : todo1.value,
      }));
      EditTodoId1 = -1;
    } else {
      todos11.push({
        value: todoValue1,
        checked: false,
        // color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        color: '#FFF'
      });
    }

    todoInput1.value = '';
  }
}
// RENDER TODOS
function renderTodos1() {
  if (todos11.length === 0) {
    todosListEl1.innerHTML = '<center>Nothing to do!</center>';
    return;
  }


   // CLEAR ELEMENT BEFORE A RE-RENDER
   todosListEl1.innerHTML = '';
  
   // RENDER TODOS
  todos11.forEach((todo1, index) => {
    todosListEl1.innerHTML += `
    <div class="todo1" id=${index}>
      <i 
        class="bi ${todo1.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        style="color : ${todo1.color}"
        data-action1="check1"
      ></i>
      <p class="${todo1.checked ? 'checked' : ''}" data-action1="check1">${todo1.value}</p>
      <i class="bi bi-pencil-square" data-action1="edit1"></i>
      <i class="bi bi-trash" data-action1="delete1"></i>
    </div>
    `;
  });
}


// CLICK EVENT LISTENER FOR ALL THE TODOS
todosListEl1.addEventListener('click', (event) => {
  const target1 = event.target;
  const parentElement1 = target1.parentNode;

  if (parentElement1.className !== 'todo1') return;

  // t o d o id
  const todo1 = parentElement1;
  const todoId1 = Number(todo1.id);

  // target action
  const action1 = target1.dataset.action1;

  action1 === 'check1' && checkTodo1(todoId1);
  action1 === 'edit1' && editTodo1(todoId1);
  action1 === 'delete1' && deleteTodo1(todoId1);

});

// CHECK A TODO
function checkTodo1(todoId1) {
  todos11 = todos11.map((todo1, index) => ({
    ...todo1,
    checked: index === todoId1 ? !todo1.checked : todo1.checked,
  }));

  renderTodos1();
  localStorage.setItem('todos11', JSON.stringify(todos11));
}

// EDIT A TODO
function editTodo1(todoId1) {
  todoInput1.value = todos11[todoId1].value;
  EditTodoId1 = todoId1;
}


// DELETE TODO
function deleteTodo1(todoId1) {
  todos11 = todos11.filter((todo1, index) => index !== todoId1);
  EditTodoId1 = -1;

  // re-render
  renderTodos1();
  localStorage.setItem('todos11', JSON.stringify(todos11));
}

// SHOW A NOTIFICATION
function showNotification1(msg1) {
  // change the message
  notificationEl1.innerHTML = msg1;

  // notification enter
  notificationEl1.classList.add('notif-enter1');

  // notification leave
  setTimeout(() => {
    notificationEl1.classList.remove('notif-enter1');
  }, 2000);
}
