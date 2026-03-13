
let inputElement = document.getElementById("inputValue");

let AddBtn = document.querySelector(".btn");

let listElement = document.querySelector(".todo-lists-ele");



const getTodoList = () => {
    return JSON.parse(localStorage.getItem("tododata"));
}

const addTodoListLocalStorage = (todoListData) =>{
    return localStorage.setItem("tododata", JSON.stringify(todoListData));
}

let todoListData = getTodoList() || [];

const addtodoDynamicElement = (currEle) => {
     // fetch the value from localStorage

   // create div element
   const divElement = document.createElement("div");

   // create new class into div element
   divElement.classList.add("main_todo_div");
   
   // dynamically add on list items and button
   divElement.innerHTML = `<li>${currEle}</li> <button class ="deleteBtn">Delete</button>`;

   listElement.append(divElement);
}

const addTodoList = (e) => {
     e.preventDefault();

     // add data into local storage

     const todoListItem = inputElement.value.trim();

     inputElement.value = ""; // input text are empty after add on 

     if(todoListItem !== "" && !todoListData.includes(todoListItem)){

     todoListData.push(todoListItem);

     todoListData = [...new Set(todoListData)];

     localStorage.setItem("tododata", JSON.stringify(todoListData));

     // input value

     addtodoDynamicElement(todoListItem);
     }  

};

 const showTodoListData = () => {
    todoListData.forEach((currEle) => {
        addtodoDynamicElement(currEle);
    })
 }

 showTodoListData();

const removeElementFromTodo = (e) => {
    e.preventDefault();
    
    const todoToRemove = e.target;

    let todoListContent = todoToRemove.previousElementSibling.innerText;

    const parentEle = todoToRemove.parentElement;

    todoListData = todoListData.filter((curr) => {
        return curr !== todoListContent.toLowerCase();
    })

    // data add into localStorage after deleting

    addTodoListLocalStorage(todoListData);

    parentEle.remove();
 
    
}

 listElement.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.target.classList.contains("deleteBtn"));
    
    if(e.target.classList.contains("deleteBtn"))  {
        removeElementFromTodo(e);
    }
    
 })

AddBtn.addEventListener("click", (e) => {
    addTodoList(e);
    
});