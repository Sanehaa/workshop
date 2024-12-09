const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./config/db');
const productRouter = require('./routes/router')
const checkoutRoutes = require('./routes/router');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


connection;

app.get('/', (req, res) => {
  res.send('Node.js backend working fine');
});

// Routes
app.use('/api', productRouter);
app.use('/api', checkoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
