import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz } from "../state/action-creators";
import { selectAnswer } from "../state/action-creators";

function Quiz(props) {
  useEffect(() => {
    if (!props.quiz) props.fetchQuiz();
  }, []);

  const { selectAnswer } = props;
  console.log("props = ", props);
  // const { quiz } = props;
  // console.log('quiz = ', quiz);
  // const question = quiz.question;
  // console.log('quiz.question = ', quiz.question);
  // console.log('quiz.answers = ', quiz.answers);
  // console.log('quiz.quiz_id = ', quiz.quiz_id);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz...""answer selected"
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={props.selectedAnswer == props.quiz.answers[0].answer_id ? "answer selected" : "answer"}>
                {props.quiz.answers[0].text}
                <button
                  onClick={() => selectAnswer(props.quiz.answers[0].answer_id)}
                >
                  {props.selectedAnswer == props.quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={props.selectedAnswer == props.quiz.answers[1].answer_id ? "answer selected" : "answer"}>
                {props.quiz.answers[1].text}
                <button
                  onClick={() => selectAnswer(props.quiz.answers[1].answer_id)}
                >
                  {props.selectedAnswer == props.quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
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

export default connect(mapStateToProps, { fetchQuiz, selectAnswer })(Quiz);
// props.quiz.answers[0].answer_id
