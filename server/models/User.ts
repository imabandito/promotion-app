import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    googleId?: string;
    facebookId?: string;
    name?: string;
    age?: number;
    lastName?: string;
    avatar?:string;
  }
  
  const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    name: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    age: { type: Number },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

  userSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  export default mongoose.model<IUser>('User', userSchema);
  