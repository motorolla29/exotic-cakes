import mongoose from 'mongoose';

const { Schema } = mongoose;

const merchSchema = new Schema(
  {
    id: String,
    title: String,
    images: { type: [Schema.Types.Mixed], default: [] },
    price: Number,
    options: {
      type: Map,
      of: [Schema.Types.Mixed],
    },
    variants: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  { timestamps: true, collection: 'merch' }
);

export default mongoose.models.Merch || mongoose.model('Merch', merchSchema);
