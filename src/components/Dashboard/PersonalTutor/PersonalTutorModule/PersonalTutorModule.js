import React, { Component } from "react";
import HumanMetaFigureSVG from "../../../../svgs/HumanMetaFigureSVG.svg";
import UpAndDownStuff from "../../../../svgs/UpAndDownStuff.svg";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { Link, Navigate } from "react-router-dom";
import {
  FetchSelectionSubjectAndTopic,
  startPersonalizedStudy,
  generatePersonalizedNotes,
  flushAllAIStates,
} from "../../../../Actions/AI";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PersonalTutorModule extends Component {
  static propTypes = {
    FetchSelectionSubjectAndTopic: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
    startPersonalizedStudy: PropTypes.func.isRequired,
    personalStudyID: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    flushAllAIStates: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: null,
      selectedTopic: null,
      selectedGrade: null,
      selectedDifficulty: null,
      subjectDropdownOpen: false,
      topicDropdownOpen: false,
      gradeDropdownOpen: false,
      difficultyDropdownOpen: false,
    };
  }

  placeholder = {
    difficulty: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    grade: [10, 11, 12],
  };

  toggleSubjectDropdown = () => {
    this.setState((prevState) => ({
      subjectDropdownOpen: !prevState.subjectDropdownOpen,
    }));
  };

  toggleTopicDropdown = () => {
    this.setState((prevState) => ({
      topicDropdownOpen: !prevState.topicDropdownOpen,
    }));
  };

  toggleGradeDropdown = () => {
    this.setState((prevState) => ({
      gradeDropdownOpen: !prevState.gradeDropdownOpen,
    }));
  };

  toggleDifficultyDropdown = () => {
    this.setState((prevState) => ({
      difficultyDropdownOpen: !prevState.difficultyDropdownOpen,
    }));
  };

  setSelectedSubject = (subject) => {
    this.setState({
      selectedSubject: subject,
      selectedTopic: null,
      subjectDropdownOpen: false,
    });
  };

  setSelectedTopic = (topic) => {
    this.setState({
      selectedTopic: topic,
      topicDropdownOpen: false,
    });
  };

  setSelectedGrade = (grade) => {
    this.setState({
      selectedGrade: grade,
      gradeDropdownOpen: false,
    });
  };

  setSelectedDifficulty = (difficulty) => {
    this.setState({
      selectedDifficulty: difficulty,
      difficultyDropdownOpen: false,
    });
  };

  componentDidMount = () => {
    this.props.FetchSelectionSubjectAndTopic();
    this.props.flushAllAIStates();
  };

  handleStartPersonalizedStudy = () => {
    const {
      selectedSubject,
      selectedTopic,
      selectedGrade,
      selectedDifficulty,
    } = this.state;
    const { personalStudyID } = this.props;
    if (
      selectedSubject &&
      selectedTopic &&
      selectedGrade &&
      selectedDifficulty
    ) {
      console.log("Subject:", selectedSubject);
      console.log("Topic:", selectedTopic);
      console.log("Grade:", selectedGrade);
      console.log("Difficulty:", selectedDifficulty);
      this.props
        .startPersonalizedStudy(
          selectedSubject.name,
          selectedTopic.name,
          selectedGrade,
          selectedDifficulty
        )
        .then((data) => {
          if (data !== undefined && data !== null) {
            console.log("This is getting in");
            this.props.navigate(`personal-learning/${data.id}`);
          }
          if (data.id) {
            this.props
              .generatePersonalizedNotes(data.id, "introduction")
              .then(() => {
                // Add a delay before triggering the second request
                setTimeout(() => {
                  this.props.generatePersonalizedNotes(
                    data.id,
                    "learning_objectives"
                  );
                }, 1000); // Delay of 1 second (1000 milliseconds)
              });
          }
        });
    }
  };

  render() {
    const { subjects } = this.props;
    const {
      selectedSubject,
      selectedTopic,
      selectedGrade,
      selectedDifficulty,
      subjectDropdownOpen,
      topicDropdownOpen,
      gradeDropdownOpen,
      difficultyDropdownOpen,
    } = this.state;

    console.log("subjects", subjects);

    return (
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-[95%] h-[68.875rem] my-[2rem]">
          <div className="flex w-full flex-col gap-[3rem]">
            <div className="size-[5.688]">
              <img src={HumanMetaFigureSVG} alt="Human Meta Figure" />
            </div>
            <div className="font-[700] font-SFPro leading-[2.983rem] text-[2.5rem]">
              What's your Ideal Learning Style
            </div>
            <div className="text-[#6D6262] font-SFPro font-[500] text-[1.375rem] leading-[1.641rem]">
              We'll use this to personalize your learning journey
            </div>

            {/* Learning Method Buttons */}
            <div className="flex flex-col gap-[1.5em]">
              <div className="font-[600] font-geist text-[1.5rem]">
                Learning Method
              </div>
              <div className="flex gap-[2.125rem] font-[400] text-[1.25rem] font-SFPro leading-[1.492rem]">
                <button className="w-[10.125rem] h-[2.75rem] border-[#667085] border-[1px] rounded-[1.375rem]">
                  AI tutor
                </button>
                <button className="w-[10.125rem] h-[2.75rem] border-[#667085] border-[1px] rounded-[1.375rem]">
                  Reading Method
                </button>
                <button className="w-[10.125rem] h-[2.75rem] border-[#667085] border-[1px] rounded-[1.375rem]">
                  Hybrid Method
                </button>
              </div>
            </div>

            {/* Grade and Subject Dropdown */}
            <div className="flex gap-[5.313rem] w-full">
              <div className="flex flex-col w-[80%]">
                <div className="font-geist font-[600] text-[1.5rem] leading-[1.86rem]">
                  Grade
                </div>
                <div className="relative">
                  <div
                    className="flex w-full h-[3.875rem] bg-[#F6F6F6] items-center px-[2rem] text-[1.25rem] font-[400] font-SFPro leading-[1.492rem] justify-between cursor-pointer"
                    onClick={this.toggleGradeDropdown}
                  >
                    <div>{selectedGrade ? selectedGrade : "Select Grade"}</div>
                    <img
                      className="w-[1.25rem] h-[2.313rem]"
                      src={UpAndDownStuff}
                      alt="Dropdown"
                    />
                  </div>

                  {gradeDropdownOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-md z-10">
                      {this.placeholder.grade.map((grade) => (
                        <div
                          key={grade}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => this.setSelectedGrade(grade)}
                        >
                          {grade}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="flex flex-col w-[80%]">
                <div className="font-geist font-[600] text-[1.5rem] leading-[1.86rem]">
                  Subject
                </div>
                <div className="relative">
                  <div
                    className="flex w-full h-[3.875rem] bg-[#F6F6F6] items-center px-[2rem] text-[1.25rem] font-[400] font-SFPro leading-[1.492rem] justify-between cursor-pointer"
                    onClick={this.toggleSubjectDropdown}
                  >
                    <div>
                      {selectedSubject
                        ? selectedSubject.name
                        : "Select Subject"}
                    </div>
                    <img
                      className="w-[1.25rem] h-[2.313rem]"
                      src={UpAndDownStuff}
                      alt="Dropdown"
                    />
                  </div>

                  {subjectDropdownOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-md z-10">
                      {/* Check if subjects exists and has length */}
                      {Array.isArray(subjects) && subjects.length > 0 ? (
                        subjects.map((subject) => (
                          <div
                            key={subject.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => this.setSelectedSubject(subject)}
                          >
                            {subject.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2">No subjects available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Topic and Difficulty Dropdowns */}
            <div className="flex gap-[5.313rem]">
              <div className="flex flex-col w-[80%]">
                <div className="font-geist font-[600] text-[1.5rem] leading-[1.86rem]">
                  Topic
                </div>
                <div className="relative">
                  <div
                    className="flex w-full h-[3.875rem] bg-[#F6F6F6] items-center px-[2rem] text-[1.25rem] font-[400] font-SFPro leading-[1.492rem] justify-between cursor-pointer"
                    onClick={this.toggleTopicDropdown}
                  >
                    <div>
                      {selectedTopic ? selectedTopic.name : "Select Topic"}
                    </div>
                    <img
                      className="w-[1.25rem] h-[2.313rem]"
                      src={UpAndDownStuff}
                      alt="Dropdown"
                    />
                  </div>

                  {topicDropdownOpen &&
                  selectedSubject &&
                  selectedSubject.topics ? (
                    <div className="absolute top-full left-0 w-full bg-white shadow-md z-10">
                      {selectedSubject.topics.length > 0 ? (
                        selectedSubject.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => this.setSelectedTopic(topic)}
                          >
                            {topic.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2">No topics available</div>
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-2"></div>
                  )}
                </div>
              </div>

              {/* Difficulty Dropdown */}
              <div className="flex flex-col w-[80%]">
                <div className="font-geist font-[600] text-[1.5rem] leading-[1.86rem]">
                  Difficulty Level
                </div>
                <div className="relative">
                  <div
                    className="flex w-full h-[3.875rem] bg-[#F6F6F6] items-center px-[2rem] text-[1.25rem] font-[400] font-SFPro leading-[1.492rem] justify-between cursor-pointer"
                    onClick={this.toggleDifficultyDropdown}
                  >
                    <div>
                      {selectedDifficulty
                        ? `Level ${selectedDifficulty}`
                        : "Select Difficulty"}
                    </div>
                    <img
                      className="w-[1.25rem] h-[2.313rem]"
                      src={UpAndDownStuff}
                      alt="Dropdown"
                    />
                  </div>

                  {difficultyDropdownOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-md z-10">
                      {this.placeholder.difficulty.map((level) => (
                        <div
                          key={level}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => this.setSelectedDifficulty(level)}
                        >
                          Level {level}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={this.handleStartPersonalizedStudy}
              className="flex justify-center items-center w-full h-[4.25rem] bg-[#EB6C11] rounded-[0.688rem] text-[2rem] font-[700] font-geist text-white"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subjects: state.ai.subjects,
  personalStudyID: state.ai.personalStudyID,
});

const mapDispatchToProps = {
  FetchSelectionSubjectAndTopic,
  startPersonalizedStudy,
  generatePersonalizedNotes,
  flushAllAIStates,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(PersonalTutorModule)
);
