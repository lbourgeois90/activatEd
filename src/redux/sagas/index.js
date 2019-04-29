import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import profileSaga from './profileSaga'
import teacherSaga from './teacherSaga';
import classSaga from './classSaga';
import studentSaga from './studentSaga';
import activatorSaga from './activatorSaga';
import answerSaga from './answerSaga';
import studentClassSaga from './studentClassSaga';
import quoteSaga from './quotesaga';
import randomQuestionSaga from './randomQuestionSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    profileSaga(),
    teacherSaga(),
    classSaga(),
    studentSaga(),
    activatorSaga(),
    answerSaga(),
    studentClassSaga(),
    quoteSaga(),
    randomQuestionSaga(),
  ]);
}
