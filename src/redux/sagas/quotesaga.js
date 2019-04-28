import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* getQuote(action) {
    console.log('in getQuote');
    try{
        const response = yield axios.get('/quote');
        console.log('Response is', response);
        yield put({type:'SET_QUOTE', payload: response.data});
    }
    catch (error) {
        console.log('ERROR IN GET QUOTE', error);
        alert(`Sorry! Unable to get quote. Try again later.`)
    }
}


function* quoteSaga() {
  yield takeLatest('GET_QUOTE', getQuote)
}

export default quoteSaga;
