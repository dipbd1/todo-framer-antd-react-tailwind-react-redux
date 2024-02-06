import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  title: string;
  content: string;
  completed?: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState = (): TodoState => {
  const storedTodos = localStorage.getItem('todos');
  return {
    todos: storedTodos ? JSON.parse(storedTodos) : [],
  };
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo: Todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo: Todo) => todo.id !== action.payload);
    },
    setAllTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    }
  },
});

export const { addTodo, toggleTodo, deleteTodo, setAllTodos } = todoSlice.actions;

export default todoSlice.reducer;