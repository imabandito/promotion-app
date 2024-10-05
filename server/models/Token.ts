import mongoose, { Schema, Document } from 'mongoose';

interface IToken extends Document {
    user: Schema.Types.ObjectId,
    refreshToken: string
  }
  
  const tokenSchema = new Schema<IToken>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: {type: String, required: true}
  });
  
  export default mongoose.model<IToken>('Token', tokenSchema);
  