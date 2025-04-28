import mongoose from 'mongoose';

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    id: String,
    category: String,
    title: String,
    description: String,
    images: { type: [Schema.Types.Mixed], default: [] },
    options: {
      type: Map,
      of: [Schema.Types.Mixed],
    },
    abilities: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model('Item', itemSchema);
