import React, { Component } from "react";
import ScoreGirl from "../../../../icons/scoregirl.png";
import ConfettiLeft from "../../../../icons/confetti-left.png";
import ConfettiRight from "../../../../icons/confetti-right.png";
import StarIcon from "../../../../icons/star.png";
import PropTypes from "prop-types";
import { fetchUserScore } from "../../../../Actions/Quiz";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { connect } from "react-redux";

class _SummaryPage extends Component {
  static propTypes = {
    userScores: PropTypes.object.isRequired,
    completedTestResponse: PropTypes.object.isRequired,
    fetchUserScore: PropTypes.func.isRequired,
    testInstances: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.clearTimers();
  }

  initializeTimers = () => {
    this.timers = [
      setTimeout(() => this.setStage(0), 2000),
      setTimeout(() => this.setStage(1), 3000),
      setTimeout(() => this.setStage(2), 4000),
      setTimeout(() => this.setStage(3), 5000),
      setTimeout(() => this.setStage(4), 6000),
    ];
  };

  clearTimers = () => {
    if (this.timers) {
      this.timers.forEach(clearTimeout);
    }
  };

  fetchData = () => {
    const { fetchUserScore, testInstances, completedTestResponse } = this.props;
    if (completedTestResponse) {
      this.setState({ loading: true }, () => {
        fetchUserScore(testInstances.id).finally(() => {
          this.setState({ loading: false }, this.initializeTimers);
        });
      });
    }
  };

  setStage = (stage) => {
    this.setState({ stage });
  };

  redirectToExplanation = () => {
    this.props.navigate("/dashboard/explanation");
  };

  textOne = () => (
    <div className="font-[700] w-[50rem] h-fit inset-0 text-[6rem] font-manrope text-center left-0 right-0">
      Your Total Score
    </div>
  );

  textTwo = () => (
    <div className="font-[500] text-[1.5rem] leading-[2.049rem] w-[26rem] h-[4.125rem] text-center">
      You are amazing. Check out the rest you failed to become more awesome.
    </div>
  );

  frameOne = () => (
    <div className="inset-0 flex justify-center items-center ">
      <img className="size-[29.375rem]" src={ScoreGirl} alt="score" />
    </div>
  );

  frameTwo = () => (
    <div className="flex justify-center items-center top-0 left-0 -z-20">
      <div className="w-[29.375rem] h-[29.375rem] rounded-full border-[#2D9CDB] border-[15px] flex justify-center items-center">
        <div>
          <div className="font-[700] text-[8rem] text-center leading-[8.171rem] text-[#34C759] font-sans">
            {this.props.userScores.correct_questions.length}
          </div>
          <div className="font-[600] text-[2.5rem] leading-[3.404rem] font-sans">
            OF {this.props.userScores.total_questions}
          </div>
        </div>
      </div>
    </div>
  );

  frameThree = () => (
    <div className="inset-0 flex flex-col justify-center items-center">
      <div
        className="w-[29.375rem] h-[29.375rem] rounded-full border-[#34C759] border-[15px] flex justify-center items-center"
        alt="score"
      >
        <div>
          <div className="font-[700] text-[8rem] text-center leading-[8.171rem] text-[#34C759] font-sans">
            {this.props.userScores.correct_questions.length}
          </div>
          <div className="font-[600] text-[2.5rem] leading-[3.404rem] font-sans">
            OF {this.props.userScores.total_questions}
          </div>
        </div>
      </div>
    </div>
  );

  Confetti = () => (
    <div className="absolute inset-0 flex justify-center items-center">
      <img
        className="w-1/2 h-screen absolute left-0 -z-20"
        src={ConfettiLeft}
        alt="confetti"
      />
      <img
        className="w-[40%] h-screen absolute right-0 -z-20"
        src={ConfettiRight}
        alt="confetti"
      />
    </div>
  );

  frameFour = () => (
    <div className="flex flex-col justify-center items-center gap-5">
      <img className="w-[29.375rem] h-[32.375rem]" src={StarIcon} alt="star" />
    </div>
  );

  buttonsFrame = () => (
    <div className="flex flex-col justify-center items-center gap-5">
      <button
        onClick={this.redirectToExplanation}
        className="w-[17.188rem] h-[5.125rem] rounded-[7px] bg-[#34C759] font-[700] text-[1.5rem] text-white hover:bg-[#2E9C4E]"
      >
        Go to explanation
      </button>
      <button className="w-[17.188rem] h-[5.125rem] rounded-[7px] bg-[#2D9CDB1C] font-[700] text-[1.5rem] hover:bg-slate-600">
        Skip
      </button>
    </div>
  );

  framFive = () => <div className="text-[20rem]">where AM I</div>;

  render() {
    const { stage, loading } = this.state;
    const { userScores } = this.props;

    if (loading) {
      return <div>Loading questions...</div>;
    }

    return (
      <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-[2rem]">
        {stage === 0 && (
          <div className="flex flex-col justify-center items-center gap-3">
            {this.textOne()}
            <div className="animate-bounceInTop">{this.frameOne()}</div>
            {this.textTwo()}
          </div>
        )}

        {stage === 1 && (
          <div className="flex flex-col justify-center items-center gap-3">
            {this.textOne()}
            <div className="animate-scaleUpCenter">{this.frameTwo()}</div>
            {this.textTwo()}
          </div>
        )}

        {stage === 2 && (
          <div className="flex flex-col justify-center items-center gap-3">
            {this.textOne()}
            <div className="">{this.frameThree()}</div>
            {this.textTwo()}
          </div>
        )}

        {stage === 3 && (
          <div className="flex flex-col justify-center items-center gap-3">
            <div className=" animate-bounceInTop">{this.frameFour()}</div>
            <div>{this.buttonsFrame()}</div>
            <div>{this.textTwo()}</div>
          </div>
        )}

        {stage === 4 && (
          <div className="flex flex-col justify-center items-center gap-3">
            <div>{this.textTwo()}</div>
            <div>{this.frameFour()}</div>
            <div>{this.buttonsFrame()}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  testInstances: state.quiz.testInstances,
  completedTestResponse: state.quiz.completedTestResponse,
  userScores: state.quiz.userScores,
});

const mapDispatchToProps = {
  fetchUserScore,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(_SummaryPage)
);
