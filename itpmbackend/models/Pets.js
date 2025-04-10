const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },  
    breed: { type: String, required: true },        
    age: { type: Number, required: true },          
    symptoms: { type: String, required: true },     
    behavior: { type: String, required: true },     
  },
  { timestamps: true }  
);

const PetsModel = mongoose.model('Pet', PetSchema);  
module.exports = PetsModel;

const TrainingVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: '/images/default-thumbnail.jpg' },
  ageCategory: { 
    type: String, 
    required: true,
    enum: ['puppy', 'adult', 'senior'] 
  },
  tags: [String],
  duration: { type: String },
  uploadDate: { type: Date, default: Date.now }
});

const TrainingVideoModel = mongoose.model('TrainingVideo', TrainingVideoSchema);



