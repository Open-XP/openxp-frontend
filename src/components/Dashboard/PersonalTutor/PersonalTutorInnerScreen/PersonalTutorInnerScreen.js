import React, { Component } from "react";
import OpenxpSVG from "../../../../svgs/openxp";
import MagnifyingLenseSVG from "../../../../svgs/MagnifyingLenseSVG.svg";
import NotificationBellSVG from "../../../../svgs/NotificationBellSVG.svg";
import ArrowLeftSVG from "../../../../svgs/ArrowLeftSVG.svg";
import FileArrowDownloadSVG from "../../../../svgs/FileArrowDownloadSVG.svg";
import LeftArrowSVG from "../../../../svgs/LeftArrowSVG.svg";
import RightArrowSVG from "../../../../svgs/RightArrowSVG.svg";
import SimpleExplanationLoader from "../SimpleExplanationLoader/SimpleExplanationLoader";
import GiveSimpleExplanation from "../GiveSimpleExplanation/GiveSimpleExplanation";
import ReferenceImage from "../ReferenceImagePage/ReferenceImagePage";
import ExplainFurtherPage from "../ExplainFurtherPage/ExplainFurtherPage";
import {
  generatePersonalizedNotes,
  fetchGeneratedPersonalizedNotes,
  GenerateDetailedPersonalizedNotes,
} from "../../../../Actions/AI";
import PropTypes from "prop-types";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { connect } from "react-redux";

class PersonalTutorInnerScreen extends Component {
  static propTypes = {
    generatePersonalizedNotes: PropTypes.func.isRequired,
    fetchGeneratedPersonalizedNotes: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    generatingPersonalizedLearning: PropTypes.bool.isRequired,
    introduction: PropTypes.string.isRequired,
    learningObjectives: PropTypes.string.isRequired,
    learningObjectivesOne: PropTypes.string.isRequired,
    learningObjectivesTwo: PropTypes.string.isRequired,
    learningObjectivesThree: PropTypes.string.isRequired,
    learningObjectivesFour: PropTypes.string.isRequired,
    learningObjectivesFive: PropTypes.string.isRequired,
    learningObjectivesSix: PropTypes.string.isRequired,
    learningObjectivesSeven: PropTypes.string.isRequired,
    learningObjectivesEight: PropTypes.string.isRequired,
    learningObjectivesNine: PropTypes.string.isRequired,
    learningObjectivesTen: PropTypes.string.isRequired,
  };

  state = {
    contentType: [
      "introduction",
      "learning_objectives",
      {
        dynamic_content: [
          "learning_objective_1",
          "learning_objective_2",
          "learning_objective_3",
          "learning_objective_4",
          "learning_objective_5",
          "learning_objective_6",
          "learning_objective_7",
          "learning_objective_8",
          "learning_objective_9",
          "learning_objective_10",
        ],
      },
    ],
    currentIndex: 0,
    subIndex: 0,
    inDynamicContent: false,
    loading: true,
    isFetching: false,
    fetchedContent: new Set(["introduction"]),
  };

  componentDidMount() {
    const { location, introduction } = this.props;
    const partParts = location.pathname.split("/");
    const id = partParts[partParts.length - 1];

    if (!introduction) {
      this.fetchContent(id, "introduction");
    } else {
      this.setState({ loading: false });
    }
  }

  fetchContent = (id, contentType) => {
    this.setState({ isFetching: true, loading: true });

    let fetchPromise;
    if (contentType === "introduction") {
      fetchPromise = this.props.generatePersonalizedNotes(id, "introduction");
    } else if (contentType === "learning_objectives") {
      fetchPromise = this.props.generatePersonalizedNotes(
        id,
        "learning_objectives"
      );
    } else {
      fetchPromise = this.props.GenerateDetailedPersonalizedNotes(
        id,
        contentType
      );
    }

    fetchPromise.then(() => {
      this.setState((prevState) => ({
        isFetching: false,
        loading: false,
        fetchedContent: new Set(prevState.fetchedContent).add(contentType),
      }));
    });
  };

  handleNext = () => {
    const { contentType, currentIndex, subIndex, inDynamicContent } =
      this.state;
    const partParts = this.props.location.pathname.split("/");
    const id = partParts[partParts.length - 1];

    let nextContentType;
    let nextIndex = currentIndex;
    let nextSubIndex = subIndex;
    let nextInDynamicContent = inDynamicContent;

    if (contentType[currentIndex] === "introduction") {
      nextContentType = "learning_objectives";
      nextIndex = currentIndex + 1;
    } else if (contentType[currentIndex] === "learning_objectives") {
      nextContentType = "learning_objective_1";
      nextIndex = currentIndex + 1;
      nextInDynamicContent = true;
    } else if (inDynamicContent) {
      const dynamicContent = contentType[2].dynamic_content;
      if (subIndex < dynamicContent.length - 1) {
        nextContentType = dynamicContent[subIndex + 1];
        nextSubIndex = subIndex + 1;
      } else {
        // Handle the case when all content has been viewed
        console.log("All content has been viewed");
        return;
      }
    }

    this.setState(
      {
        currentIndex: nextIndex,
        subIndex: nextSubIndex,
        inDynamicContent: nextInDynamicContent,
        loading: true,
      },
      () => {
        if (!this.state.fetchedContent.has(nextContentType)) {
          this.fetchContent(id, nextContentType);
        } else {
          this.setState({ loading: false });
        }
      }
    );
  };

