import React, { useState } from 'react';
import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';

const timesNewRomanStyle = {
  fontFamily: "'Times New Roman', Times, serif"
};

const orangeStyle = {
  backgroundColor: '#ff8c00',
  borderColor: '#ff8c00'
};

const FilterSidebar = ({ onFilterChange }) => {
  const [specialization, setSpecialization] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [language, setLanguage] = useState('');
  const [experience, setExperience] = useState(0);
  const [availability, setAvailability] = useState([]);

  const specializationOptions = [
    'General Physician',
    'Pediatrician',
    'Gynecologist',
    'Dermatologist',
    'Orthopedic',
    'Cardiologist',
    'Neurologist'
  ];

  const cityOptions = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad'
  ];

  const languageOptions = [
    'English',
    'Hindi',
    'Tamil',
    'Telugu',
    'Malayalam',
    'Kannada',
    'Bengali',
    'Marathi'
  ];

  const availabilityOptions = [
    { label: 'Today', value: 'Today' },
    { label: 'Tomorrow', value: 'Tomorrow' },
    { label: 'This Weekend', value: 'This Weekend' },
    { label: 'Morning', value: 'Morning' },
    { label: 'Afternoon', value: 'Afternoon' },
    { label: 'Evening', value: 'Evening' }
  ];

  const handleApplyFilters = () => {
    const filters = {
      specialization: specialization || undefined,
      gender: gender || undefined,
      city: city || undefined,
      language: language || undefined,
      experience: experience > 0 ? experience : undefined,
      availability: availability.length > 0 ? availability.join(',') : undefined
    };
    
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );
    
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setSpecialization('');
    setGender('');
    setCity('');
    setLanguage('');
    setExperience(0);
    setAvailability([]);
    
    onFilterChange({});
  };

  return (
    <Container className="filter-sidebar p-0">
      <Card className="shadow-sm" style={{ ...timesNewRomanStyle }}>
        <Card.Header style={{ ...orangeStyle }} className="text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0"><FaFilter className="me-2" /> Filter Results</h5>
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={handleClearFilters}
            >
              <FaTimes className="me-1" /> Clear
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body className="bg-white">
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Specialization</Form.Label>
            <Form.Select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option value="">Select Specialization</option>
              {specializationOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Gender</Form.Label>
            <div>
              {['Male', 'Female', 'Other'].map((option) => (
                <Form.Check
                  key={option}
                  type="radio"
                  id={`gender-${option}`}
                  name="gender"
                  label={option}
                  checked={gender === option}
                  onChange={() => setGender(option)}
                  className="mb-2"
                />
              ))}
            </div>
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">City</Form.Label>
            <Form.Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Languages</Form.Label>
            <Form.Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              {languageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Experience (Years): {experience}</Form.Label>
            <Form.Range
              value={experience}
              onChange={e => setExperience(parseInt(e.target.value))}
              min={0}
              max={30}
            />
            <div className="d-flex justify-content-between">
              <small>0</small>
              <small>15</small>
              <small>30</small>
            </div>
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Availability</Form.Label>
            <Row xs={1} md={2}>
              {availabilityOptions.map((option) => (
                <Col key={option.value} className="mb-2">
                  <Form.Check
                    type="checkbox"
                    id={`availability-${option.value}`}
                    label={option.label}
                    checked={availability.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAvailability([...availability, option.value]);
                      } else {
                        setAvailability(availability.filter(item => item !== option.value));
                      }
                    }}
                  />
                </Col>
              ))}
            </Row>
          </Form.Group>
        </Card.Body>

        <Card.Footer className="bg-white text-center border-0">
          <Button 
            style={{ ...orangeStyle }}
            className="w-100"
            onClick={handleApplyFilters}
          >
            <FaFilter className="me-2" /> Apply Filters
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default FilterSidebar;