import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
        const newTodo = {
          id: nanoid(),
          task: action.payload,
          isdone: false,
        };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    markAsDone: (state, action) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === action.payload) {
      return { ...todo, isdone: true };
    }
    return todo;
  });
},
    editTodo: (state, action) => {
      const { id, newTask } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.task = newTask;
      }
    },
  },
});
export const { addTodo, deleteTodo, markAsDone, editTodo } = todoSlice.actions;
export default todoSlice.reducer;