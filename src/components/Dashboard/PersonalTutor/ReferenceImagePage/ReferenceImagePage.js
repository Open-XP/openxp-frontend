import react, { Component } from "react";
import ReferenceImagePlaceholder from "../../../../icons/ExplanationImagePlaceholder.png";

class ReferenceImage extends Component {
  render() {
    return (
      <div className="flex w-full flex-col gap-[1rem]">
        <div className="text-[3rem] font-[700] font-SFPro leading-[3.58rem]">
          Reference Image
        </div>
        <div className="flex gap-[1rem] ">
          <img
            className="w-[47.875rem] h-[61.625rem] "
            src={ReferenceImagePlaceholder}
          />
          <img
            className="w-[47.875rem] h-[61.625rem]"
            src={ReferenceImagePlaceholder}
          />
        </div>
      </div>
    );
  }
}

export default ReferenceImage;
