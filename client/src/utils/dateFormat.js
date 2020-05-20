const dateFormat = (date) => {
  if (date === null) return "Now";
  const newDate = new Date(date);

  return `${newDate.getFullYear()}/${
    newDate.getMonth() + 1
  }/${newDate.getDate()}`;
};

export default dateFormat;
