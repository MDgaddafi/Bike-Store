import express, { Request, Response } from 'express';
import Bike from '../models/bike';

const router = express.Router();

// Create a bike
router.post('/', async (req: Request, res: Response) => {
  try {
    const bike = new Bike(req.body);
    const savedBike = await bike.save();
    res.status(201).json({ message: 'Bike created successfully', success: true, data: savedBike });
  } catch (err: any) {
    res.status(400).json({ message: 'Error creating bike', success: false, error: err.message });
  }
});

// In your bikeRoutes file
router.get('/:productId', async (req: Request, res: Response) => {
  try {
    const bikeId = req.params.productId; // Access the bike ID from the URL
    const bike = await Bike.findById(bikeId); // Find bike by ID in the database

    if (!bike) {
       res.status(404).json({
        message: 'Bike not found',
        success: false,
        error: 'No bike found with the given ID',
      });
    }

    res.status(200).json({
      message: 'Bike retrieved successfully',
      status: true,
      data: bike,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Error retrieving bike',
      success: false,
      error: err.message,
    });
  }
});



// Get all bikes
router.get('/', async (req: Request, res: Response) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json({ message: 'Bikes retrieved successfully', success: true, data: bikes });
  } catch (err: any) {
    res.status(500).json({ message: 'Error retrieving bikes', success: false, error: err.message });
  }
});



// Update a specific bike
router.put('/:productId', async (req: Request, res: Response) => {
  try {
    const bikeId = req.params.productId;  // Get the bike ID from the URL
    const updateData = req.body;  // Get the data to update from the request body

    // Find the bike by ID and update it
    const updatedBike = await Bike.findByIdAndUpdate(bikeId, updateData, { new: true });

    if (!updatedBike) {
       res.status(404).json({
        message: 'Bike not found',
        success: false,
        error: 'No bike found with the given ID',
      });
    }

    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: updatedBike,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Error updating bike',
      success: false,
      error: err.message,
    });
  }
});



// Delete a specific bike
router.delete('/:productId', async (req: Request, res: Response) => {
  try {
    const bikeId = req.params.productId;  // Get the bike ID from the URL

    // Find and delete the bike by ID
    const deletedBike = await Bike.findByIdAndDelete(bikeId);

    if (!deletedBike) {
       res.status(404).json({
        message: 'Bike not found',
        success: false,
        error: 'No bike found with the given ID',
      });
    }

    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Error deleting bike',
      success: false,
      error: err.message,
    });
  }
});

export default router;
