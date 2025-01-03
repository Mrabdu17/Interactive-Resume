import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [resumeData, setResumeData] = useState(null);
  const [editing, setEditing] = useState(false);

  // Fetch resume data from backend
  const fetchResume = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resume');
      const data = await response.json();
      setResumeData(data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await fetch('http://localhost:5000/api/resume', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData),
      });
      setEditing(false);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    fetchResume(); // Reset to the original data
  };

  const handleChange = (e, section, field, index = null) => {
    const updatedData = { ...resumeData };
    if (index !== null) {
      updatedData[section][index][field] = e.target.value;
    } else {
      updatedData[section] = e.target.value;
    }
    setResumeData(updatedData);
  };

  const handleDelete = (section, index) => {
    if (resumeData && resumeData[section]) {
      resumeData[section].splice(index, 1);
      setResumeData({ ...resumeData }); // Trigger re-render
    }
  };

  return (
    <div className="App">
      <h1>Interactive Resume</h1>

      {resumeData && (
        <div>
          {editing ? (
            <div>
              <h2>Edit Resume</h2>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => handleChange(e, 'name')}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => handleChange(e, 'email')}
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  value={resumeData.phone}
                  onChange={(e) => handleChange(e, 'phone')}
                />
              </div>
              <div>
                <label>Skills:</label>
                <input
                  type="text"
                  value={resumeData.skills.join(', ')}
                  onChange={(e) => handleChange(e, 'skills')}
                />
              </div>

              {/* Experience Section */}
              <h3>Experience</h3>
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <label>Job Title:</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleChange(e, 'experience', 'jobTitle', index)}
                  />
                  <label>Company:</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleChange(e, 'experience', 'company', index)}
                  />
                  <label>Duration:</label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => handleChange(e, 'experience', 'duration', index)}
                  />
                  <label>Description:</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleChange(e, 'experience', 'description', index)}
                  />
                  <button onClick={() => handleDelete('experience', index)}>Delete</button>
                </div>
              ))}
              <button onClick={() => setResumeData({ ...resumeData, experience: [...resumeData.experience, { jobTitle: '', company: '', duration: '', description: '' }] })}>Add Experience</button>

              {/* Education Section */}
              <h3>Education</h3>
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <label>Degree:</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, 'education', 'degree', index)}
                  />
                  <label>Institution:</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleChange(e, 'education', 'institution', index)}
                  />
                  <label>Year:</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleChange(e, 'education', 'year', index)}
                  />
                  <button onClick={() => handleDelete('education', index)}>Delete</button>
                </div>
              ))}
              <button onClick={() => setResumeData({ ...resumeData, education: [...resumeData.education, { degree: '', institution: '', year: '' }] })}>Add Education</button>

              {/* Projects Section */}
              <h3>Projects</h3>
              {resumeData.projects.map((project, index) => (
                <div key={index}>
                  <label>Title:</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleChange(e, 'projects', 'title', index)}
                  />
                  <label>Description:</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleChange(e, 'projects', 'description', index)}
                  />
                  <label>Link:</label>
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) => handleChange(e, 'projects', 'link', index)}
                  />
                  <button onClick={() => handleDelete('projects', index)}>Delete</button>
                </div>
              ))}
              <button onClick={() => setResumeData({ ...resumeData, projects: [...resumeData.projects, { title: '', description: '', link: '' }] })}>Add Project</button>

              <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Resume Details</h2>
              <table>
                <tr>
                  <th>Name</th>
                  <td>{resumeData.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{resumeData.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{resumeData.phone}</td>
                </tr>
                <tr>
                  <th>Skills</th>
                  <td>{resumeData.skills.join(', ')}</td>
                </tr>
                <tr>
                  <th>Experience</th>
                  <td>
                    {resumeData.experience.map((exp, index) => (
                      <div key={index}>
                        <div>{exp.jobTitle} at {exp.company} ({exp.duration})</div>
                        <p>{exp.description}</p>
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>Education</th>
                  <td>
                    {resumeData.education.map((edu, index) => (
                      <div key={index}>
                        <div>{edu.degree} from {edu.institution} ({edu.year})</div>
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>Projects</th>
                  <td>
                    {resumeData.projects.map((project, index) => (
                      <div key={index}>
                        <div>{project.title}: {project.description} <a href={project.link}>Link</a></div>
                      </div>
                    ))}
                  </td>
                </tr>
              </table>
              <button onClick={handleEdit}>Edit Resume</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
