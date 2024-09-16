import React, { Component } from "react";
import PersonalLearningNavbar from "../PersonalLearningNavbar/PersonalLearningNavbar";
import ArrowLeftSVG from "../../../../svgs/ArrowLeftSVG.svg";
import ExitSVG from "../../../../svgs/ExitSVG.svg";
import PropTypes from "prop-types";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { connect } from "react-redux";
import {
  fetchSimulatedTestUserScore,
  explainAnswer,
} from "../../../../Actions/AI";
import Spinner from "../../../../Animations/Spinner/spinner.js";
import { idProvider, parseMathSolution } from "../../../../Utils/Utils";
import MarkdownRenderer from "../../../../Utils/MarkdownRenderer";

class EvaluationCorrection extends Component {
  static propTypes = {
    simulatedTestIncorrect: PropTypes.array.isRequired,
    fetchSimulatedTestUserScore: PropTypes.func.isRequired,
    explanation: PropTypes.array.isRequired,
    explainAnswer: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visibility: [], // Manages the visibility of each explanation
      explanations: {}, // Stores fetched explanations
      loadingStatus: {}, // Tracks the loading state for each explanation
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const id = idProvider(location);
    this.props.fetchSimulatedTestUserScore(id);
  }

  handleExit = () => {
    this.props.navigate("/dashboard");
  };

  toggleVisibility = (index) => {
    this.setState((prevState) => {
      const newVisibility = [...prevState.visibility];
      newVisibility[index] = !newVisibility[index];

      if (newVisibility[index] && !prevState.explanations[index]) {
        this.handleExplainAnswer(index); // Fetch explanation if not already fetched
      }

      return { visibility: newVisibility };
    });
  };

  handleExplainAnswer = (index) => {
    const { simulatedTestIncorrect, explainAnswer } = this.props;

    if (!simulatedTestIncorrect || !Array.isArray(simulatedTestIncorrect)) {
      console.error("simulatedTestIncorrect is undefined or not an array");
      return;
    }

    const item = simulatedTestIncorrect[index];

    if (!item) {
      console.error(`No incorrect question found at index ${index}`);
      return;
    }

    const question = item?.question_text || "Question not available";
    const optionA = item?.option_a || "Option A not available";
    const optionB = item?.option_b || "Option B not available";
    const optionC = item?.option_c || "Option C not available";
    const optionD = item?.option_d || "Option D not available";

    const options = `${optionA} ${optionB} ${optionC} ${optionD}`;
    const text = `Justify why the selected answer is correct and explain in details: ${question} ${options}`;

    this.setState((prevState) => ({
      loadingStatus: { ...prevState.loadingStatus, [index]: true },
    }));

    explainAnswer(text)
      .then((response) => {
        const explanationContent =
          response?.choices?.[0]?.message?.content ||
          "Explanation not available";

        this.setState((prevState) => ({
          explanations: {
            ...prevState.explanations,
            [index]: explanationContent,
          },
        }));
      })
      .catch((error) => {
        console.error("Error explaining answer:", error);
        this.setState((prevState) => ({
          explanations: {
            ...prevState.explanations,
            [index]: "Error fetching explanation.",
          },
        }));
      })
      .finally(() => {
        this.setState((prevState) => ({
          loadingStatus: { ...prevState.loadingStatus, [index]: false },
        }));
      });
  };

  render() {
    const { simulatedTestIncorrect, loading } = this.props;
    const { visibility, loadingStatus, explanations } = this.state;

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full h-full bg-[#F9FAFB]">
        <PersonalLearningNavbar />
        <img
          src={ExitSVG}
          alt="exit"
          className="size-[2rem] cursor-pointer fixed top-[10rem] right-[5rem]"
          onClick={this.handleExit}
        />
        <div className="flex flex-col w-full min-h-screen shadow-custom2 justify-center items-center py-[10rem] gap-[4rem] px-[2rem]">
          <div className="w-[91%] flex flex-col items-center">
            <div className="w-[92%] flex flex-col gap-[1rem]">
              <img
                src={ArrowLeftSVG}
                alt="arrow-left"
                className="w-[2rem] h-[2rem] cursor-pointer relative left-0"
              />
              <div className="font-[700] text-[3rem] font-SFPro">
                Evaluation correction
              </div>
            </div>
            <div className="flex flex-col w-full bg-white px-[4%] py-[2rem]">
              {simulatedTestIncorrect.map((question, index) => (
                <div key={index} className="flex flex-col gap-[3rem] py-[3rem]">
                  <div className="font-[700] text-[2.5rem] font-SFPro leading-[2.983rem]">
                    Question {index + 1}
                  </div>
                  <div className="font-[500] text-[3rem] leading-[3.58rem] font-SFPro text-[#3C3C3C]">
                    <div>{question.question_text}</div>
                  </div>
                  <div className="flex justify-between font-[500] text-[2rem] leading-[2.387rem]">
                    <div>
                      Correct Answer ({question.correct_answer}):{" "}
                      {question[
                        `option_${question.correct_answer?.toLowerCase()}`
                      ] || "Option not available"}
                    </div>
                    <button
                      className="text-[#EB6C11]"
                      onClick={() => this.toggleVisibility(index)}
                    >
                      {visibility[index]
                        ? "Hide explanation"
                        : "View explanation"}
                    </button>
                  </div>

                  {/* Display Explanation */}
                  {visibility[index] && (
                    <div>
                      {loadingStatus[index] ? (
                        <div className="flex justify-start p-2 items-center">
                          <Spinner />
                        </div>
                      ) : (
                        <div
                          id={`explanation-${index}`}
                          className="flex flex-col justify-start p-2 items-start text-[2rem]"
                        >
                          {/* Render explanation using parseMathSolution */}
                          <div>{parseMathSolution(explanations[index])}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  simulatedTestIncorrect: state.ai.simulatedTestIncorrect,
  explanation: state.ai.explanation,
  loading: state.ai.loading,
});

const mapDispatchToProps = { fetchSimulatedTestUserScore, explainAnswer };

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(EvaluationCorrection)
);
