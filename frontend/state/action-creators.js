// import * as type from "./action-types"
import * as actionType from './action-types'
import axios from "axios"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: actionType.MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: actionType.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(payload) {
  return { type: actionType.SET_SELECTED_ANSWER, payload: payload }
}

export function setMessage(payload) {
  return { type: actionType.SET_INFO_MESSAGE, payload: payload }
}

export function setQuiz(payload) {
  return { type: actionType.SET_QUIZ_INTO_STATE, payload: payload}
}

export function inputChange(value) {
  return { type: actionType.INPUT_CHANGE, payload: value }
}

export function resetForm() {
  return { type: actionType.RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null))

   axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.log(err.message);
      })
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/answer', answer)
      .then(res => {
        dispatch(selectAnswer(''));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch(err => {
        console.log(err.message);
      })
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', quiz)
      .then(res => {
        console.log('res.data = ', res.data);
        const question = res.data.question;
        dispatch(setMessage(`Congrats: "${question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch(err => {
        console.log(err.message);
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
