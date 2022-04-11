var todoList = {

  todos: [],

  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
      urgent: false                                ///how to display the urgent property
    });                                             //       build out
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.todos.completed = false;
    this.todos.urgent = false;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleUrgent: function(position) {
    var todo = this.todos[position];
    todo.urgent = !todo.urgent;
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    this.todos.forEach(function(todo) {   //    for (var i = 0; i < totalTodos; i++) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    var everyUl = document.querySelectorAll('ul');
    var middleUl = everyUl[1];
       
    if (addTodoTextInput.value === '') {
      middleUl.innerHTML = 'Type something to Add!'
    } else {
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    }      
  },
       
  deleteTodo: function(position) {
   //   var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
   //   todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    todoList.deleteTodo(position);
   //  deleteTodoPositionInput.value = '';
    view.displayTodos();
  },
  toggleUrgent: function(position) {
    todoList.toggleUrgent(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
   //    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
   //    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
   //    toggleCompletedPositionInput.value = '';
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  clearList: function() {
    var todosUl = document.querySelector('ul');
    var everyUl = document.querySelectorAll('ul');
    var middleUl = everyUl[1];
    var completedUl = everyUl[2];
    todosUl.innerHTML = 'List Cleared!';
    middleUl.innerHTML = '';
    completedUl.innerHTML = '';
    
    todoList.todos = [];
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    var everyUl = document.querySelectorAll('ul');
    var middleUl = everyUl[1];
    var completedUl = everyUl[2];
    todosUl.innerHTML = '';
    completedUl.innerHTML = '';
    middleUl.innerHTML = '';

    if(todoList.todos.length === 0) {
      middleUl.innerHTML = 'List is Empty!'
    } else {
      todoList.todos.forEach(function(todo, position){   
        var todoLi = document.createElement('li');         
        var todoTextWithCompletion = '';                  
        var todoTextUrgent = '';                           

        if (todo.completed === true) {
          todoTextWithCompletion = /*'(x) ' + */ todo.todoText + ' ';
          
        } else {
          todoTextWithCompletion = /* '(_) ' + */ todo.todoText + ' ';
        }
            
        if (todo.urgent === true) {
          todoTextUrgent = 'URGENT! ';
          //todoList.todos.length = Math.min( todoList.todos.length );
        } else {
          todoTextWithCompletion;
        }

        todoLi.id = position; 
        todoLi.textContent = todoTextUrgent + todoTextWithCompletion;
        
        todoLi.appendChild(this.createToggleButton());
        todoLi.appendChild(this.createChangeInput());
        todoLi.appendChild(this.createChangeButton());       
        todoLi.appendChild(this.createDeleteButton());
        todoLi.appendChild(this.createUrgentButton());
        middleUl.appendChild(todoLi);
        
        if(todo.completed === true) {
          //check urgent property
          if (todo.urgent === true) {
            todo.urgent = false;
          }
          middleUl.removeChild(todoLi);
          completedUl.appendChild(todoLi); 
        }
            
        if(todo.urgent === true) {
          middleUl.removeChild(todoLi);
          todosUl.appendChild(todoLi);  
        }
              
      }, this);
    }    
  },
  createDeleteButton: function() {
    // Create a button element
    var deleteButton = document.createElement('button');
    deleteButton.id="delete-button";
    // Add text to describe the button
    deleteButton.textContent = 'X';
    // Name it by class, it's not a unique id, so that each element may be pinned down
    deleteButton.className = 'deleteButton';
    //deleteButton.style = "background-color:brown;color:white;font-family:monospace;font-weight:bold;font-size:12px;";
    // Return the element deleteButton 
    return deleteButton;
  },
  createUrgentButton: function() {
    var everyUl = document.querySelectorAll('ul');
    var completedUl = everyUl[2];
    var urgentButton = document.createElement('button');
    urgentButton.textContent = '!';
    urgentButton.className = 'urgentButton';
    urgentButton.id = 'urgent';
    return urgentButton;
    // HIDE URGENT BUTTON IF IN COMPLETED UL
  //    if(completedUl.child.urgentButton === true) {
  //       function hideUrgentButton() {
  //    completedUl.forEach.call(document.querySelectorAll('urgentButton'), function (el) {
  //    el.style.visibility = 'hidden';
  //    });
  //      }
  //   hideUrgentButton();
  // }
  },
  // createToggleButton: function() {
  //   var toggleButton = document.createElement('button');
  //   toggleButton.id = 'toggle-button'
  //   toggleButton.textContent = 'Completed';
  //   toggleButton.className = 'toggleButton';
  //   toggleButton.style = "background-color:green;color:yellow;font-family:cursive;font-weight:bold;font-size:12px"
  //   return toggleButton;
  // },
  
    createToggleButton: function() {
    var toggleButton = document.createElement('input');
    toggleButton.id = 'toggle-button';
    toggleButton.className = 'toggleButton';
    toggleButton.type = 'checkbox';
    return toggleButton;
  },
  
  createChangeButton: function() { 
    var changeButton = document.createElement('button');
    changeButton.textContent = 'Change';
    changeButton.className = 'changeButton';
    changeButton.id = 'changeButton';
    changeButton.style = "background-color:powderblue;color:blue;font-famliy:helvetica;"
    return changeButton;
  },
  createChangeInput: function() {
    var changeInput = document.createElement("input"); 
    changeInput.setAttribute('type', 'text');
    changeInput.name = 'changeInput';
    changeInput.style = "background-color:powderblue;color:blue";
    changeInput.class = 'changeInput';
    changeInput.placeholder = 'change item text here';
    changeInput.placeholder.style = "color:yellow";
    changeInput.id = 'changeTodoTextInLi';
    //changeInput.textContent = '';
    return changeInput;
  },
  // removeButtons: function() {
  //   var todoLi = document.querySelectorAll('li');
  //   if(todoLi.parent.class === 'completed') {
  //     todoLi.removeChild(this.createUrgentButton);
  //   }
  // },
  setUpEventListeners: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    //var todosUl = document.querySelector('ul');
    var everyUl = document.querySelectorAll('ul');
    var todosUl = everyUl[0];
    var middleUl = everyUl[1];
    var completedUl = everyUl[2];
    var todoLi = document.querySelector('li');
    //var liText = $("li").children("changeInput").textContent;
    
    addTodoTextInput.addEventListener('keydown', function(event) {
               
      if (event.keyCode === 13) {
        if (addTodoTextInput.value === '') {
          console.log('enter pressed')        
          middleUl.innerHTML = 'Type something to Add!';
      //   view.displayTodos();
        } else {
          todoList.addTodo(addTodoTextInput.value);
          addTodoTextInput.value = '';
          view.displayTodos();
          //view.setupEventListeners();
          console.log('Enter Pressed');
        }
      }
    });   
  
    todosUl.addEventListener('click', function(event) {
      //Get element that was clicked on...
      var elementClicked = event.target;
      var elementClickedId = parseInt(event.target.parentNode.id);
      
      // Access the text input element that changes todos     
      //   var changeTodoTextInput = document.getElementById('changeTodoTextInput');
      // Now access the input that is nested within the li element

      // var changeInput = document.querySelectorAll("input");
      // var changeInputName = document.getElementsByName('change');
      // var todos = todoList.todos;
      //DELETE      
      // Check if elementClicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
          // THEN run handlers.deleteTodo(position)
        handlers.deleteTodo(elementClickedId);
      }
      //TOGGLE
      if (elementClicked.className === 'toggleButton') {
        handlers.toggleCompleted(elementClickedId);
      }
      //URGENT      
      if (elementClicked.className === 'urgentButton') {
        handlers.toggleUrgent(elementClickedId);
        // todosUl.removeChild(todoLi);
        // urgentUl.appendChild(todoLi);
      }
      //CHANGE             
      if (elementClicked.className === 'changeInput') {
        var changeTextInput = document.querySelectorAll("input#changeTodoTextInLi"); 

        for (var i = 0; i < changeTextInput.length; i++) {
          // var inputLocation = changeTextInput[i];
          var inputText = changeTextInput[i].value;
          changeTextInput.id = i;
          
          changeTextInput.addEventListener('keydown', function(event) {
            var elementClickedId = parseInt(event.target.parentNode.id);

            if (event.keyCode === 13) {
              console.log('enter in change input')

              if (addTodoTextInput.value === '') {
              console.log('enter pressed')        
                middleUl.innerHTML = 'Type something to Change!';
              //   view.displayTodos();
              } else {
                todoList.changeTodo(elementClickedId, inputText);
                addTodoTextInput.value = '';
                view.displayTodos();
                console.log('Enter Pressed');
              }
            }
          });
        }
      }     
    });
    
    middleUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      var elementClickedId = parseInt(event.target.parentNode.id);
      var changeTodoTextInLi = document.getElementById('changeTodoTextInLi');
      //      var todos = todoList.todos;
      //DELETE      
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(elementClickedId);
      }
      //TOGGLE
      if (elementClicked.className === 'toggleButton') {
        handlers.toggleCompleted(elementClickedId);
      }
      //URGENT      
      if (elementClicked.className === 'urgentButton') {
        handlers.toggleUrgent(elementClickedId);
      }
      //CHANGE           
      if (elementClicked.className === 'changeButton') {    
        var elementClickedText = event.target.parentNode.innerText;
        var changeTextInput = document.querySelectorAll("input#changeTodoTextInLi");  

        for (var i = 0; i < changeTextInput.length; i++) {
          var inputText = changeTextInput[i].value;
          changeTextInput.id = i;
          
          if (inputText === '') {
            elementClickedText = elementClickedText;            
          } else {
            todoList.changeTodo(elementClickedId, inputText);
            inputText.value = '';
            view.displayTodos();       
          }     
        }    
      } 
    }); 
    
    
    completedUl.addEventListener('click', function(event) {
      var elementClicked = event.target;
      var elementClickedId = parseInt(event.target.parentNode.id);
        //      var changeTodoTextInLi = document.getElementById('changeTodoTextInLi');
        //      var todos = todoList.todos;
        //       if (elementClicked.parentNode.class === 'urgentButton') {
                
        //       }

          //DELETE      
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(elementClickedId);
      }
        //TOGGLE
      if (elementClicked.className === 'toggleButton') {
        handlers.toggleCompleted(elementClickedId);
      }
        //URGENT      
        //      if (elementClicked.className === 'urgentButton') {
        //        handlers.toggleUrgent(elementClickedId);
        //      }
        //CHANGE      
      if (elementClicked.className === 'changeButton') {    
        var elementClickedText = event.target.parentNode.innerText;
        var changeTextInput = document.querySelectorAll("input#changeTodoTextInLi");  
        for (var i = 0; i < changeTextInput.length; i++) {
        var inputText = changeTextInput[i].value;
        changeTextInput.id = i;
        
        if (inputText === '') {
        elementClickedText = elementClickedText;
          
          } else {
            todoList.changeTodo(elementClickedId, inputText);
            inputText.value = '';
            view.displayTodos();       
          }     
        }    
      } 
    }); 
  } 
};

