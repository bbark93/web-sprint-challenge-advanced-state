// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux";
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, INPUT_CHANGE, RESET_FORM } from './action-types'


const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:{
      const nextIndex = state + 1
      return nextIndex > 5 ? 0 : nextIndex;}
    case MOVE_COUNTERCLOCKWISE:{
      const nextIndex = state - 1
      return nextIndex < 0 ? 5 : nextIndex;}
    default:
      return state;
  }
}

const initialQuizState = null;
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:{
      // console.log('payload = ', action.payload);
      return (state = action.payload);
    }  
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER: {
      return (state = action.payload);
    }  
    default:
      return state;
  }  
}

const initialMessageState = "";
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE: {
      return (state = action.payload);
    }  
    default:
      return state;
  }
  
}

const initialFormState = {
  newQuestion: "",
  newTrueAnswer: "",
  newFalseAnswer: "",
};
function form(state = initialFormState, action) {
  // console.log('action.payload = ',action.payload);
  switch (action.type) {
    case INPUT_CHANGE: 
      return { ...state, [action.payload.id]: action.payload.value }; 
    case RESET_FORM:
      state = initialFormState
      console.log('state = ', state);
      return { ...state, initialFormState };
    default:
      return state;
  }
}

export default combineReducers({
  wheel,
  quiz,
  selectedAnswer,
  infoMessage,
  form,
});
