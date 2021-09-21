import { CounterState } from '../counter/counterSlice';
import { createReducer, createSlice } from '@reduxjs/toolkit';
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

const tasksReducer = createReducer(initialState, (builder) =>
  builder
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
