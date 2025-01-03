const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Ensure to use correct URI)
mongoose.connect('mongodb://localhost:27017/interactive_resume', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Create a Resume model with additional fields
const ResumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
  experience: [
    {
      jobTitle: String,
      company: String,
      duration: String,
      description: String,
    },
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    },
  ],
  projects: [
    {
      title: String,
      description: String,
      link: String,
    },
  ],
});

const Resume = mongoose.model('Resume', ResumeSchema);

// API endpoint to get resume data
app.get('/api/resume', async (req, res) => {
  try {
    const resume = await Resume.findOne();  // Assuming only one resume in DB
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// API endpoint to update resume data
app.put('/api/resume', async (req, res) => {
  try {
    const updatedResume = await Resume.findOneAndUpdate({}, req.body, { new: true });
    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
