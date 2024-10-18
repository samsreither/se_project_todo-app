import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {initialTodos, validationConfig} from "../utils/constants.js";
import Todo from "../components/Todo.js"
import FormValidator from '../components/Formvalidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(isCompleted) {
  if (isCompleted) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
}

const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todoElement = generateTodo(todoData);
    section.addItem(todoElement);
  }, 
  containerSelector: ".todos__list"
});
section.renderItems();

// handle the popup
const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formValues) => {

    // get name and date from formValues
    const {name, date: dateInput } = formValues;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id };

    const todoElement = generateTodo(values);
    section.addItem(todoElement);

    todoCounter.updateTotal(true);

    addTodoPopup.close();
    newTodoValidator.resetValidation();
  }
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();