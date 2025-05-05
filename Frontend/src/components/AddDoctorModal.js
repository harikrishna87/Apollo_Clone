import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  FormCheck
} from 'react-bootstrap';
import { addDoctor } from '@/lib/api';
import { ToastContainer, toast } from 'react-toastify';

const customStyles = {
  modalHeader: {
    backgroundColor: '#FF8C00',
    color: 'white',
    fontFamily: 'Times New Roman, Times, serif',
    padding: '15px 20px',
    borderBottom: '2px solid #e67300'
  },
  modalBody: {
    fontFamily: 'Times New Roman, Times, serif',
    padding: '20px'
  },
  sectionHeader: {
    color: '#FF8C00',
    borderBottom: '1px solid #FF8C00',
    paddingBottom: '8px',
    marginBottom: '15px',
    marginTop: '15px',
    fontFamily: 'Times New Roman, Times, serif',
    fontWeight: 'bold'
  },
  formLabel: {
    color: '#333',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman, Times, serif'
  },
  submitButton: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
    fontFamily: 'Times New Roman, Times, serif'
  },
  cancelButton: {
    color: '#FF8C00',
    borderColor: '#FF8C00',
    fontFamily: 'Times New Roman, Times, serif'
  },
  modalFooter: {
    borderTop: '1px solid #e67300',
    padding: '15px 20px'
  }
};