view.setUpEventListeners();


// function removeButtons() {
//   var todoLi = document.querySelectorAll('li');
//   if(todoLi.parentNode.class === 'completed') {
//     todoLi.removeChild(this.createUrgentButton);
//   }
// }

    
// todoLi.removeChildChild(this.createChangeInput());
// todoLi.removeChild(this.createChangeButton());       
// todoLi.removeChild(this.createUrgentButton());
// completedUl.appendChild(todoLi);
    

    
    
//     var elementClickedText = event.target.parentNode.innerText;
//        var changeTextInput = document.querySelectorAll("input#changeTodoTextInLi");  
//       for (var i = 0; i < changeTextInput.length; i++) {
//        var inputText = changeTextInput[i].value;
//        changeTextInput.id = i;
    
//        changeTextInput.addEventListener('keydown', function(event) {
//         var elementClickedId = parseInt(event.target.parentNode.id);
//       if (event.keyCode === 13) {
//         if (addTodoTextInput.value === '') {
//        //   console.log('enter pressed')        
//           middleUl.innerHTML = 'Type something to Change!';
//        //   view.displayTodos();
//          } else {
//           todoList.changeTodo(elementClickedId, inputText);
//           addTodoTextInput.value = '';
//           view.displayTodos();
//           console.log('Enter Pressed');
//         }
//       }
//     });
    
    
    





