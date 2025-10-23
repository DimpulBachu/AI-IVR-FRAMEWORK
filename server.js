require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ivrRoutes = require('./routes/ivrRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api', ivrRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`IVR backend running on port ${PORT}`));