const AddDoctorModal = ({ show, onHide, onAddDoctor }) => {
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    specialization: 'General Physician',
    experience: 0,
    gender: 'Male',
    languages: ['English'],
    clinicName: '',
    location: '',
    city: 'Mumbai',
    consultationFee: 0,
    availability: [],
    imageUrl: '',
    rating: 4.0,
    reviewCount: 0
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      const result = await addDoctor(formData);
      toast.success("Doctor Data Added Successfully!")
      setFormData({
        name: '',
        qualification: '',
        specialization: 'General Physician',
        experience: 0,
        gender: 'Male',
        languages: ['English'],
        clinicName: '',
        location: '',
        city: 'Mumbai',
        consultationFee: 0,
        availability: [],
        imageUrl: '',
        rating: 4.0,
        reviewCount: 0
      });
      setValidated(false);
      onAddDoctor(result);
      onHide();
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error('Failed to add doctor. Please try again.')
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="add-doctor-modal"
        centered
      >
        <Modal.Header closeButton style={customStyles.modalHeader}>
          <Modal.Title id="add-doctor-modal">
            Add New Doctor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={customStyles.modalBody}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h5 style={customStyles.sectionHeader}>Basic Information</h5>

            <FormGroup className="mb-3">
              <FormLabel style={customStyles.formLabel}>Full Name</FormLabel>
              <FormControl
                required
                type="text"
                name="name"
                placeholder="Dr. John Doe"
                value={formData.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter doctor&apos;s name.
              </Form.Control.Feedback>
            </FormGroup>

            <Row className="mb-3">
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>Qualification</FormLabel>
                  <FormControl
                    required
                    type="text"
                    name="qualification"
                    placeholder="MBBS, MD"
                    value={formData.qualification}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter qualification.
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>Specialization</FormLabel>
                  <FormSelect
                    required
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                  >
                    <option value="General Physician">General Physician</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Neurologist">Neurologist</option>
                  </FormSelect>
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>Experience (years)</FormLabel>
                  <FormControl
                    required
                    type="number"
                    name="experience"
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={handleNumericChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormLabel style={customStyles.formLabel}>Gender</FormLabel>
                <div>
                  <FormCheck
                    inline
                    type="radio"
                    label="Male"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    required
                  />
                  <FormCheck
                    inline
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    required
                  />
                  <FormCheck
                    inline
                    type="radio"
                    label="Other"
                    name="gender"
                    value="Other"
                    checked={formData.gender === 'Other'}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Col>
            </Row>

            <FormGroup className="mb-3">
              <FormLabel style={customStyles.formLabel}>Languages Spoken</FormLabel>
              <div className="d-flex flex-wrap gap-3">
                <FormCheck
                  type="checkbox"
                  label="English"
                  name="languages"
                  value="English"
                  checked={formData.languages.includes('English')}
                  onChange={handleCheckboxChange}
                />
                <FormCheck
                  type="checkbox"
                  label="Hindi"
                  name="languages"
                  value="Hindi"
                  checked={formData.languages.includes('Hindi')}
                  onChange={handleCheckboxChange}
                />
                <FormCheck
                  type="checkbox"
                  label="Tamil"
                  name="languages"
                  value="Tamil"
                  checked={formData.languages.includes('Tamil')}
                  onChange={handleCheckboxChange}
                />
                <FormCheck
                  type="checkbox"
                  label="Telugu"
                  name="languages"
                  value="Telugu"
                  checked={formData.languages.includes('Telugu')}
                  onChange={handleCheckboxChange}
                />
                <FormCheck
                  type="checkbox"
                  label="Malayalam"
                  name="languages"
                  value="Malayalam"
                  checked={formData.languages.includes('Malayalam')}
                  onChange={handleCheckboxChange}
                />
                <FormCheck
                  type="checkbox"
                  label="Kannada"
                  name="languages"
                  value="Kannada"
                  checked={formData.languages.includes('Kannada')}
                  onChange={handleCheckboxChange}
                />
                <FormCheck
                  type="checkbox"
                  label="Bengali"
                  name="languages"
                  value="Bengali"
                  checked={formData.languages.includes('Bengali')}
                  onChange={handleCheckboxChange}
                />
                <FormCheck
                  type="checkbox"
                  label="Marathi"
                  name="languages"
                  value="Marathi"
                  checked={formData.languages.includes('Marathi')}
                  onChange={handleCheckboxChange}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please select at least one language
              </Form.Control.Feedback>
            </FormGroup>

            <h5 style={customStyles.sectionHeader}>Location & Practice</h5>

            <FormGroup className="mb-3">
              <FormLabel style={customStyles.formLabel}>Clinic/Hospital Name</FormLabel>
              <FormControl
                required
                type="text"
                name="clinicName"
                placeholder="City Medical Center"
                value={formData.clinicName}
                onChange={handleChange}
              />
            </FormGroup>

            <Row className="mb-3">
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>Location</FormLabel>
                  <FormControl
                    required
                    type="text"
                    name="location"
                    placeholder="Sector 14, Gurugram"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>City</FormLabel>
                  <FormSelect
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Pune">Pune</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                  </FormSelect>
                </FormGroup>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>Consultation Fee (₹)</FormLabel>
                  <InputGroup>
                    <InputGroup.Text>₹</InputGroup.Text>
                    <FormControl
                      required
                      type="number"
                      name="consultationFee"
                      min="0"
                      value={formData.consultationFee}
                      onChange={handleNumericChange}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>Availability</FormLabel>
                  <div>
                    <FormCheck
                      inline
                      type="checkbox"
                      label="Morning"
                      name="availability"
                      value="Morning"
                      checked={formData.availability.includes('Morning')}
                      onChange={handleCheckboxChange}
                    />
                    <FormCheck
                      inline
                      type="checkbox"
                      label="Afternoon"
                      name="availability"
                      value="Afternoon"
                      checked={formData.availability.includes('Afternoon')}
                      onChange={handleCheckboxChange}
                    />
                    <FormCheck
                      inline
                      type="checkbox"
                      label="Evening"
                      name="availability"
                      value="Evening"
                      checked={formData.availability.includes('Evening')}
                      onChange={handleCheckboxChange}
                    />
                    <FormCheck
                      inline
                      type="checkbox"
                      label="Weekdays"
                      name="availability"
                      value="Weekdays"
                      checked={formData.availability.includes('Weekdays')}
                      onChange={handleCheckboxChange}
                    />
                    <FormCheck
                      inline
                      type="checkbox"
                      label="Weekends"
                      name="availability"
                      value="Weekends"
                      checked={formData.availability.includes('Weekends')}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">
                    Please select at least one availability option.
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
            </Row>

            <h5 style={customStyles.sectionHeader}>Profile & Rating</h5>

            <FormGroup className="mb-3">
              <FormLabel style={customStyles.formLabel}>Profile Image URL</FormLabel>
              <FormControl
                type="text"
                name="imageUrl"
                placeholder="URL to doctor's profile image"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </FormGroup>

            <Row className="mb-3">
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>Initial Rating (0-5)</FormLabel>
                  <FormControl
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleNumericChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormLabel style={customStyles.formLabel}>Initial Review Count</FormLabel>
                  <FormControl
                    type="number"
                    name="reviewCount"
                    min="0"
                    value={formData.reviewCount}
                    onChange={handleNumericChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Modal.Footer style={customStyles.modalFooter}>
              <Button variant="outline-secondary" onClick={onHide} style={customStyles.cancelButton}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} style={customStyles.submitButton}>
                {loading ? 'Adding...' : 'Add Doctor'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddDoctorModal;