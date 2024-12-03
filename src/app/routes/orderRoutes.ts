import express, { Request, Response } from 'express';
import Order from '../models/order';
import Bike from '../models/bike';

const router = express.Router();

// Create an order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, product, quantity } = req.body;

    // Find the bike in the database
    const bike = await Bike.findById(product);

    if (!bike) {
      // If the bike doesn't exist in the database
      return res.status(404).json({ message: 'Bike not found', success: false });
    }

    if (bike.quantity < quantity) {
      // If there's insufficient stock
       res.status(400).json({
        message: 'Insufficient stock',
        success: false,
        error: 'Not enough bikes available in stock.',
      });
    }

    // Calculate total price based on the quantity
    const totalPrice = bike.price * quantity;

    // Create an order object
    const order = new Order({
      email,
      product,
      quantity,
      totalPrice,
    });

    // Update the bike's stock
    bike.quantity -= quantity;
    bike.inStock = bike.quantity > 0; // If quantity becomes 0, set inStock to false
    await bike.save(); // Save the updated bike model

    // Save the order
    const savedOrder = await order.save();

    // Respond with success and order details
    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: savedOrder,
    });
  } catch (err: any) {
    // Error handling
    res.status(500).json({
      message: 'Error creating order',
      success: false,
      error: err.message,
    });
  }
});


// Calculate Revenue from Orders
router.get('/revenue', async (req: Request, res: Response) => {
  try {
    // Aggregate orders with the product's price
    const result = await Order.aggregate([
      // Step 1: Lookup to join Order and Bike collection
      {
        $lookup: {
          from: 'bikes', // Collection name of the Bike model
          localField: 'product', // Field in the order that links to bike
          foreignField: '_id', // Field in bike model to join on
          as: 'bikeDetails',
        },
      },
      // Step 2: Unwind the array created by the lookup
      {
        $unwind: '$bikeDetails',
      },
      // Step 3: Add a new field to calculate the total price
      {
        $addFields: {
          totalPrice: { $multiply: ['$bikeDetails.price', '$quantity'] },
        },
      },
      // Step 4: Group by null to calculate the total revenue
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    // Check if revenue was calculated
    if (result.length > 0) {
      const totalRevenue = result[0].totalRevenue;
      res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
          totalRevenue,
        },
      });
    } else {
      res.status(404).json({
        message: 'No orders found',
        status: false,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      message: 'Error calculating revenue',
      success: false,
      error: err.message,
    });
  }
});

export default router;
