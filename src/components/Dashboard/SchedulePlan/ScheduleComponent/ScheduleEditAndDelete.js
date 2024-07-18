import React, { Component } from "react";
import EditIcon from "../../../../icons/edit-icon.png";
import { ReactComponent as DeleteSvg } from "../../../../svgs/Trash-bin.svg";
import PropTypes from "prop-types";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";

class ScheduleEditAndDelete extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
  };

  navigateToEdit = () => {
    const { navigate } = this.props;
    navigate("edit");
  };

  render() {
    return (
      <div className="flex flex-col w-[12.438rem] h-[6.5rem] items-center justify-evenly shadow-custom2">
        <div className="flex flex-col justify-between h-full gap-3 w-full">
          <button
            onClick={this.navigateToEdit}
            className="flex items-center bg-red-primary text-black font-medium 2xl:text-[2.25rem] gap-2 hover:bg-gray-100 w-full h-1/2"
          >
            <img
              src={EditIcon}
              alt="Edit Icon"
              className="size-[2rem]  ml-10"
            />
            <div className="text-[1.5rem] font-[500] ml-3">Edit</div>
          </button>
          <button className="flex items-center bg-red-primary text-black font-medium 2xl:text-[2.25rem] gap-2 hover:bg-gray-100 w-full h-1/2">
            <DeleteSvg className="size-[2rem]  ml-10" />
            <div className="text-[1.5rem] font-[500] ml-3">Delete</div>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouterHooks(ScheduleEditAndDelete);
