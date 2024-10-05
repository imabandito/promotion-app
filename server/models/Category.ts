import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
    name: string
  }
  
  const categorySchema = new Schema<ICategory>({
    name: { type: String, unique: true }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

  categorySchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  export default mongoose.model<ICategory>('Category', categorySchema);
  