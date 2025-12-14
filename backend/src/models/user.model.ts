import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  lastLogin?: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  verificationToken?: string;
  verificationTokenExpireAt?: Date;
  refreshToken?: string;
  refreshTokenExpire?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpireAt: {
      type: Date,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    refreshTokenExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ email: 1 });
export default mongoose.model<IUser>("User", userSchema);
