import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Resume.css';

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedResume, setEditedResume] = useState({});
  const [activeSection, setActiveSection] = useState(null);  // Track active dropdown section

  useEffect(() => {
    axios.get('http://localhost:5000/api/resume')
      .then(response => setResume(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setEditedResume({
      ...editedResume,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedResume(resume);
  };

  const handleSave = () => {
    axios.put('http://localhost:5000/api/resume', editedResume)
      .then(response => {
        setResume(response.data);
        setIsEditing(false);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (section) => {
    axios.delete(`http://localhost:5000/api/resume/${section}`)
      .then(response => {
        setResume(response.data);
      })
      .catch(err => console.error(err));
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);  // Toggle the section visibility
  };

  if (!resume) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>My Resume</h1>

      {isEditing ? (
        <div>
          <form onSubmit={handleSave}>
            <div className="section">
              <button type="button" onClick={() => toggleSection('personalDetails')}>Personal Details</button>
              {activeSection === 'personalDetails' && (
                <div className="section-content">
                  <table className="resume-table">
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td>
                          <input
                            type="text"
                            name="name"
                            value={editedResume.name || ''}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>
                          <input
                            type="email"
                            name="email"
                            value={editedResume.email || ''}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Phone:</td>
                        <td>
                          <input
                            type="text"
                            name="phone"
                            value={editedResume.phone || ''}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="button" onClick={() => handleDelete('personalDetails')}>Delete Personal Details</button>
                </div>
              )}
            </div>

            <div className="section">
              <button type="button" onClick={() => toggleSection('skills')}>Skills</button>
              {activeSection === 'skills' && (
                <div className="section-content">
                  <table className="resume-table">
                    <tbody>
                      <tr>
                        <td colSpan="2">
                          <textarea
                            name="skills"
                            value={editedResume.skills?.join(', ') || ''}
                            onChange={handleChange}
                            placeholder="Skills (comma separated)"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="button" onClick={() => handleDelete('skills')}>Delete Skills</button>
                </div>
              )}
            </div>

            <button type="submit">Save Changes</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="section">
            <button type="button" onClick={() => toggleSection('personalDetails')}>Personal Details</button>
            {activeSection === 'personalDetails' && (
              <div className="section-content">
                <table className="resume-table">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{resume.name}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{resume.email}</td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td>{resume.phone}</td>
                    </tr>
                  </tbody>
                </table>
                <button type="button" onClick={() => handleDelete('personalDetails')}>Delete Personal Details</button>
              </div>
            )}
          </div>

          <div className="section">
            <button type="button" onClick={() => toggleSection('skills')}>Skills</button>
            {activeSection === 'skills' && (
              <div className="section-content">
                <table className="resume-table">
                  <tbody>
                    <tr>
                      <td colSpan="2">{resume.skills?.join(', ')}</td>
                    </tr>
                  </tbody>
                </table>
                <button type="button" onClick={() => handleDelete('skills')}>Delete Skills</button>
              </div>
            )}
          </div>

          <button onClick={handleEdit}>Edit Resume</button>
        </div>
      )}
    </div>
  );
};

export default Resume;
