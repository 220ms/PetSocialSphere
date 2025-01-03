exports.oneYearFromNow = () => {
  return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
};

exports.thirtyDaysFromNow = () => {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
};

exports.fifteenMinutesFromNow = () => {
  return new Date(Date.now() + 15 * 60 * 1000);
};

exports.ONE_DAY_MS = 24 * 60 * 60 * 1000;

exports.fiveMinsAgo = () => new Date(Date.now() - 5 * 60 * 1000);

exports.oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);
