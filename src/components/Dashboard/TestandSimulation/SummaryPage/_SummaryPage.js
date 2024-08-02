import React, { useState, useEffect } from "react";
import ScoreGirl from "../../../../icons/scoregirl.png";
import ConfettiLeft from "../../../../icons/confetti-left.png";
import ConfettiRight from "../../../../icons/confetti-right.png";
import StarIcon from "../../../../icons/star.png";

const _SummaryPage = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(0), 2000),
      setTimeout(() => setStage(1), 3000),
      setTimeout(() => setStage(2), 4000),
      setTimeout(() => setStage(3), 5000),
      setTimeout(() => setStage(4), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const textOne = () => (
    <div className="font-[700] w-[50rem] h-fit inset-0 text-[6rem] font-manrope text-center left-0 right-0">
      Your Total Score
    </div>
  );

  const textTwo = () => (
    <div className="font-[500] text-[1.5rem] leading-[2.049rem] w-[26rem] h-[4.125rem] text-center">
      You are amazing. Check out the rest you failed to become more awesome.
    </div>
  );

  const frameOne = () => (
    <div className="inset-0 flex justify-center items-center ">
      <img className="size-[29.375rem]" src={ScoreGirl} alt="score" />
    </div>
  );

  const frameTwo = () => (
    <div className="flex justify-center items-center top-0 left-0 -z-20">
      <div className="w-[29.375rem] h-[29.375rem] rounded-full border-[#2D9CDB] border-[15px] flex justify-center items-center">
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
    <div className="inset-0 flex flex-col justify-center items-center">
      <div
        className="w-[29.375rem] h-[29.375rem] rounded-full border-[#34C759] border-[15px] flex justify-center items-center"
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
    <div className="flex flex-col justify-center items-center gap-5">
      <img className="w-[29.375rem] h-[32.375rem]" src={StarIcon} alt="star" />
    </div>
  );

  const buttonsFrame = () => (
    <div className="flex flex-col justify-center items-center gap-5">
      <button className="w-[17.188rem] h-[5.125rem] rounded-[7px] bg-[#34C759] font-[700] text-[1.5rem] text-white hover:bg-[#2E9C4E]">
        Go to explanation
      </button>
      <button className="w-[17.188rem] h-[5.125rem] rounded-[7px] bg-[#2D9CDB1C] font-[700] text-[1.5rem] hover:bg-slate-600">
        Skip
      </button>
    </div>
  );

  const framFive = () => {
    <div className="text-[20rem]">where AM I</div>;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-[2rem]">
      {stage === 0 && (
        <div className="flex flex-col justify-center items-center gap-3">
          {textOne()}
          <div className="animate-bounceInTop">{frameOne()}</div>
          {textTwo()}
        </div>
      )}

      {stage === 1 && (
        <div className="flex flex-col justify-center items-center gap-3">
          {textOne()}
          <div className="animate-scaleUpCenter">{frameTwo()}</div>
          {textTwo()}
        </div>
      )}

      {stage === 2 && (
        <div className="flex flex-col justify-center items-center gap-3">
          {textOne()}
          <div className="">{frameThree()}</div>
          {textTwo()}
        </div>
      )}

      {stage === 3 && (
        <div className="flex flex-col justify-center items-center gap-3">
          <div className=" animate-bounceInTop">{frameFour()}</div>
          <div>{buttonsFrame()}</div>
          <div>{textTwo()}</div>
        </div>
      )}

      {stage === 4 && (
        <div className="flex flex-col justify-center items-center gap-3">
          <div>{textTwo()}</div>
          <div>{frameFour()}</div>
          <div>{buttonsFrame()}</div>
        </div>
      )}
    </div>
  );
};

export default _SummaryPage;
