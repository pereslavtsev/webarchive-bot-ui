import { all } from 'redux-saga/effects';
import { tasksSaga } from '../features/tasks/tasksSagas';

export default function* rootSaga() {
  yield all([tasksSaga()]);
}
