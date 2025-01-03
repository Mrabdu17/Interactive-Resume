// backend/routes/resumeRoutes.js
const express = require('express');
const router = express.Router();

// Mock data for the resume (replace with database queries later)
router.get('/', (req, res) => {
  const resume = {
    name: 'John Doe',
    jobTitle: 'Full Stack Developer',
    summary: 'Experienced developer with a passion for building scalable web applications.',
    skills: ['JavaScript', 'Node.js', 'MongoDB', 'React', 'Express'],
    education: {
      degree: 'B.Sc. in Computer Science',
      university: 'XYZ University',
      year: '2018',
    },
    experience: [
      { company: 'ABC Corp', position: 'Junior Developer', year: '2019-2021' },
      { company: 'XYZ Ltd.', position: 'Senior Developer', year: '2021-present' },
    ],
  };

  res.json(resume); // Send resume data as response
});

module.exports = router;
