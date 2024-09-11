import React, { Component } from "react";
import PersonalLearningNavbar from "../PersonalLearningNavbar/PersonalLearningNavbar";
import ArrowLeftSVG from "../../../../svgs/ArrowLeftSVG.svg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import EvaluationScore from "../EvaluationScore/EvaluationScore";
import {
  fetchGeneratedPersonalizedTestQuestions,
  submitPersonalizedTestAnswers,
  completeSimulatedTest,
  fetchSimulatedTestUserScore,
} from "../../../../Actions/AI";

class PersonalizedEvaluation extends Component {
  static propTypes = {
    selectedSubject: PropTypes.string.isRequired,
    generatedTestScore: PropTypes.string.isRequired,
    allGeneratedTests: PropTypes.array.isRequired,
    fetchGeneratedPersonalizedTestQuestions: PropTypes.func.isRequired,
    submitPersonalizedTestAnswers: PropTypes.func.isRequired,
    generatedTestOption: PropTypes.string.isRequired,
    generatedTestquestionID: PropTypes.string.isRequired,
    generatedTestQuestionID: PropTypes.string.isRequired,
    completeSimulatedTest: PropTypes.func.isRequired,
    fetchSimulatedTestUserScore: PropTypes.func.isRequired,
  };

  state = {
    selectedOptions: {},
    showCompletionPopup: false,
    id: null, // Track id in state
  };

  idProvider = () => {
    const { location } = this.props;
    const partParts = location.pathname.split("/");
    const id = partParts[partParts.length - 1];
    return id;
  };

  componentDidMount() {
    const id = this.idProvider();
    this.setState({ id }); // Store the id in the state
    this.props.fetchGeneratedPersonalizedTestQuestions(id);
  }

  handleSelectOption = (questionId, selectedOption) => {
    this.setState((prevState) => ({
      selectedOptions: {
        ...prevState.selectedOptions,
        [questionId]: selectedOption,
      },
    }));
    this.props.submitPersonalizedTestAnswers(
      this.idProvider(),
      questionId,
      selectedOption
    );
  };

  handleCompleteSimulatedEvaluation = async () => {
    await this.props.completeSimulatedTest(this.idProvider());
    await this.ShowPopup();
  };

  ShowPopup = () => {
    setTimeout(() => {
      this.setState({ showCompletionPopup: true });
    }, 1000);
  };

  renderQuestions = () => {
    const { allGeneratedTests = [] } = this.props;
    const { selectedOptions } = this.state;

    if (allGeneratedTests.length === 0) {
      return <div>No questions available.</div>;
    }

    return allGeneratedTests.map((test, index) => (
      <div key={test.id} className="flex flex-col justify-start gap-[1.5rem]">
        <div className="font-[700] font-SFPro text-[2.5rem]">
          Question {index + 1}
        </div>
        <div className="font-[500] text-[2.25rem] leading-[1.873rem]">
          {test.question_text}
        </div>

        {/* Option A */}
        <label className="flex flex-col gap-4 cursor-pointer">
          <div className="flex gap-[1rem] rounded-[0.625rem] px-[2.375rem] py-[1rem] border-[#667085] border-[1px] items-center">
            <input
              className="font-[400] font-SFPro text-[1.5rem] leading-[2.387rem] radio-custom"
              type="radio"
              name={`question${test.id}`}
              value="A"
              checked={selectedOptions[test.id] === "A"}
              onChange={() => this.handleSelectOption(test.id, "A")}
            />
            <div>{test.option_a}</div>
          </div>
        </label>

        {/* Option B */}
        <label className="flex flex-col gap-4 cursor-pointer">
          <div className="flex gap-[1rem] rounded-[0.625rem] px-[2.375rem] py-[1rem] border-[#667085] border-[1px] items-center">
            <input
              className="font-[400] font-SFPro text-[1.5rem] leading-[2.387rem] radio-custom"
              type="radio"
              name={`question${test.id}`}
              value="B"
              checked={selectedOptions[test.id] === "B"}
              onChange={() => this.handleSelectOption(test.id, "B")}
            />
            <div>{test.option_b}</div>
          </div>
        </label>

        {/* Option C */}
        <label className="flex flex-col gap-4 cursor-pointer">
          <div className="flex gap-[1rem] rounded-[0.625rem] px-[2.375rem] py-[1rem] border-[#667085] border-[1px] items-center">
            <input
              className="font-[400] font-SFPro text-[1.5rem] leading-[2.387rem] radio-custom"
              type="radio"
              name={`question${test.id}`}
              value="C"
              checked={selectedOptions[test.id] === "C"}
              onChange={() => this.handleSelectOption(test.id, "C")}
            />
            <div>{test.option_c}</div>
          </div>
        </label>

        {/* Option D */}
        <label className="flex flex-col gap-4 cursor-pointer">
          <div className="flex gap-[1rem] rounded-[0.625rem] px-[2.375rem] py-[1rem] border-[#667085] border-[1px] items-center">
            <input
              className="font-[400] font-SFPro text-[1.5rem] leading-[2.387rem] radio-custom"
              type="radio"
              name={`question${test.id}`}
              value="D"
              checked={selectedOptions[test.id] === "D"}
              onChange={() => this.handleSelectOption(test.id, "D")}
            />
            <div>{test.option_d}</div>
          </div>
        </label>
      </div>
    ));
  };

  render() {
    const { showCompletionPopup, id } = this.state;

    return (
      <div className="flex flex-col w-full min-h-screen">
        <PersonalLearningNavbar id={id} />
        {showCompletionPopup && <EvaluationScore id={id} />} {/* Pass the id */}
        <div className="flex flex-col w-full min-h-screen bg-[#F9FAFB] shadow-custom2 justify-center items-center py-[5rem]">
          <div className="flex flex-col w-[91%] bg-white px-[4%] gap-[1.5rem] py-[4rem]">
            <div>
              <img src={ArrowLeftSVG} alt="back" className="cursor-pointer" />
            </div>
            <div className="font-[700] text-[2.5rem] leading-[2.983rem] font-SFPro">
              Evaluation on Motion
            </div>
            {this.renderQuestions()}
            <div>
              <button
                onClick={this.handleCompleteSimulatedEvaluation}
                className="bg-purple-primary w-[60%] 2xl:w-[40%] text-white h-[5.313rem] font-geist font-[300] text-[2rem] rounded-[0.813rem]"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedSubject: state.ai.selectedSubject,
  generatedTestScore: state.ai.generatedTestScore,
  allGeneratedTests: state.ai.allGeneratedTests || [],
  generatedTestOption: state.ai.generatedTestOption,
  generatedTestquestionID: state.ai.generatedTestquestionID,
  generatedTestQuestionID: state.ai.generatedTestQuestionID,
});

const mapDispatchToProps = {
  fetchGeneratedPersonalizedTestQuestions,
  submitPersonalizedTestAnswers,
  completeSimulatedTest,
  fetchSimulatedTestUserScore,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(PersonalizedEvaluation)
);
