import React, { useState, useEffect } from "react";
import ScoreGirl from "../../../../icons/scoregirl.png";
import ConfettiLeft from "../../../../icons/confetti-left.png";
import ConfettiRight from "../../../../icons/confetti-right.png";
import StarIcon from "../../../../icons/star.png";

const _SummaryPage = () => {
  const [showFrameOne, setShowFrameOne] = useState(true);
  const [animationClass, setAnimationClass] = useState("");

  const textOne = () => (
    <div className="font-[700] text-[6rem] font-manropes relative -top-[20rem]">
      Your Total Score
    </div>
  );

  const textTwo = () => (
    <div className="font-[500] text-[1.5rem] leading-[2.049rem] relative top-[16rem] w-[26rem] h-[4.125rem] text-center">
      You are amazing. Check out the rest you failed to become more awesome.
    </div>
  );

  const frameOne = () => (
    <div
      className={`absolute inset-0 flex flex-col justify-center items-center ${animationClass}`}
    >
      <img
        className="w-[29.375rem] h-[29.375rem]"
        src={ScoreGirl}
        alt="score"
      />
    </div>
  );

  const frameTwo = () => (
    <div
      className={`absolute inset-0 flex flex-col justify-center items-center ${animationClass}`}
    >
      <div
        className="w-[29.375rem] h-[29.375rem] rounded-[50%] border-[#2D9CDB] border-[15px] flex justify-center items-center relative top-[2rem]"
        alt="score"
      >
        <div>
          <div className="font-[700] text-[8rem] text-center leading-[8.171rem] text-[#34C759] font-sans">
            85
          </div>
          <div className="font-[600] text-[2.5rem] leading-[3.404rem] font-sans">
            OF 100
          </div>
        </div>
      </div>
    </div>
  );

  const frameThree = () => (
    <div
      className={`absolute inset-0 flex flex-col justify-center items-center ${animationClass}`}
    >
      <div
        className="w-[29.375rem] h-[29.375rem] rounded-[50%] border-[#34C759] border-[15px] flex justify-center items-center relative top-[2rem]"
        alt="score"
      >
        <div>
          <div className="font-[700] text-[8rem] text-center leading-[8.171rem] text-[#34C759] font-sans">
            85
          </div>
          <div className="font-[600] text-[2.5rem] leading-[3.404rem] font-sans">
            OF 100
          </div>
        </div>
      </div>
      <div className="font-[500] text-[1.5rem] leading-[2.049rem] relative top-[4rem] w-[26rem] h-[4.125rem] text-center">
        You are amazing. Check out the rest you failed to become more awesome.
      </div>
    </div>
  );

  const Confetti = () => (
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

  const frameFour = () => (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <img className="w-[19.938rem] h-[23.563rem]" src={StarIcon} alt="star" />
      <button className="w-[17.188rem] h-[5.125rem] rounded-[7px] bg-[#34C759] font-[700] text-[1.5rem] text-white hover:bg-[#2E9C4E]">
        Go to explanation
      </button>

      <button className="w-[17.188rem] h-[5.125rem] rounded-[7px] bg-[#2D9CDB1C] font-[700] text-[1.5rem]">
        Skip
      </button>
    </div>
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
      {textOne()}
      {Confetti()}
      {frameFour()}
      {textTwo()}
    </div>
  );
};

export default _SummaryPage;
