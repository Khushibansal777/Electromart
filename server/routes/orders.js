// server/routes/orders.js
import express from 'express';
import auth from '../middleware/auth.js';
import {
  placeOrder,
  listOrders,
  confirmOrder
} from '../controllers/order.js';

const router = express.Router();

// User places an order
router.post(
  '/',
  auth,
  placeOrder
);

// Admin sees all orders
router.get(
  '/',
  auth,
  (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin only' });
    }
    next();
  },
  listOrders
);

// Admin confirms an order
router.patch(
  '/:id',
  auth,
  (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin only' });
    }
    next();
  },
  confirmOrder
);

export default router;