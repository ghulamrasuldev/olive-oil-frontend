export const dateFunction = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedCurrentDate = `${day}-${month}-${year}`;
  return formattedCurrentDate;
};

export const EmployeeDuration = (joiningDate) => {
  var currentDateJoin = new Date();
  var joinDate = new Date(joiningDate);

  var timeDifference = currentDateJoin - joinDate;

  var years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
  timeDifference -= years * (1000 * 60 * 60 * 24 * 365.25);

  var months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));
  timeDifference -= months * (1000 * 60 * 60 * 24 * 30.44);

  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return `${days}/${months}/${years}`;
};
