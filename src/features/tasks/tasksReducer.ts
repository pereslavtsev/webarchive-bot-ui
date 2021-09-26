import { CounterState } from '../counter/counterSlice';
import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { fetchTasks } from './tasksRoutines';
import { RootState } from '../../app/store';

export interface TasksState {
  data: any[] | null;
  loading: boolean;
}

const initialState: TasksState = {
  data: null,
  loading: false,
};

export const taskAdded = createAction('TASK_ADDED');
export const taskUpdated = createAction('TASK_UPDATED');

const tasksReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(taskAdded, (state, action) => {
      if (!state.data) {
        state.data = [action.payload];
        return;
      }
      state.data.push(action.payload);
    })
    .addCase(taskUpdated, (state, action) => {
      if (!state.data) {
        state.data = [action.payload];
        return;
      }
      // @ts-ignore
      const i = state.data.findIndex((task) => task.id === action.payload.id);
      state.data[i] = action.payload;
    })
    .addCase(fetchTasks.REQUEST, (state, action) => {
      state.loading = true;
    })
    .addCase(
      fetchTasks.SUCCESS,
      (state, action: ReturnType<typeof fetchTasks.success>) => {
        // @ts-ignore
        state.data = action.payload.tasks.edges.map(({ node }) => node);
      }
    )
    .addCase(fetchTasks.FULFILL, (state, action) => {
      state.loading = false;
    })
);

export const selectTasks = (state: RootState) => state.tasks.data;

export default tasksReducer;
