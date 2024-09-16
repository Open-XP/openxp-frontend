import React, { Component } from "react";
import OpenxpSVG from "../../../../svgs/openxp.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { explainAnswer } from "../../../../Actions/AI";
import { fetchUserScore } from "../../../../Actions/Quiz";
import Spinner from "../../../../Animations/Spinner/spinner.js";
import CopyIcon from "../../../../icons/CopyIcon.png";
import ReadIcon from "../../../../icons/ReadIcon.png";
import Ripple from "../../../../Animations/Ripple/Ripple.js";
import DownloadIcon from "../../../../icons/downloadbutton.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReturnHomeButton from "../../../../icons/ReturnHomeButton.png";
import html2canvas from "html2canvas";

class ShowExplanation extends Component {
  static propTypes = {
    testInstances: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    fetchUserScore: PropTypes.func.isRequired,
    userScores: PropTypes.object.isRequired,
    completedTestResponse: PropTypes.object.isRequired,
    explainAnswer: PropTypes.func.isRequired,
    explanation: PropTypes.array.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visibility: [],
      explanations: {},
      loadingStatus: {},
      loading: false,
      isSpeaking: false,
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

  handleReturnHome = () => {
    this.props.navigate("/dashboard");
  };

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

  handleTextToSpeech = (text) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      this.setState({ isSpeaking: false });
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        this.setState({ isSpeaking: false });
      };
      speechSynthesis.speak(utterance);
      this.setState({ isSpeaking: true });
    }
  };

  handleExplainAnswer = (index) => {
    const { userScores, explainAnswer, explanation } = this.props;

    // Ensure userScores and incorrect_questions are defined
    if (
      !userScores ||
      !userScores.incorrect_questions ||
      !userScores.incorrect_questions[index]
    ) {
      return;
    }

    const item = userScores.incorrect_questions[index];
    const question = item?.question || "Question not available";
    const optionA = item?.option_A || "Option A not available";
    const optionB = item?.option_B || "Option B not available";
    const optionC = item?.option_C || "Option C not available";
    const optionD = item?.option_D || "Option D not available";

    const options = `${optionA} ${optionB} ${optionC} ${optionD}`;
    const text =
      "Justify why the selected answer is correct and explain in details";

    this.setState((prevState) => ({
      loadingStatus: { ...prevState.loadingStatus, [index]: true },
    }));

    explainAnswer(`${text}: ${question} ${options}`)
      .catch((error) => {
        console.error("Error explaining answer:", error);
        // Optionally handle the error, such as displaying a message to the user
      })
      .finally(() => {
        this.setState((prevState) => ({
          loadingStatus: { ...prevState.loadingStatus, [index]: false },
          explanations: {
            ...prevState.explanations,
            [index]:
              explanation?.choices?.[0]?.message?.content ||
              "Explanation not available",
          },
        }));
      });
  };

  handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  handleDownload = (index) => {
    const element = document.querySelector(`#explanation-${index}`);
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `explanation_${index}.png`;
      link.click();
    });
  };

  render() {
    const { visibility, explanations, loadingStatus, loading, isSpeaking } =
      this.state;
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
          <div className="flex gap-1 mt-[3.75rem] w-full justify-between">
            <div className="flex">
              <OpenxpSVG className="size-[2rem] text-purple-primary" />
              <div className="font-[700] text-[1.25rem]">openxp</div>
            </div>

            <button
              onClick={this.handleReturnHome}
              className="size-[30px] flex relative left-0  justify-center items-center"
            >
              <img
                className="size-[20px] flex"
                src={ReturnHomeButton}
                alt="Return Home"
              />
            </button>
          </div>
          <div className="flex flex-col gap-[0.1rem]">
            <div className="text-[#EA4335] font-manropes font-[700] text-[4rem] ">
              Corrections
            </div>
            {userScores.incorrect_questions.map((question, index) => (
              <div
                key={index}
                className="flex flex-col gap-[0.75rem] pb-[1rem]"
                id={`explanation-${index}`}
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
                      <div
                        id={`explanation-${index}`}
                        className="w-full px-[2rem] py-[2rem] bg-[#6670850A]/[4%]"
                      >
                        <div className="w-full font-manropes text-[2rem] font-[500] leading-[4rem]">
                          {explanations[index]}
                        </div>
                        <div className="flex w-full justify-between">
                          <div className="relative flex w-fit gap-4 justify-center items-center">
                            <img
                              src={CopyIcon}
                              className="cursor-pointer size-[20px]"
                              onClick={() =>
                                this.handleCopy(explanations[index])
                              }
                            />
                            <div
                              className="relative cursor-pointer size-[40px] justify-center items-center flex"
                              onClick={() =>
                                this.handleTextToSpeech(explanations[index])
                              }
                            >
                              {isSpeaking ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Ripple size={40} />
                                </div>
                              ) : (
                                <img
                                  src={ReadIcon}
                                  className="w-[20px] h-[20px] object-contain"
                                />
                              )}
                            </div>
                          </div>
                          <button
                            className="flex justify-center items-center w-fit py-[17px] px-[14px] bg-skyblue-secondary gap-[11px] rounded-[41px] cursor-pointer"
                            onClick={() => this.handleDownload(index)}
                          >
                            <div className="font-[600] text-[1.25rem] text-white font-inter">
                              Download Flashcard{" "}
                            </div>
                            <img
                              className="size-[18px]"
                              src={DownloadIcon}
                              alt="Download"
                            />
                          </button>
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
        <ToastContainer />
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
