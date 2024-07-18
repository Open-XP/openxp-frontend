import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  assignColor,
  daysLeft,
  formatDate,
} from "../../../../Utils/AutoStyling";

class Schedule extends Component {
  state = {
    upcomingExams: [
      {
        id: 1,
        name: "Mathematics",
        date: "2024-07-25",
        exam: "waec",
      },
      {
        id: 2,
        name: "Physics",
        date: "2024-09-25",
        exam: "waec",
      },
      {
        id: 3,
        name: "Chemistry",
        date: "2024-07-15",
        exam: "waec",
      },
    ],
    loading: true,
  };

  render() {
    const { upcomingExams, loading } = this.state;

    const sortedExams = [...upcomingExams].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const recentExams = sortedExams.slice(0, 2);

    if (upcomingExams.length === 0) {
      return (
        <div className="flex flex-col gap-4 pt-4 pl-[3rem]">
          <div className="font-[700] text-[1.5rem] leading-[2.043rem]">
            Upcoming Exams
          </div>
          <div className="flex flex-wrap w-[33rem] h-[5.813rem] items-center justify-evenly border-2 rounded">
            <div className="w-[22rem] h-[2.063rem] font-[700] text-[1.5rem]">
              You have no exam scheduled
            </div>
            <button className="flex items-center justify-center w-[3.438rem] h-[2.5rem] bg-purple-primary">
              <PlusIcon className="text-white" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 pt-4 pl-[3rem]">
        <div className="flex justify-between w-[87%] 2xl:w-[47rem]">
          <div className="font-[700] text-[1.5rem] leading-[2.043rem]">
            Upcoming Exams
          </div>
          <div className="font-[400] text-[1.5rem] leading-[2.043rem]">
            <Link className="text-purple-primary">View all</Link>
          </div>
        </div>
        <div className="flex 2xl:flex-row flex-col gap-4">
          {recentExams.map((exam) => (
            <div
              className="flex 2xl:w-[22.938rem] w-[54rem] 2xl:h-[5.813rem] h-[10rem]"
              key={exam.id}
            >
              <div
                className={`flex justify-center items-center text-white flex-wrap w-[10rem] 2xl:w-[6.813rem] 2xl:h-[5.813rem] h-[100%] rounded-l font-[700] text-[1.5rem] leading-[2.043rem] ${assignColor(
                  exam.date
                )}`}
              >
                <div className="w-[2.813rem] h-[4.125rem]">
                  {formatDate(exam.date)}
                </div>
              </div>
              <div className="flex flex-col justify-evenly w-[100%] leading-[1.362rem] text-[1rem] border-t-2 border-r-2 border-b-2 rounded-r-[0.5rem] pl-4 relative">
                <div>{exam.name}</div>
                <div className="font-[700]">{exam.exam}</div>
                <div
                  className={`flex w-fit px-2 rounded-[1.688rem] text-white absolute right-4 bottom-4 ${assignColor(
                    exam.date
                  )}`}
                >
                  {daysLeft(exam.date) === 0
                    ? "Today"
                    : daysLeft(exam.date) === 1
                    ? "Tomorrow"
                    : `${daysLeft(exam.date)} days left`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Schedule;
