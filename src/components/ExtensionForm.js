
import React, { useState, useEffect } from 'react';

function ExtensionForm({ onSubmit, initialData, isEditing, onCancel }) {
  const [formData, setFormData] = useState({
    floorName: '',
    departmentName: '',
    personName: '',
    extensionNumber: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        floorName: '',
        departmentName: '',
        personName: '',
        extensionNumber: ''
      });
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.floorName.trim()) {
      newErrors.floorName = 'Floor name is required';
    }

    if (!formData.departmentName.trim()) {
      newErrors.departmentName = 'Department name is required';
    }

    if (!formData.personName.trim()) {
      newErrors.personName = 'Person name is required';
    }

    if (!formData.extensionNumber.trim()) {
      newErrors.extensionNumber = 'Extension number is required';
    } else if (!/^\d+$/.test(formData.extensionNumber.trim())) {
      newErrors.extensionNumber = 'Extension number must contain only numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const trimmedData = {
        ...formData,
        floorName: formData.floorName.trim(),
        departmentName: formData.departmentName.trim(),
        personName: formData.personName.trim(),
        extensionNumber: formData.extensionNumber.trim()
      };

      onSubmit(trimmedData);

      if (!isEditing) {
        setFormData({
          floorName: '',
          departmentName: '',
          personName: '',
          extensionNumber: ''
        });
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      floorName: '',
      departmentName: '',
      personName: '',
      extensionNumber: ''
    });
    setErrors({});
    onCancel();
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Extension' : 'Add New Extension'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="floorName">Floor Name</label>
            <input
              type="text"
              id="floorName"
              name="floorName"
              value={formData.floorName}
              onChange={handleChange}
              placeholder="e.g., Ground Floor, 1st Floor"
              style={{ borderColor: errors.floorName ? '#e74c3c' : '#ddd' }}
            />
            {errors.floorName && <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.floorName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="departmentName">Department Name</label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              placeholder="e.g., IT, HR, Sales"
              style={{ borderColor: errors.departmentName ? '#e74c3c' : '#ddd' }}
            />
            {errors.departmentName && <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.departmentName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="personName">Person Name</label>
            <input
              type="text"
              id="personName"
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              style={{ borderColor: errors.personName ? '#e74c3c' : '#ddd' }}
            />
            {errors.personName && <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.personName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="extensionNumber">Extension Number</label>
            <input
              type="text"
              id="extensionNumber"
              name="extensionNumber"
              value={formData.extensionNumber}
              onChange={handleChange}
              placeholder="e.g., 1234"
              style={{ borderColor: errors.extensionNumber ? '#e74c3c' : '#ddd' }}
            />
            {errors.extensionNumber && <span style={{ color: '#e74c3c', fontSize: '14px' }}>{errors.extensionNumber}</span>}
          </div>
        </div>

        <div className="button-group">
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}>
            {isEditing ? 'Update Extension' : 'Add Extension'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExtensionForm;
