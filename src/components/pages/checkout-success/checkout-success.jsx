import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function CheckoutSuccess() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order-status?orderId=${orderId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch order');

        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
    else {
      setError('Order ID not found in URL');
      setLoading(false);
    }
  }, [orderId]);

  if (loading) return <p>Loading your order...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your order, {order.customerInfo.name}.</p>
      <p>
        Your order <strong>#{order._id}</strong> has been placed and
        successfully paid.
      </p>

      <div>
        <h2>Order Summary</h2>
        <ul>
          {order.items.map((item, i) => (
            <li key={i}>
              {item.title} x {item.quantity} — £{item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Shipping: £{order.shipping.cost.toFixed(2)}</p>
        <p>Total: £{order.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
