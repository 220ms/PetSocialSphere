const { fifteenMinutesFromNow, thirtyDaysFromNow } = require("./date");

exports.REFRESH_PATH = "api/v1/auth/refresh";

const secure = process.env.NODE_ENV !== "development";
const defaults = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

exports.getAccessTokenCookieOptions = () => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

exports.getRefreshTokenCookieOptions = () => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});

exports.setAuthCookies = ({ res, accessToken, refreshToken }) => {
  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  return res;
};

exports.clearAuthCookies = (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken"); // No path specified
  return res;
};
