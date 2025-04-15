const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { orderData } = req.body;
    // Создайте сессию Stripe с нужными параметрами. Пример:
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: orderData.items.map((item) => ({
        price_data: {
          currency: 'rub',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // сумма в копейках
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/cancel`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Ошибка создания сессии:', error);
    res.status(500).json({ error: error.message });
  }
};
