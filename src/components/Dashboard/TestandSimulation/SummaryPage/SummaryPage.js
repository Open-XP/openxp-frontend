import React, { Component } from "react";
import Checkmark from "../../../../icons/checkmark.png";
import Cancelmark from "../../../../icons/cancelmark.png";
import PropTypes from "prop-types";
import { fetchUserScore } from "../../../../Actions/Quiz";
import { explainAnswer } from "../../../../Actions/AI";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { connect } from "react-redux";

class SummaryPage extends Component {
  static propTypes = {
    testInstances: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    fetchUserScore: PropTypes.func.isRequired,
    userScores: PropTypes.object.isRequired,
    completedTestResponse: PropTypes.object.isRequired,
    explainAnswer: PropTypes.func.isRequired,
    explanation: PropTypes.array.isRequired,
  };

  state = {
    visibility: [],
    explanations: {},
    loadingStatus: {},
  };

  componentDidMount() {
    const { fetchUserScore, testInstances, completedTestResponse } = this.props;
    if (completedTestResponse) {
      this.setState({ loading: true }, () => {
        fetchUserScore(testInstances.id).finally(() => {
          this.setState({ loading: false });
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userScores !== this.props.userScores) {
      this.setState({ loading: false });
    }
  }

  toggleVisibility = (index) => {
    this.setState((prevState) => {
      const newVisibility = [...prevState.visibility];
      newVisibility[index] = !newVisibility[index];

      // Fetch explanation if the section is being shown
      if (newVisibility[index]) {
        this.handleExplainAnswer(index);
      }

      return { visibility: newVisibility };
    });
  };

  handleExplainAnswer = (index) => {
    const { userScores, explainAnswer } = this.props;
    const item = userScores.incorrect_questions[index];
    const question = item.question;
    const options = ` ${item.option_A} ${item.option_B} ${item.option_C} ${item.option_D}`;
    const text =
      "Justify why the selected answer is correct and explain in details";

    this.setState((prevState) => ({
      loadingStatus: { ...prevState.loadingStatus, [index]: true },
    }));

    explainAnswer(`${text + `:`}${` ` + question}${` ` + options}`).finally(
      () => {
        this.setState((prevState) => ({
          loadingStatus: { ...prevState.loadingStatus, [index]: false },
          explanations: {
            ...prevState.explanations,
            [index]: this.props.explanation.choices[0].message.content,
          },
        }));
      }
    );
  };

  returnHome = () => {
    const { navigate } = this.props;
    navigate("/dashboard");
  };

  renderSection = (index, question, answer) => {
    const { visibility, explanations, loadingStatus } = this.state;

    let explanationContent;
    if (loadingStatus[index]) {
      explanationContent = <div>Loading...</div>;
    } else {
      explanationContent = (
        <strong>
          <p className="w-[90%]">{explanations[index]}</p>
        </strong>
      );
    }

    return (
      <div key={index} className="mb-4">
        <div className="font-[600] text-[1.5rem] font-sans leading-[2.043rem] w-[36.438rem] h-fit">
          {question}
        </div>
        <div className={visibility[index] ? "" : "hidden"}>
          {answer}
          {explanationContent}
        </div>
        <button
          onClick={() => this.toggleVisibility(index)}
          className="text-blue-500"
        >
          {visibility[index] ? "Show less" : "Show more"}
        </button>
      </div>
    );
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const { userScores } = this.props;

    if (
      !userScores ||
      !userScores.correct_questions ||
      !userScores.incorrect_questions
    ) {
      return <div>No score data available</div>;
    }

    // Prepare sections from incorrect questions
    const sections = userScores.incorrect_questions.map((item, index) => {
      const correctOptionKey = `option_${item.answer}`;
      return {
        question: item.question,
        answer: `Correct answer: ${item[correctOptionKey]} (${item.answer})`,
      };
    });

    return (
      <div className="flex w-screen h-screen">
        <div className="fixed flex flex-col w-[35%] bg-purple-primary h-full text-white justify-center items-center gap-5">
          <div className="flex flex-col w-[20.375rem] h-[26.563rem] items-center justify-between">
            <div className="font-[700] text-[2.5rem] leading-[8.171rem] font-sans">
              Your Total Score
            </div>
            <div className="flex w-[19.75rem] h-[19.75rem] rounded-[50%] justify-center items-center border-white border-[9px]">
              <div>
                <div className="font-[700] text-[6rem] text-center leading-[8.171rem]">
                  {userScores.correct_questions.length}
                </div>
                <div className="font-[600] text-[2.5rem] leading-[3.404rem]">
                  OF {userScores.total_questions}
                </div>
              </div>
            </div>
          </div>
          <div className="font-[500] text-[1.5rem] w-[23.625rem] text-center lead-[2.043rem]">
            Average, Try again to understand concepts
          </div>
          <button
            onClick={this.returnHome}
            className="w-[13.75rem] h-[4.25rem] bg-skyblue-secondary font-[700] text-[1.5rem] rounded-[0.438rem] flex items-center justify-center"
          >
            Return Home
          </button>
        </div>
        <div className="flex w-full h-full justify-end">
          <div className="w-[65%] h-screen">
            <div className="mt-[7.5rem] ml-[3.75rem]">
              <div className="font-[700] text-[2rem] font-sans leading-[2.724rem]">
                Summary
              </div>
              <div className="flex flex-row gap-[0.688rem]">
                <img
                  src={Checkmark}
                  className="w-[3rem] h-[3rem] p-2"
                  alt="check mark"
                />
                <div className="flex flex-col font-[600] text-[1rem] gap-[0.625rem] leading-[1.362rem]">
                  <div>
                    Total Number of Incorrect questions answered:{" "}
                    {userScores.correct_questions.length}
                  </div>
                  <div>View all</div>
                </div>
              </div>

              <div className="flex gap-[0.688rem] ">
                <img
                  src={Cancelmark}
                  className="w-[3rem] h-[3rem] p-2"
                  alt="cancel mark"
                />
                <div className="flex flex-col font-[600] text-[1rem] gap-[0.625rem] leading-[1.362rem]">
                  <div>
                    Total Number of Correct questions answered:{" "}
                    {userScores.incorrect_questions.length}
                  </div>
                  <div>View all</div>
                </div>
              </div>
              <div>
                <div>Corrections</div>
                {sections.map((section, index) =>
                  this.renderSection(index, section.question, section.answer)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  testInstances: state.quiz.testInstances,
  userScores: state.quiz.userScores,
  completedTestResponse: state.quiz.completedTestResponse,
  explanation: state.ai.explanation,
});

const mapDispatchToProps = {
  fetchUserScore,
  explainAnswer,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(SummaryPage)
);