  formatContent = (content) => {
    return content
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  checkIfFetchNeeded = (contentType) => {
    return !this.state.fetchedContent.has(contentType);
  };

  removeLearningObjectivePrefix = (content) => {
    // Define a more flexible pattern to match any subject between "Subject:" and "Learning Objective: 1."
    const pattern = /Subject:\s*[A-Za-z\s]+\s*Learning Objective:\s*1\.\s*/;

    // Use the replace method to remove the pattern
    return content.replace(pattern, "");
  };

  getContentForSection = (section) => {
    const {
      introduction,
      learningObjectives,
      learningObjectivesOne,
      learningObjectivesTwo,
      learningObjectivesThree,
      learningObjectivesFour,
      learningObjectivesFive,
      learningObjectivesSix,
      learningObjectivesSeven,
      learningObjectivesEight,
      learningObjectivesNine,
      learningObjectivesTen,
    } = this.props;

    if (this.state.loading) {
      return "Loading...";
    }

    switch (section) {
      case "introduction":
        return introduction || "Introduction not available";
      case "learning_objectives":
        if (
          typeof learningObjectives === "object" &&
          learningObjectives !== null
        ) {
          return (
            <ul>
              {Object.entries(learningObjectives).map(([key, value]) => (
                <li key={key}>
                  <strong>{this.formatContent(key)}</strong>: {value}
                </li>
              ))}
            </ul>
          );
        }
        return learningObjectives || "Learning objectives not available";
      case "learning_objective_1":
        console.log(
          "This is one of the learning objectives:",
          learningObjectivesOne
        );
        return learningObjectivesOne || "Content not available";
      case "learning_objective_2":
        return learningObjectivesTwo || "Content not available";
      case "learning_objective_3":
        return learningObjectivesThree || "Content not available";
      case "learning_objective_4":
        return learningObjectivesFour || "Content not available";
      case "learning_objective_5":
        return learningObjectivesFive || "Content not available";
      case "learning_objective_6":
        return learningObjectivesSix || "Content not available";
      case "learning_objective_7":
        return learningObjectivesSeven || "Content not available";
      case "learning_objective_8":
        return learningObjectivesEight || "Content not available";
      case "learning_objective_9":
        return learningObjectivesNine || "Content not available";
      case "learning_objective_10":
        return learningObjectivesTen || "Content not available";
      default:
        return "Content not available";
    }
  };

  render() {
    const { generatingPersonalizedLearning } = this.props;
    const { contentType, currentIndex, subIndex, inDynamicContent, loading } =
      this.state;

    let contentToShow;
    if (inDynamicContent) {
      contentToShow = contentType[2].dynamic_content[subIndex];
    } else {
      contentToShow =
        typeof contentType[currentIndex] === "string"
          ? contentType[currentIndex]
          : contentType[currentIndex].dynamic_content[subIndex];
    }

    const formattedContentToShow = this.formatContent(contentToShow);
    const renderedContent = this.getContentForSection(contentToShow);

    return (
      <div className="flex flex-col w-full min-h-screen">
        {/* Header */}
        <div className="w-full h-[5.25rem]">
          <div className="fixed w-full h-[5.25rem] px-[4.5%] flex justify-between shadow-custom items-center z-10 bg-white">
            <div className="flex h-[2.063rem] items-center gap-[0.813rem]">
              <OpenxpSVG className="w-[1.813rem] h-full text-purple-primary" />
              <div className="font-sans h-full font-[700] text-[1.25rem]">
                Openxp
              </div>
            </div>
            <div className="flex h-[2rem] gap-[2.063rem]">
              <img
                className="size-[2rem]"
                src={MagnifyingLenseSVG}
                alt="Search"
              />
              <img
                className="size-[2rem]"
                src={NotificationBellSVG}
                alt="Notifications"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col w-full min-h-screen bg-[#F9FAFB] shadow-custom2 justify-center items-center py-[10rem]">
          <div className="flex flex-col w-[91%] bg-white px-[4%] gap-[1.5rem]">
            {/* Lesson Header */}
            <div className="flex flex-col w-full item-center">
              <img className="size-[2.625rem]" src={ArrowLeftSVG} alt="Back" />
              <div className="flex py-[1rem] justify-between gap-[1rem]">
                <div className="flex max-w-[60%] 2xl:max-w-[40%] font-SFPro font-[700] text-[2rem] leading-[2.387rem]">
                  Lesson 1: {formattedContentToShow}
                </div>
                <button className="flex bg-[#34C759] w-[25%] 2xl:w-[14%] py-[1rem] justify-center items-center gap-[0.625rem] rounded-[0.625rem]">
                  <div className="font-[700] text-[1.25rem] text-white">
                    Download as pdf
                  </div>
                  <img src={FileArrowDownloadSVG} alt="Download" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-[1rem]">
              <div className="flex flex-col w-full">
                <div
                  className="flex w-full h-[0.688rem] rounded-[3.563rem]"
                  style={{ background: "rgba(40, 18, 102, 0.23)" }}
                >
                  <div className="w-[10%] rounded-[3.563rem] bg-purple-primary"></div>
                </div>
              </div>
              <div className="font-SFPro font-[700] text-[1.375rem] leading-[1.641rem] text-purple-primary">
                1/9
              </div>
            </div>

            {/* Lesson Content */}
            <div className="font-[700] font-SFPro text-[3rem] leading-[3.58rem]">
              {formattedContentToShow}
            </div>
            <div className="font-[400] font-SFPro text-[2rem] leading-[2.387rem]">
              {loading || generatingPersonalizedLearning ? (
                <SimpleExplanationLoader />
              ) : (
                renderedContent
              )}
            </div>

            {/* Additional Components */}
            {/* <SimpleExplanationLoader />
            <GiveSimpleExplanation />
            <ReferenceImage />
            <ExplainFurtherPage /> */}

            {/* Buttons */}
            <div className="flex flex-col gap-[0.625rem]">
              <button
                className="bg-[#E8EDF3] w-[60%] 2xl:w-[40%] h-[5.313rem] font-geist font-[300] text-[2rem] rounded-[0.813rem]"
                onClick={this.handleSimplerExplanation}
              >
                Give me a simpler explanation
              </button>
              <button
                className="bg-purple-primary w-[60%] 2xl:w-[40%] text-white h-[5.313rem] font-geist font-[300] text-[2rem] rounded-[0.813rem]"
                onClick={this.handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Pagination */}
        <div className="fixed font-geist font-[500] text-[1.5rem] flex gap-[0.438rem] w-[33rem] h-[2.125rem] leading-[1.86rem] z-30 top-[80%] left-0 right-0 bottom-0 m-auto justify-center items-center">
          <img
            className="size-[1.5rem] px-13px py-4px"
            src={LeftArrowSVG}
            alt="Left"
          />
          <div className="size-[2.125rem] py-[4px] text-center">1</div>
          <div className="size-[2.125rem] py-[4px] text-center">2</div>
          <div className="size-[2.125rem] py-[4px] text-center">3</div>
          <div className="size-[2.125rem] py-[4px] text-center">4</div>
          <div className="size-[2.125rem] py-[4px] text-center">5</div>
          <div className="size-[2.125rem] py-[4px] text-center">6</div>
          <div className="size-[2.125rem] py-[4px] text-center">7</div>
          <div className="size-[2.125rem] py-[4px] text-center">8</div>
          <div className="size-[2.125rem] py-[4px] text-center">9</div>
          <div className="size-[2.125rem] py-[4px] text-center">10</div>
          <img
            className="size-[1.5rem] px-13px py-4px"
            src={RightArrowSVG}
            alt="Right"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  introduction: state.ai.introduction,
  learningObjectives: state.ai.learningObjectives,
  learningObjectivesOne: state.ai.learningObjectivesOne,
  learningObjectivesTwo: state.ai.learningObjectivesTwo,
  learningObjectivesThree: state.ai.learningObjectivesThree,
  learningObjectivesFour: state.ai.learningObjectivesFour,
  learningObjectivesFive: state.ai.learningObjectivesFive,
  learningObjectivesSix: state.ai.learningObjectivesSix,
  learningObjectivesSeven: state.ai.learningObjectivesSeven,
  learningObjectivesEight: state.ai.learningObjectivesEight,
  learningObjectivesNine: state.ai.learningObjectivesNine,
  learningObjectivesTen: state.ai.learningObjectivesTen,
  generatingPersonalizedLearning: state.ai.generatingPersonalizedLearning,
});

const mapDispatchToProps = {
  generatePersonalizedNotes,
  fetchGeneratedPersonalizedNotes,
  GenerateDetailedPersonalizedNotes,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(PersonalTutorInnerScreen)
);
