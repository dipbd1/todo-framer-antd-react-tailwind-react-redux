import Todo from "../interfaces/todo.interface";


export const saveToLocalStorage = (todos: Todo[])=>{
  localStorage.setItem('todos', JSON.stringify(todos));
}