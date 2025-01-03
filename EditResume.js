// frontend/src/components/EditResume.js
import React, { useState } from 'react';
import { updateResume } from '../api';

const EditResume = () => {
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    skills: [],
    experience: [],
    education: [],
    contactInfo: { phone: '', address: '' },
  });

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedResume = await updateResume(resumeData);
    alert('Resume updated!');
  };

  return (
    <div className="edit-resume-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={resumeData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={resumeData.email}
          onChange={handleChange}
        />
        <textarea
          name="skills"
          placeholder="Skills (comma-separated)"
          value={resumeData.skills}
          onChange={handleChange}
        />
        <textarea
          name="experience"
          placeholder="Experience (comma-separated)"
          value={resumeData.experience}
          onChange={handleChange}
        />
        <textarea
          name="education"
          placeholder="Education (comma-separated)"
          value={resumeData.education}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditResume;
