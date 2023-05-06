// SELECT ELEMENTS
const form22 = document.getElementById('todoform2');
const todoInput2 = document.getElementById('newtodo2');
const todosListEl2 = document.getElementById('todos-list2');
const notificationEl2 = document.querySelector('.notification2');

// VARS
let todos22 = JSON.parse(localStorage.getItem('todos22')) || [];
let EditTodoId2 = -1;

// 1st render
renderTodos2();

// FORM SUBMIT
form22.addEventListener('submit', function (event) {
  event.preventDefault();

  saveTodo2();
  renderTodos2();
  localStorage.setItem('todos22', JSON.stringify(todos22));
});


// SAVE TODO
function saveTodo2() {
  const todoValue2 = todoInput2.value;

  // check if the todo is empty
  const isEmpty = todoValue2 === '';

  // check for duplicate todos
  const isDuplicate = todos22.some((todo2) => todo2.value.toUpperCase() === todoValue2.toUpperCase());

  if (isEmpty) {
    shownotification2("Delegate input is empty");
  } else if (isDuplicate) {
    shownotification2('Delegate already exists!');
  } else {
    if (EditTodoId2 >= 0) {
      todos22 = todos22.map((todo2, index) => ({
        ...todo2,
        value: index === EditTodoId2 ? todoValue2 : todo2.value,
      }));
      EditTodoId2 = -1;
    } else {
      todos22.push({
        value: todoValue2,
        checked: false,
        // color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        color: '#FFF'
      });
    }

    todoInput2.value = '';
  }
}
// RENDER TODOS
function renderTodos2() {
  if (todos22.length === 0) {
    todosListEl2.innerHTML = '<center>Nothing to do!</center>';
    return;
  }


   // CLEAR ELEMENT BEFORE A RE-RENDER
   todosListEl2.innerHTML = '';
  
   // RENDER TODOS
  todos22.forEach((todo2, index) => {
    todosListEl2.innerHTML += `
    <div class="todo2" id=${index}>
      <i 
        class="bi ${todo2.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        style="color : ${todo2.color}"
        data-action2="check2"
      ></i>
      <p class="${todo2.checked ? 'checked' : ''}" data-action2="check2">${todo2.value}</p>
      <i class="bi bi-pencil-square" data-action2="edit2"></i>
      <i class="bi bi-trash" data-action2="delete2"></i>
    </div>
    `;
  });
}


// CLICK EVENT LISTENER FOR ALL THE TODOS
todosListEl2.addEventListener('click', (event) => {
  const target2 = event.target;
  const parentElement2 = target2.parentNode;

  if (parentElement2.className !== 'todo2') return;

  // t o d o id
  const todo2 = parentElement2;
  const todoId2 = Number(todo2.id);

  // target action
  const action2 = target2.dataset.action2;

  action2 === 'check2' && checktodo2(todoId2);
  action2 === 'edit2' && edittodo2(todoId2);
  action2 === 'delete2' && deletetodo2(todoId2);

});

// CHECK A TODO
function checktodo2(todoId2) {
  todos22 = todos22.map((todo2, index) => ({
    ...todo2,
    checked: index === todoId2 ? !todo2.checked : todo2.checked,
  }));

  renderTodos2();
  localStorage.setItem('todos22', JSON.stringify(todos22));
}

// EDIT A TODO
function edittodo2(todoId2) {
  todoInput2.value = todos22[todoId2].value;
  EditTodoId2 = todoId2;
}


// DELETE TODO
function deletetodo2(todoId2) {
  todos22 = todos22.filter((todo2, index) => index !== todoId2);
  EditTodoId2 = -1;

  // re-render
  renderTodos2();
  localStorage.setItem('todos22', JSON.stringify(todos22));
}

// SHOW A NOTIFICATION
function shownotification2(msg2) {
  // change the message
  notificationEl2.innerHTML = msg2;

  // notification enter
  notificationEl2.classList.add('notif-enter2');

  // notification leave
  setTimeout(() => {
    notificationEl2.classList.remove('notif-enter2');
  }, 2000);
}
