import react, { Component } from "react";

class ExplainFurtherPage extends Component {
  render() {
    return (
      <div className="flex flex-col gap-[1rem]">
        <div className="text-[3rem] font-[700] font-SFPro leading-[3.58rem]">
          Simple Explanation
        </div>
        <div className="text-[2rem] font-[400] font-SFPro leading-[2.387rem]">
          Imagine a dynamic scene where a runner is sprinting along a track. The
          runner's body is slightly blurred to emphasize the speed and movement,
          with motion lines trailing behind to further illustrate the fast
          motion. The background shows a track with marked lanes and a blurred
          audience, creating a sense of rapid movement. The runner's limbs are
          extended in mid-stride, with one foot barely touching the ground,
          capturing the essence of motion and energy.
        </div>
        <div className="text-[2rem] font-[400] font-SFPro leading-[2.387rem]">
          Motion is the change in position of an object over time relative to a
          reference point. It involves the object's movement from one place to
          another and can be described in terms of speed, direction, velocity,
          and acceleration. Motion can occur in different forms, such as linear,
          rotational, or oscillatory motion. It can be uniform, with constant
          speed and direction, or non-uniform, where the speed or direction
          changes.
        </div>
      </div>
    );
  }
}

export default ExplainFurtherPage;
