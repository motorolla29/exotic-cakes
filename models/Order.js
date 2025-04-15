import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['menu', 'merch'], required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: {
    src: String,
    hash: String,
  },
  category: String, // для меню
  optionName: String,
  option: String,
  spongeVariant: String,
  fillVariant: String,
  cakeSign: String,
  cartMessage: String,
  merchVariants: mongoose.Schema.Types.Mixed, // объект с вариантами
  stringParams: String, // чтобы потом можно было восстановить ссылки
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: { type: String, default: 'pending' }, // 'pending', 'paid', 'failed', 'cancelled'
    paymentIntentId: String,
    stripeSessionId: String,
    createdAt: { type: Date, default: Date.now },
    customerInfo: {
      name: String,
      email: String,
      phone: String,
      address: {
        country: String,
        city: String,
        postalCode: String,
        line1: String,
        line2: String,
      },
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
