import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";

function Quiz(props) {
  useEffect(() => {
    if (!props.quiz) props.fetchQuiz();
  }, []);
  
  const [ isDisabled, setDisabled ] = useState(true);

  const { selectAnswer, postAnswer, selectedAnswer } = props;
  console.log('selectedAnswer = ', selectedAnswer);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz...""answer selected"
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={
                  props.selectedAnswer == props.quiz.answers[0].answer_id
                    ? "answer selected"
                    : "answer"
                }
              >
                {props.quiz.answers[0].text}
                <button
                  onClick={() => {
                    setDisabled(false);
                    selectAnswer(props.quiz.answers[0].answer_id);
                  }}
                >
                  {props.selectedAnswer == props.quiz.answers[0].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>

              <div
                className={
                  props.selectedAnswer == props.quiz.answers[1].answer_id
                    ? "answer selected"
                    : "answer"
                }
              >
                {props.quiz.answers[1].text}
                <button
                  onClick={() => {
                    setDisabled(false);
                    selectAnswer(props.quiz.answers[1].answer_id);
                  }}
                >
                  {props.selectedAnswer == props.quiz.answers[1].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            </div>

            <button
              id="submitAnswerBtn"
              onClick={() =>
                postAnswer({
                  quiz_id: props.quiz.quiz_id,
                  answer_id: props.selectedAnswer,
                })
              }
              disabled={isDisabled}
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
})(Quiz);
