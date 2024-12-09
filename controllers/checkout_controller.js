const Order = require('../models/order_model');

const createOrder = async (req, res) => {
  try {
    const { user, items, totalPrice } = req.body;

    if (!user || !items || !totalPrice) {
      return res.status(400).json({ message: 'User, items, and total price are required.' });
    }

    if (!user.name || !user.email || !user.address || !user.phone) {
      return res.status(400).json({ message: 'Complete user details are required.' });
    }

    const updatedItems = items.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));

    const newOrder = new Order({
      user,
      items: updatedItems,
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully.', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  createOrder,
};
