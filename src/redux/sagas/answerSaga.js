import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAnswerSaga(action) {
    console.log('in getAnswerSaga');
    // console.log(action.payload);
    try{
        const response = yield axios.get(`/answer/?class_id=${action.payload.class_id}&date=${action.payload.date}`, {
         
        });
        console.log('Response is', response);
        yield put({type:'SET_CLASSDATA', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET', error);
        alert(`Sorry! Unable to get answers data. Try again later.`)
    }
}

function* editScoreSaga(action){
    console.log('in editScoreSaga');
    // console.log('Edit Score is', action.payload.StudentScore);
    // console.log('Class data is', action.payload.ClassData);
    try{
        yield axios.put(`/answer/${action.payload.StudentScore.id}`, action.payload.StudentScore);
        yield put({type:'GET_ANSWERS', payload: action.payload.ClassData});
    }
    catch (error) {
        console.log('ERROR IN PUT ANSWER', error);
        alert(`Sorry! Unable to update student score. Try again later.`)
    }
}


function* deleteScoreSaga(action) {
    console.log('in deleteScoreSaga');
    console.log(action.payload.StudentId)
    try{
        yield axios.delete(`/student/${action.payload.StudentId}`);
        yield put({type:'GET_ANSWERS', payload: action.payload.ClassData});
    }
    catch (error) {
        console.log('ERROR IN DELETE STUDENT SCORE', error);
        alert(`Sorry! Unable to delete student score. Try again later.`)
    }
}

function* addStudentAnswer(action) {
    console.log('in addStudentAnswer')
    console.log('Student answer is', action.payload);
    try{
        yield axios.post('/answer/studentanswer', action.payload)
    }
    catch (error){
        console.log('ERROR IN ADD STUDENT ANSWER', error);
        alert(`Sorry! Was unable to submit answer! Try again later.`)
    }
}




function* answerSaga() {
  yield takeLatest ('GET_ANSWERS', getAnswerSaga);
  yield takeLatest ('EDIT_STUDENT_ANSWER', editScoreSaga);
  yield takeLatest ('DELETE_STUDENT_ANSWER', deleteScoreSaga);
  yield takeLatest('ADD_STUDENT_ANSWER', addStudentAnswer)
}

export default answerSaga;
