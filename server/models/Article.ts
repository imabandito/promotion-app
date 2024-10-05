import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
    category: Schema.Types.ObjectId;
    date: Date;
    title: string;
    text: string;
    author: Schema.Types.ObjectId,
    image: string;
  }
  
  const articleSchema = new Schema<IArticle>({
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    date: { type: Date },
    title: { type: String },
    text: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    image: { type: String}
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  articleSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  export default mongoose.model<IArticle>('Article', articleSchema);
  