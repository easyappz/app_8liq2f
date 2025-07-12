const express = require('express');
const Calculation = require('./models/Calculation');

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// GET /api/history - Retrieve calculation history
router.get('/history', async (req, res) => {
  try {
    const history = await Calculation.find().sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching calculation history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/history - Add new calculation to history
router.post('/history', async (req, res) => {
  try {
    const { expression, result } = req.body;
    
    if (!expression || result === undefined) {
      return res.status(400).json({ error: 'Expression and result are required' });
    }

    const newCalculation = new Calculation({
      expression,
      result
    });

    const savedCalculation = await newCalculation.save();
    res.status(201).json(savedCalculation);
  } catch (error) {
    console.error('Error saving calculation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
