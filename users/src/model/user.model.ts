import { Model, model, Document, Schema } from 'mongoose';

export interface IUser extends Document {
  accountType: string;
  IDNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  alternatePhone: string;
  DOB: Date | string;
  age: number;
  gender: string;
  nationality: string;
  origin: string;
  languages: string[];
  picture: string;
  summary: string;
  occupation: string;
  address: {
    street: string;
    city: string;
    LGA: string;
    state: string;
    zipCode: string;
  }[];
  education: {
    institution: string;
    degree: string;
    grade: string;
    gradYear: string;
  }[];
  openTo: string[];
  averageRating: number;
  metaData: {
    verificationCode: string;
    isActive: boolean;
    isOnline: boolean;
    lastOnline: Date;
  };
}

const userSchema = new Schema<IUser>(
  {
    accountType: {
      type: String,
      trim: true,
      enum: ['hunter', 'agent', 'landlord'],
      lowercase: true,
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    middleName: { type: String, trim: true },
    fullName: { type: String, trim: true },
    email: { type: String, trim: true, unique: true, lowercase: true },
    password: { type: String, trim: true, minlength: 8 },
    phone: { type: String, trim: true },
    alternatePhone: { type: String, trim: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      trim: true,
      lowercase: true,
    },
    DOB: { type: Date, trim: true },
    age: { type: Number, trim: true },
    origin: { type: String, trim: true },
    nationality: { type: String, trim: true },
    languages: [{ type: String, trim: true }],
    picture: { type: String, trim: true },
    summary: { type: String, trim: true },
    occupation: { type: String, trim: true },
    address: [
      {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        LGA: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
      },
    ],
    openTo: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    averageRating: { type: Number, default: 0 },
    metaData: {
      verificationCode: { type: String },
      isActive: { type: Boolean, default: false },
      lastOnline: { type: Date },
    },
  },
  { timestamps: true },
);

export const User: Model<IUser> = model<IUser>('User', userSchema);
