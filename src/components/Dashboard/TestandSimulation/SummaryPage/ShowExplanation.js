import React, { Component } from "react";
import OpenxpSVG from "../../../../svgs/openxp.js";
import Spinner from "../../../../icons/Spinner.png";

class ShowExplanation extends Component {
  render() {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-[80%] flex flex-col gap-[4rem]">
          <div className="flex gap-1 mt-[3.75rem]">
            <OpenxpSVG className=" size-[2rem] text-purple-primary" />
            <div className="font-[700] text-[1.25rem]">openxp</div>
          </div>
          <div className="flex flex-col gap-[0.1rem]">
            <div className="text-[#EA4335] font-manropes font-[700] text-[4rem] ">
              Corrections
            </div>
            <div className="flex flex-col gap-[0.75rem]">
              <div className="flex flex-wrap font-[600] font-manropes text-[2rem] leading-[2.169rem]">
                1.If the sum of the interior angles of a polygon is 1080°, how
                many sides does the polygon have?
              </div>
              <div className="w-[19.813rem] h-[3.375rem] bg-[#217A531A]/10 flex justify-center items-center font-[700] font-manropes text-[2rem] leading-[2.169rem] text-[#34C759] rounded-[0.313rem]">
                Correct Answer(D)
              </div>
              <div className="">
                <div className="flex flex-wrap font-[500] font-manropes text-[1.5rem] leading-[2.169rem]">
                  The correct answer is 8 sides because the formula for the sum
                  of the interior angles of a polygon is given by (n−2)×180°(n -
                  2) ÷ n times 180°(n−2)×180°, where nnn is the number of sides.
                  Given that the sum of the interior angles is 1080°, we can set
                  up the equation:
                </div>
                <div className="flex flex-wrap font-[600] font-manropes text-[1.5rem] leading-[2.169rem]">
                  Step 1: Solving for n;
                </div>
                <div className="flex flex-wrap font-[500] font-manropes text-[1.5rem] leading-[2.169rem]">
                  (n−2)×180°=1080°(n - 2) ÷ n
                </div>
                <div className="flex flex-wrap font-[600] font-manropes text-[1.5rem] leading-[2.169rem]">
                  Step 2: Using Bodmas
                </div>
                <div className="flex flex-wrap font-[500] font-manropes text-[1.5rem] leading-[2.169rem]">
                  n−2=180°/1080°​
                </div>
                <div className="flex flex-wrap font-[500] font-manropes text-[1.5rem] leading-[2.169rem]">
                  n−2=6, n=6+2
                </div>
                <div className="flex flex-wrap font-[600] font-manropes text-[1.5rem] leading-[2.169rem]">
                  Step 3: Final Answer
                </div>
                <div className="flex flex-wrap font-[500] font-manropes text-[1.5rem] leading-[2.169rem]">
                  n=8
                </div>
              </div>
              <div className="w-[16.875rem] h-[4rem] flex justify-center items-center font-manropes font-[400] text-[2rem] leading-[2.169rem] text-[#00000073]/45">
                View Explanation
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowExplanation;
