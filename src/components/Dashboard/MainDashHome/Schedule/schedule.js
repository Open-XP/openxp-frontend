import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/20/solid";

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

  assignColor = (examDate) => {
    const currentTime = new Date();
    const examTime = new Date(examDate);
    const timeDiff = examTime - currentTime;
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (dayDiff <= 7) {
      return "bg-red-500";
    } else if (dayDiff <= 30) {
      return "bg-blue-500";
    } else {
      return "bg-green-500";
    }
  };

  daysLeft = (examDate) => {
    const currentTime = new Date();
    const examTime = new Date(examDate);

    // Set the time of both dates to the beginning of the day for accurate difference calculation
    currentTime.setHours(0, 0, 0, 0);
    examTime.setHours(0, 0, 0, 0);

    const timeDiff = examTime - currentTime;
    const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    return dayDiff;
  };

  formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  render() {
    const { upcomingExams, loading } = this.state;

    // Sort the exams by date
    const sortedExams = [...upcomingExams].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Get the two most current exams
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
        <div className="flex justify-between w-[89%] 2xl:w-[39.5rem]">
          <div className="font-[700] text-[1.5rem] leading-[2.043rem]">
            Upcoming Exams
          </div>
          <div className="font-[400] text-[1.5rem] leading-[2.043rem]">
            <Link className="text-purple-primary">View all</Link>
          </div>
        </div>
        <div className="flex gap-4">
          {recentExams.map((exam) => (
            <div className="flex w-[18.938rem] h-[5.813rem]" key={exam.id}>
              <div
                className={`flex justify-center items-center text-white flex-wrap w-[6.813rem] h-[5.813rem] rounded-l font-[700] text-[1.5rem] leading-[2.043rem] ${this.assignColor(
                  exam.date
                )}`}
              >
                <div className="w-[2.813rem] h-[4.125rem]">
                  {this.formatDate(exam.date)}
                </div>
              </div>
              <div className="flex flex-col justify-evenly w-[100%] leading-[1.362rem] text-[1rem] border-t-2 border-r-2 border-b-2 rounded-r-[0.5rem] pl-4 relative">
                <div>{exam.name}</div>
                <div className="font-[700]">{exam.exam}</div>
                <div
                  className={`flex w-fit px-2 rounded-[1.688rem] text-white absolute right-4 bottom-4 ${this.assignColor(
                    exam.date
                  )}`}
                >
                  {this.daysLeft(exam.date) === 0
                    ? "Today"
                    : this.daysLeft(exam.date) === 1
                    ? "Tomorrow"
                    : `${this.daysLeft(exam.date)} days left`}
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
