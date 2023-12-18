import * as type from "./action-types"
import axios from "axios"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: type.MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: type.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(payload) {
  return { type: type.SET_SELECTED_ANSWER, payload: payload }
}

export function setMessage(payload) {
  return { type: type.SET_INFO_MESSAGE, payload: payload }
}

export function setQuiz(payload) {
  return { type: type.SET_QUIZ_INTO_STATE, payload: payload}
}

export function inputChange() { }

export function resetForm() {
  return { type: type.RESET_FORM }
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
        dispatch(fetchQuiz);
      })
      .catch(err => {
        console.log(err.message);
      })
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
