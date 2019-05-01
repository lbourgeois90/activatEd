import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addActivatorSaga(action) {
    console.log('in addActivatorSaga');
    console.log(action.payload);
    try{
        yield axios.post('/activator', action.payload);
    }
    catch (error) {
        console.log('ERROR IN POST ACTIVATOR', error);
        alert(`Sorry! Unable to add activator. Try again later.`)
    }
}


function* getActivatorSaga(action) {
    console.log('in getActivatorSaga');
    console.log('IN GETACTIVATORSAGA',action.payload);
    try{
        const response = yield axios.get(`/activator?class_id=${action.payload.id}`);
        console.log('Response is', response.data);
        if(response.data.question_type === 'Multiple_Choice_Question'){
            console.log('in if statement')
            yield put ({type: 'GET_MULTIPLE_CHOICE', payload: response.data.question_id})
        }
        yield put({type:'SET_ACTIVATOR', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN getActivatorSaga', error);
        alert(`Sorry! Unable to get activator. Try again later.`)
    }
}

function* getMultipleChoiceSaga(action){
    console.log('in getMultipleChoiceSaga');
    console.log('IN getMultipleChoiceSaga',action.payload);
    try{
        const response =  yield axios.get(`/activator/mc?question_id=${action.payload}`);
        yield put ({type: 'SET_MULTIPLE_CHOICE', payload: response.data})
    }
    catch (error) {
        console.log('ERROR IN getMultipleChoiceSaga', error);
        alert(`Sorry! Unable to get multiple choice answers. Try again later.`)
    }
}




function* activatorSaga() {
  yield takeLatest ('ADD_ACTIVATOR', addActivatorSaga);
  yield takeLatest ('GET_STUDENT_ACTIVATOR', getActivatorSaga);
  yield takeLatest ('GET_MULTIPLE_CHOICE', getMultipleChoiceSaga);
}

export default activatorSaga;
