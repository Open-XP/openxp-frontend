// Function to assign color based on the exam date
export const assignColor = (examDate) => {
  const currentTime = new Date();
  const examTime = new Date(examDate);
  const timeDiff = examTime - currentTime;
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  if (dayDiff <= 7) {
    return "bg-[#EA4335]";
  } else if (dayDiff <= 30) {
    return "bg-skyblue-secondary";
  } else {
    return "bg-[#217A53]";
  }
};

// Function to calculate days left until the exam date
export const daysLeft = (examDate) => {
  const currentTime = new Date();
  const examTime = new Date(examDate);

  currentTime.setHours(0, 0, 0, 0);
  examTime.setHours(0, 0, 0, 0);

  const timeDiff = examTime - currentTime;
  const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

  return dayDiff;
};

// Function to format a date string into a more readable format
export const formatDate = (dateString) => {
  const options = { month: "short", day: "numeric" };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
