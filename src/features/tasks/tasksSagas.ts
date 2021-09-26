import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchTasks } from './tasksRoutines';
import client from '../../app/client';
import { gql } from '@apollo/client';

export function* tasksSaga() {
  yield takeEvery(fetchTasks.TRIGGER, handleFetchTasks);
}

function* handleFetchTasks() {
  try {
    yield put(fetchTasks.request());
    const response = yield call(client.query, {
      query: gql`
        query getTasks {
          tasks {
            pageInfo {
              startCursor
              endCursor
            }
            edges {
              cursor
              node {
                id
                pageId
                pageTitle
                status
                createdAt
                updatedAt
              }
            }
          }
        }
      `,
    });
    yield put(fetchTasks.success(response.data));
  } catch (error) {
    yield put(fetchTasks.failure(error.message));
  } finally {
    yield put(fetchTasks.fulfill());
  }
}
