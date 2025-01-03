const zod = require("zod");
exports.emailSchema = zod.string().email().min(1).max(255);
exports.passwordSchema = zod.string().min(6).max(255);
exports.signupSchema = zod.object({
  fname: zod.string().min(2).max(50),
  sname: zod.string().min(2).max(50),
  email: zod.string().email(),
  password: zod.string().min(8).max(50),
  passwordConfirm: zod.string().min(8).max(50),
  userAgent: zod.string().optional(),
});

exports.loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8).max(50),
  userAgent: zod.string().optional(),
});
const verificationCodeSchema = zod.string().min(1).max(24);
exports.verificationCodeSchema = zod.string().min(1).max(24);

exports.resetPasswordSchema = zod.object({
  password: zod.string().min(8).max(50),
  verificationCode: verificationCodeSchema,
});
