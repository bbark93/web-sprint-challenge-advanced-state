import React from "react";
import { connect } from "react-redux";
import { inputChange, postQuiz } from "../state/action-creators";

export function Form(props) {
  console.log("props.form = ", props.form);
  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;

  const onChange = (evt) => {
    props.inputChange(evt.target);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz({
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    });
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.form.newFalseAnswer}
      />
      <button
        id="submitNewQuizBtn"
        disabled={
          newQuestion.trim().length > 0 &&
          newTrueAnswer.trim().length > 0 &&
          newFalseAnswer.trim().length > 0
            ? false
            : true
        }
      >
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return { form: state.form };
};

export default connect(mapStateToProps, { inputChange, postQuiz })(Form);
// export default connect(st => st, actionCreators)(Form)
