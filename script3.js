// SELECT ELEMENTS
const form33 = document.getElementById('todoform3');
const todoInput3 = document.getElementById('newtodo3');
const todosListEl3 = document.getElementById('todos-list3');
const notificationEl3 = document.querySelector('.notification3');

// VARS
let todos33 = JSON.parse(localStorage.getItem('todos33')) || [];
let EditTodoId3 = -1;

// 1st render
renderTodos3();

// FORM SUBMIT
form33.addEventListener('submit', function (event) {
  event.preventDefault();

  saveTodo3();
  renderTodos3();
  localStorage.setItem('todos33', JSON.stringify(todos33));
});


// SAVE TODO
function saveTodo3() {
  const todoValue3 = todoInput3.value;

  // check if the todo is empty
  const isEmpty = todoValue3 === '';

  // check for duplicate todos
  const isDuplicate = todos33.some((todo3) => todo3.value.toUpperCase() === todoValue3.toUpperCase());

  if (isEmpty) {
    showNotification3("Don't Do input is empty");
  } else if (isDuplicate) {
    showNotification3("Don't Do already exists!");
  } else {
    if (EditTodoId3 >= 0) {
      todos33 = todos33.map((todo3, index) => ({
        ...todo3,
        value: index === EditTodoId3 ? todoValue3 : todo3.value,
      }));
      EditTodoId3 = -1;
    } else {
      todos33.push({
        value: todoValue3,
        checked: false,
        // color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        color: '#FFF'
      });
    }

    todoInput3.value = '';
  }
}
// RENDER TODOS
function renderTodos3() {
  if (todos33.length === 0) {
    todosListEl3.innerHTML = '<center>Nothing to do!</center>';
    return;
  }


   // CLEAR ELEMENT BEFORE A RE-RENDER
   todosListEl3.innerHTML = '';
  
   // RENDER TODOS
  todos33.forEach((todo3, index) => {
    todosListEl3.innerHTML += `
    <div class="todo3" id=${index}>
      <i 
        class="bi ${todo3.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        style="color : ${todo3.color}"
        data-action3="check3"
      ></i>
      <p class="${todo3.checked ? 'checked' : ''}" data-action3="check3">${todo3.value}</p>
      <i class="bi bi-pencil-square" data-action3="edit3"></i>
      <i class="bi bi-trash" data-action3="delete3"></i>
    </div>
    `;
  });
}


// CLICK EVENT LISTENER FOR ALL THE TODOS
todosListEl3.addEventListener('click', (event) => {
  const target3 = event.target;
  const parentElement3 = target3.parentNode;

  if (parentElement3.className !== 'todo3') return;

  // t o d o id
  const todo3 = parentElement3;
  const todoId3 = Number(todo3.id);

  // target action
  const action3 = target3.dataset.action3;

  action3 === 'check3' && checktodo3(todoId3);
  action3 === 'edit3' && edittodo3(todoId3);
  action3 === 'delete3' && deletetodo3(todoId3);

});

// CHECK A TODO
function checktodo3(todoId3) {
  todos33 = todos33.map((todo3, index) => ({
    ...todo3,
    checked: index === todoId3 ? !todo3.checked : todo3.checked,
  }));

  renderTodos3();
  localStorage.setItem('todos33', JSON.stringify(todos33));
}

// EDIT A TODO
function edittodo3(todoId3) {
  todoInput3.value = todos33[todoId3].value;
  EditTodoId3 = todoId3;
}


// DELETE TODO
function deletetodo3(todoId3) {
  todos33 = todos33.filter((todo3, index) => index !== todoId3);
  EditTodoId3 = -1;

  // re-render
  renderTodos3();
  localStorage.setItem('todos33', JSON.stringify(todos33));
}

// SHOW A NOTIFICATION
function showNotification3(msg3) {
  // change the message
  notificationEl3.innerHTML = msg3;

  // notification enter
  notificationEl3.classList.add('notif-enter3');

  // notification leave
  setTimeout(() => {
    notificationEl3.classList.remove('notif-enter3');
  }, 2000);
}
