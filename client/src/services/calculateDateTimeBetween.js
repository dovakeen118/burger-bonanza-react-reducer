const calculateDateTimeBetween = (startDate, endDate = new Date()) => {
  const createdDate = new Date(startDate);
  const finalDate = new Date(endDate);
  const diffTime = finalDate.getTime() - createdDate.getTime();

  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diffTime % (1000 * 60)) / 1000);

  return { days, hours, mins, secs };
};

export default calculateDateTimeBetween;
