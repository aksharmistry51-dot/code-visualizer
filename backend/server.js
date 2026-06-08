const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analyzeRoute = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin ['http://localhost:5173', 'https://code-visualizer-theta.vercel.app']
}));
app.use(express.json());

app.use('/api/analyze', analyzeRoute);

app.get('/', (req, res) => {
  res.send('Code Visualizer Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});