import React, { Component } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import WriteIcon from "../../../../icons/write-icon.png";
import PropTypes from "prop-types";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { connect } from "react-redux";
import {
  fetchAllSchedules,
  createSchedule,
  updateSchedule,
  fetchIndividualSchedule,
} from "../../../../Actions/Schedule";

class AddSchedule extends Component {
  state = {
    isDescriptionFocused: false,
    description: "",
    subject: "",
    exam_type: "",
    date: "",
    time: "",
    id: null,
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    schedules: PropTypes.array.isRequired,
    schedule: PropTypes.object.isRequired,
    fetchAllSchedules: PropTypes.func.isRequired,
    createSchedule: PropTypes.func.isRequired,
    updateSchedule: PropTypes.func.isRequired,
    fetchIndividualSchedule: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchIndividualSchedule, location } = this.props;
    const pathParts = location.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    this.setState({ id });

    if (location.pathname === `/dashboard/schedule-plan/edit/${id}`) {
      fetchIndividualSchedule(id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.schedule !== prevProps.schedule) {
      const { subject, exam_type, date, time, description } =
        this.props.schedule;
      this.setState({
        subject,
        exam_type,
        date,
        time,
        description,
      });
    }
  }

  handleCreateOrUpdate = (e) => {
    e.preventDefault();
    const { location, updateSchedule, createSchedule, navigate } = this.props;
    const { subject, exam_type, date, time, description } = this.state;
    const pathParts = location.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    console.log({ id, subject, exam_type, date, time, description });

    const scheduleData = {
      subject: subject,
      exam_type: exam_type,
      date: date,
      time: time,
      description: description,
    };

    if (location.pathname === `/dashboard/schedule-plan/edit/${id}`) {
      updateSchedule(id, subject, exam_type, date, time, description);
    } else if (location.pathname === `/dashboard/schedule-plan/create`) {
      createSchedule(subject, exam_type, date, time, description);
      navigate("/dashboard/schedule-plan");
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  ReturnToSchedule = () => {
    this.props.navigate("/dashboard/schedule-plan");
  };

  handleDescriptionFocus = () => {
    this.setState({ isDescriptionFocused: true });
  };

  handleDescriptionBlur = () => {
    if ((this.state.description || "").trim() === "") {
      this.setState({ isDescriptionFocused: false });
    }
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    const {
      isDescriptionFocused,
      description,
      subject,
      exam_type,
      date,
      time,
    } = this.state;

    const { location } = this.props;
    const HeaderText =
      location.pathname === `/dashboard/schedule-plan/create`
        ? "Add Schedule"
        : "Edit Schedule";

    const SaveOrUpdate =
      location.pathname === "/dashboard/schedule-plan/create"
        ? "Save"
        : "Update";

    return (
      <div className="flex flex-col w-[95%] font-inter my-4 gap-[3rem] p-8">
        <div className="flex gap-4 items-center">
          <button onClick={this.ReturnToSchedule}>
            <div className="size-[3.5rem]">
              <ArrowLeftIcon />
            </div>
          </button>
          <div className="flex justify-center items-center font-[700] text-[2rem] 2xl:text-[3.375rem]">
            {HeaderText}
          </div>
        </div>
        <div>
          <div className="font-[400] text-[1.5rem]">Subject</div>
          <input
            className="w-full h-[4rem] border-2 rounded-[0.875rem] text-[1.5rem]"
            type="text"
            placeholder=""
            value={subject}
            onChange={this.onChange}
            name="subject"
          />
        </div>
        <div>
          <div className="font-[400] text-[1.5rem]">Exam Type</div>
          <input
            className="w-full h-[4.5rem] text-[1.5rem] rounded-[0.875rem]"
            type="text"
            placeholder=""
            value={exam_type}
            onChange={this.onChange}
            name="exam_type"
          />
        </div>
        <div className="flex gap-[2rem] items-center">
          <div>
            <div>Date</div>
            <input
              className="w-[15.125rem] h-[3.813rem] text-[1.5rem] border-2 rounded-[3.813rem]"
              type="date"
              onChange={this.onChange}
              value={date}
              name="date"
            />
          </div>
          <div className="flex w-[4rem] h-[2rem] items-center mt-[1.8rem]">
            <ArrowLongRightIcon />
          </div>
          <div>
            <div>Time</div>
            <input
              className="w-[12.125rem] h-[3.813rem] text-[1.5rem] border-2 rounded-[3.813rem]"
              type="time"
              onChange={this.onChange}
              value={time}
              name="time"
            />
          </div>
        </div>
        <div className="flex relative">
          {!isDescriptionFocused && (description || "").trim() === "" && (
            <div className="flex items-center absolute p-[1rem] gap-2 -z-10">
              <img
                className="w-[2rem] h-[2rem]"
                src={WriteIcon}
                alt="Write Icon"
              />
              <div className="font-[400] text-[1.5rem]">Add Description</div>
            </div>
          )}
          <textarea
            className="w-full h-[10rem] border-2 rounded-[0.875rem] p-[1rem]"
            placeholder=""
            onFocus={this.handleDescriptionFocus}
            onBlur={this.handleDescriptionBlur}
            onChange={this.handleDescriptionChange}
            value={description}
            name="description"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex justify-center items-center w-[13.375rem] h-[3.438rem] bg-purple-primary rounded-[0.438rem] text-white font-[600] text-lg 2xl:text-[2.25rem] leading-[2.043rem]"
            onClick={this.handleCreateOrUpdate}
          >
            <div>{SaveOrUpdate}</div>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schedules: state.scheduleexam.schedules,
  schedule: state.scheduleexam.schedule,
});

const mapDispatchToProps = {
  createSchedule,
  fetchAllSchedules,
  updateSchedule,
  fetchIndividualSchedule,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(AddSchedule)
);
