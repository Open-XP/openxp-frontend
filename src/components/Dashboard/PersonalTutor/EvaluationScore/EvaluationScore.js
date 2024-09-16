import React, { Component } from "react";
import StarSVG from "../../../../svgs/StarSVG.svg";
import SadFaceSVG from "../../../../svgs/SadFaceSVG.svg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { fetchSimulatedTestUserScore } from "../../../../Actions/AI";

class EvaluationScore extends Component {
  static propTypes = {
    simulatedTestScore: PropTypes.string.isRequired,
    fetchSimulatedTestUserScore: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchSimulatedTestUserScore(this.props.id);
  }

  handleRenderCommentAndIcon = (score) => {
    if (score < 50) {
      return {
        icon: SadFaceSVG,
        comment:
          "Don’t feel bad, you're trying your best. Check the report to see the questions you missed.",
      };
    } else {
      return {
        icon: StarSVG,
        comment: "Good job! Keep going and read more to improve even further.",
      };
    }
  };

  handleRedirectToAnswerAndExplanation = () => {
    const { id } = this.props;
    this.props.navigate(`/dashboard/evaluation-report/${id}`);
  };

  handleRedirectToHome = () => {
    this.props.navigate("/dashboard");
  };

  render() {
    const { simulatedTestScore } = this.props;
    const score = parseInt(simulatedTestScore, 10);
    const { icon, comment } = this.handleRenderCommentAndIcon(score);

    return (
      <div className="w-full h-full bg-[#00000033]/[20%] fixed flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[50vw] 2xl:h-[70vh] h-[50vh] bg-white">
          <div className="w-[90%] h-[85%] flex justify-center items-center flex-col gap-[1vw]">
            <div className="flex flex-col items-center">
              {/* Render the appropriate icon */}
              <img className="w-[10vw]" src={icon} alt="Evaluation Icon" />
              <div className="font-[700] text-[2.5vw] leading-[3vw] font-SFPro">
                Evaluation Score
              </div>
              <div className="font-[700] text-[5vw] font-SFPro leading-[7vw]">
                {score}%
              </div>
              {/* Render the corresponding comment */}
              <div className="font-[400] 2xl:text-[1vw] text-[1.5vw] leading-[2.5vw] text-[#7F7F7F] font-geist">
                {comment}
              </div>
            </div>
            <div className="flex w-full 2xl:h-[8vh] h-[6vh] justify-center gap-[2vw]">
              <button
                onClick={this.handleRedirectToAnswerAndExplanation}
                className="w-[30%] h-full rounded-[0.625rem] bg-purple-primary text-white text-[1.3vw]"
              >
                Evaluation Report
              </button>
              <button
                onClick={this.handleRedirectToHome}
                className="w-[30%] h-full rounded-[0.625rem] border-[1px] border-purple-primary text-[1.5vw]"
              >
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
  simulatedTestScore: state.ai.simulatedTestScore,
});

const mapDispatchToProps = { fetchSimulatedTestUserScore };

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(EvaluationScore)
);
