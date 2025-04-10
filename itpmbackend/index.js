const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PetsModel = require('./models/Pets'); 

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://kavindudissanayaka000:Itpm12340000@itpm.mc5xu.mongodb.net/ITPM?retryWrites=true&w=majority&appName=ITPM",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const trainingVideos = {
  puppy: [
    { title: "Basic Puppy Commands", url: "https://example.com/puppy-commands", description: "Learn the essential commands for puppies under 1 year" },
    { title: "Potty Training Basics", url: "https://example.com/potty-training", description: "How to properly potty train your young puppy" },
    { title: "Socialization for Puppies", url: "https://example.com/puppy-social", description: "Important socialization techniques for young dogs" }
  ],
  adult: [
    { title: "Advanced Commands", url: "https://example.com/adult-commands", description: "Take your adult dog's training to the next level" },
    { title: "Leash Training Perfection", url: "https://example.com/leash-adult", description: "Perfect leash manners for adult dogs" },
    { title: "Behavior Correction", url: "https://example.com/behavior-adult", description: "How to correct common behavioral issues" }
  ],
  senior: [
    { title: "Senior Dog Care", url: "https://example.com/senior-care", description: "Special considerations for training older dogs" },
    { title: "Low Impact Exercises", url: "https://example.com/senior-exercise", description: "Gentle exercises suitable for senior pets" },
    { title: "Memory Games for Seniors", url: "https://example.com/senior-memory", description: "Keep your senior dog's mind sharp with these activities" }
  ]
};

app.get('/api/training-videos/:id', async (req, res) => {
  try {
    const pet = await PetsModel.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    let category;
    if (pet.age < 1) {
      category = 'puppy';
    } else if (pet.age < 8) {
      category = 'adult';
    } else {
      category = 'senior';
    }
    
    res.json({
      pet,
      category,
      videos: trainingVideos[category]
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch training videos', error: error.message });
  }
});

// Get all training videos categorized by age group
app.get('/api/all-training-videos', (req, res) => {
  try {
    res.json(trainingVideos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch training videos', error: error.message });
  }
});


app.post('/createPet', async (req, res) => {
  try {
    const { customerName, breed, age, symptoms, behavior } = req.body;

    const newPet = new PetsModel({ customerName, breed, age, symptoms, behavior }); 
    await newPet.save();

    res.status(201).json({ message: 'Pet details added successfully', pet: newPet });
  } catch (err) {
    res.status(500).json({ message: 'Error saving pet data', error: err.message });
  }
});


app.get('/checkPet', async (req, res) => {
  const { breed, symptoms } = req.query;

  try {
    const petExists = await PetsModel.findOne({ breed, symptoms }); 

    if (petExists) {
      res.status(200).json({ exists: true, pet: petExists });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error checking pet data', error: err.message });
  }
});


app.get('/api/pets', async (req, res) => {
  try {
    const { customerName } = req.query;  
    const query = {};

    if (customerName) query.customerName = { $regex: customerName, $options: 'i' }; 

    const pets = await PetsModel.find(query);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pets data' });
  }
});



app.post('/api/pets', async (req, res) => {
  try {
    const { customerName, breed, age, symptoms, behavior } = req.body;

    const newPet = new PetsModel({
      customerName,
      breed,
      age,
      symptoms,
      behavior
    });

    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add pet' });
  }
});


app.put('/api/pets/:id', async (req, res) => {
  try {
    const { customerName, breed, age, symptoms, behavior } = req.body;

    const updatedPet = await PetsModel.findByIdAndUpdate(
      req.params.id,
      { customerName, breed, age, symptoms, behavior },
      { new: true }
    );

    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update pet' });
  }
});


app.delete('/api/pets/:id', async (req, res) => {
  try {
    await PetsModel.findByIdAndDelete(req.params.id); 
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete pet' });
  }
});


app.get('/api/report', async (req, res) => {
  try {
    const petCount = await PetsModel.countDocuments(); 
    const breedCount = await PetsModel.aggregate([
      { $group: { _id: "$breed", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ petCount, breedCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report' });
  }
});

app.post("/send-message", async (req, res) => {
  const { phoneNumber, message } = req.body;

  try {
    const response = await axios.post(
      INFOBIP_API_URL,
      {
        messages: [
          {
            destinations: [{ to: phoneNumber }],
            from: "YourSenderID",
            text: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `App ${INFOBIP_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
