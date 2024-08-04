import React, { Component } from "react";
import OpenxpSVG from "../../../../svgs/openxp.js";
// import Spinner from "../../../../icons/Spinner.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { explainAnswer } from "../../../../Actions/AI";
import { fetchUserScore } from "../../../../Actions/Quiz";
import Spinner from "../../../../Animations/Spinner/spinner.js";

class ShowExplanation extends Component {
  static propTypes = {
    testInstances: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    fetchUserScore: PropTypes.func.isRequired,
    userScores: PropTypes.object.isRequired,
    completedTestResponse: PropTypes.object.isRequired,
    explainAnswer: PropTypes.func.isRequired,
    explanation: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visibility: [],
      explanations: {},
      loadingStatus: {},
      loading: false,
    };
  }

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

  render() {
    const { visibility, explanations, loadingStatus, loading } = this.state;
    const { userScores } = this.props;

    if (loading) {
      return (
        <div className="w-screen h-screen flex justify-center items-center">
          <img src={Spinner} alt="Loading" />
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-[80%] flex flex-col gap-[4rem]">
          <div className="flex gap-1 mt-[3.75rem]">
            <OpenxpSVG className="size-[2rem] text-purple-primary" />
            <div className="font-[700] text-[1.25rem]">openxp</div>
          </div>
          <div className="flex flex-col gap-[0.1rem]">
            <div className="text-[#EA4335] font-manropes font-[700] text-[4rem] ">
              Corrections
            </div>
            {userScores.incorrect_questions.map((question, index) => (
              <div
                key={index}
                className="flex flex-col gap-[0.75rem] pb-[1rem]"
              >
                <div className="flex flex-wrap font-[600] font-manropes text-[2rem] leading-[2.169rem]">
                  {index + 1}. {question.question}
                </div>
                <div className="ml-[2rem] w-fit px-[2rem] h-[3.375rem] bg-[#217A531A]/10 flex justify-center items-center font-[700] font-manropes text-[2rem] leading-[2.169rem] text-[#34C759] rounded-[0.313rem]">
                  Correct Answer ({question.answer}):{" "}
                  {question[`option_${question.answer}`]}
                </div>

                {visibility[index] && (
                  <div className="flex flex-col gap-[0.5rem]">
                    {loadingStatus[index] ? (
                      <div>
                        <div className="flex justify-start p-2 items-center">
                          <Spinner />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full px-[2rem] py-[2rem] bg-[#6670850A]/[4%]">
                        <div className="w-full font-manropes text-[2rem] font-[500] leading-[4rem]">
                          {explanations[index]}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div
                  className="w-[16.875rem] h-[4rem] flex justify-center items-center font-manropes font-[400] text-[2rem] leading-[2.169rem] text-[#00000073]/45 cursor-pointer ml-[1.5rem]"
                  onClick={() => this.toggleVisibility(index)}
                >
                  {visibility[index] ? "Hide Explanation" : "View Explanation"}
                </div>
              </div>
            ))}
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
  explainAnswer,
  fetchUserScore,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(ShowExplanation)
);
