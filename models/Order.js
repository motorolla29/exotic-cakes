import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: {
    src: { type: String },
    hash: { type: String },
  },
  category: { type: String }, // для меню (категория)
  optionName: { type: String },
  option: { type: String },
  spongeVariant: { type: String },
  fillVariant: { type: String },
  cakeSign: { type: String },
  cartMessage: { type: String },
  merchVariants: { type: mongoose.Schema.Types.Mixed },
  stringParams: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    shipping: {
      method: { type: String },
      date: { type: Date },
      cost: { type: Number },
    },
    currency: { type: String, default: 'usd' },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'paid', 'failed', 'cancelled'],
    },
    paymentIntentId: { type: String },
    stripeSessionId: { type: String },
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    deliveryInfo: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String },
      line1: { type: String, required: true },
      line2: { type: String },
      coords: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
