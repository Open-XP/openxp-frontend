import React, { Component } from "react";
import CheckCircleSVG from "../../../../svgs/CheckCircleSVG.svg";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PersonalizedLessonComplete extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    generatedTestID: PropTypes.string.isRequired,
  };

  redirectToEvaluation = () => {
    const { navigate, generatedTestID } = this.props;
    navigate(`/dashboard/evaluation/${generatedTestID}`);
  };

  render() {
    return (
      <div className="w-full h-full bg-[#00000033]/[20%] fixed flex justify-center items-center">
        <div className="flex flex-col justify-center items-center 2xl:h-[70vh] w-[50vw] h-[50vh] bg-white z-20">
          <div className="w-[90%] h-[80%] flex justify-center items-center flex-col gap-[2vw]">
            <div className="flex flex-col items-center">
              <img
                className="w-[10vw]"
                src={CheckCircleSVG}
                alt="Check Circle"
              />
              <div className="font-[700] text-[2.5vw] leading-[3vw] font-SFPro">
                Lessons Completed
              </div>
              <div className="font-[400] 2xl:text-[1vw] text-[1.5vw] leading-[2.5vw] text-[#7F7F7F] font-geist">
                Congratulations! You've successfully completed this Topic.
              </div>
            </div>
            <div className="flex w-full 2xl:h-[8vh] h-[6vh] justify-center gap-[2vw]">
              <button
                onClick={this.redirectToEvaluation}
                className="w-[30%] h-full rounded-[0.625rem] bg-purple-primary text-white text-[1.5vw]"
              >
                Take Evaluation
              </button>
              <button className="w-[30%] h-full rounded-[0.625rem] border-[1px] border-purple-primary text-[1.5vw]">
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  generatedTestID: state.ai.generatedTestID,
});

const mapDispatchToProps = {};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(PersonalizedLessonComplete)
);
