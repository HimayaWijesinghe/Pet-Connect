const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const LostPetRoute = require('./routes/LostPetRoute');
const LostPetComRoute = require('./routes/LostPetComRoute');
const DonationRoute = require('./routes/DonationRoute');
const SponserRoute = require('./routes/SponserRoute');
const FoundPetRoute = require('./routes/FoundPetRoute');
const SponserDataRouter = require('./routes/SponserDataRouter');


const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

connectDB();

app.use('/api', LostPetRoute, LostPetComRoute, DonationRoute, SponserRoute, FoundPetRoute, SponserDataRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});