const todoList = document.getElementById('todo-list')
const saveList = () => localStorage.setItem('todos', JSON.stringify(todoObj)) // Save the list to local storage
const todoItems = localStorage.getItem('todos') // Get the list from local storage

let todoObj = {} // Empty object to store the todo items

// Function to add todo task to list
const addToList = (todoText, check) => {
  let newItem = document.createElement('li')
  newItem.setAttribute('class', 'todo-item')
  newItem.setAttribute('id', todoText)

  // If fetching from local storage, check to see if they should be crossed off.
  check ? newItem.getAttribute('class') : newItem.setAttribute('class', 'done') 

  let checkBox = document.createElement('input')
  checkBox.setAttribute('type', 'checkbox')
  checkBox.setAttribute('class', 'switch')

  // If fetching from local storage, check if checkbox is checked.
  check ? checkBox.checked = false : checkBox.checked = true

  let deleteButton = document.createElement('button')
  deleteButton.setAttribute('class', 'delete-button')
  deleteButton.innerText='Remove'

  newItem.innerText=todoText
  todoList.prepend(newItem)
  document.querySelector('li').append(checkBox)
  document.querySelector('li').append(deleteButton)

  // Store information in object for local storage.
  todoObj[todoText] = check 
  
  saveList()
}

// Run this first, if local storage, add content to list.
if (localStorage.getItem('todos')) {
  let todos = JSON.parse(todoItems)
  for (const task in todos) {
    addToList(task, todos[task])
  }
}

// When new item is added and submitted to the list
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  addToList(document.getElementById('todo-form').elements[0].value, true)
  document.getElementById('todo-form').reset()
})

// To handle clicks to remove and/or check if task is completed.
document.getElementById('todo-list').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentNode.remove()
    delete todoObj[e.target.parentNode.getAttribute('id')] // Delete the list item above the button.
    saveList()
  }

  if (e.target.tagName === 'INPUT' && e.target.classList.contains('switch')) {
    const listElement = e.target.parentNode
    // If checkbox is checked/unchecked, add or remove line-through
    e.target.checked ? listElement.style('done') : listElement.remove('done')
    
    // Update todoObj with checkbox bool for local storage. 
    todoObj[e.target.parentNode.getAttribute('id')] = !todoObj[e.target.parentNode.getAttribute('id')] 
    saveList()
  }
})