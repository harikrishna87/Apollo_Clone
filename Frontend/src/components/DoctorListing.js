"use client"
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Modal, Image } from 'react-bootstrap';
import { Star, StarFill, Clock, CheckCircle, Book, Person, FunnelFill, CurrencyRupee } from 'react-bootstrap-icons';
import { fetchDoctors, addDoctor } from '@/lib/api';
import FilterSidebar from './FilterSidebar';
import AddDoctorModal from './AddDoctorModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorListing = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
  
    useEffect(() => {
      const loadDoctors = async () => {
        try {
          setLoading(true);
          const data = await fetchDoctors(filters);
          setDoctors(data);
        } catch (error) {
          console.error('Error loading doctors:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadDoctors();
    }, [filters]);
  
    const handleFilterChange = (newFilters) => {
      setFilters(newFilters);
      setCurrentPage(1);
    };
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const handleAddDoctor = (newDoctor) => {
      setDoctors([newDoctor, ...doctors]);
      setIsModalVisible(false);
    };
  
    const showFilterModal = () => {
      setIsFilterModalVisible(true);
    };
  
    const hideFilterModal = () => {
      setIsFilterModalVisible(false);
    };
  
    const paginatedDoctors = doctors.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  
    const totalPages = Math.ceil(doctors.length / pageSize);
  
    const renderStars = (rating) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      
      for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
          stars.push(<StarFill key={i} className="star-filled" />);
        } else if (i === fullStars + 1 && hasHalfStar) {
          stars.push(<StarFill key={i} className="star-half-filled" />);
        } else {
          stars.push(<Star key={i} className="star-empty" />);
        }
      }
      return stars;
    };
  
    return (
      <Container fluid className="doctor-listing-container">
        <Row className="gx-4">
          <Col xs={12} md={3} className="mb-4 mb-md-0 d-none d-md-block">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h4 className="times-roman mb-0">Filters</h4>
              <Button 
                variant="primary" 
                className="add-doctor-btn times-roman"
                onClick={showModal}
              >
                Add Doctor
              </Button>
            </div>
            <FilterSidebar onFilterChange={handleFilterChange} />
          </Col>
  
          <Col xs={12} className="d-md-none mb-3">
            <div className="d-flex justify-content-between">
              <Button 
                variant="outline-primary" 
                className="filter-btn d-flex align-items-center"
                onClick={showFilterModal}
              >
                <FunnelFill className="me-2" /> Filters
              </Button>
              <Button 
                variant="primary" 
                className="add-doctor-btn times-roman"
                onClick={showModal}
              >
                Add Doctor
              </Button>
            </div>
          </Col>
  
          <Col xs={12} md={9}>
            <div className="header-section mb-4">
              <h2 className="times-roman">General Physicians & Internal Medicine Specialists</h2>
              <p className="times-roman">
                Find experienced General Physicians and book an appointment online
              </p>
            </div>
            
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status" className="spinner-custom">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-3">Loading doctors...</p>
              </div>
            ) : paginatedDoctors.length === 0 ? (
              <div className="text-center py-5 empty-state">
                <Person size={64} className="mb-3" />
                <h4>No doctors found matching your criteria</h4>
                <p>Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <>
                {paginatedDoctors.map((doctor, index) => (
                  <Card className="doctor-card mb-4"  key={doctor._id || index}>
                    <Card.Body>
                      <Row>
                        <Col xs={12} sm={4} md={3} lg={2} className="text-center mb-3 mb-sm-0">
                          <div className="doctor-image-container">
                            {doctor.imageUrl ? (
                              <Image 
                                src={doctor.imageUrl} 
                                alt={doctor.name} 
                                className="doctor-image"
                              />
                            ) : (
                              <div className="doctor-image-placeholder">
                                <Person size={48} />
                              </div>
                            )}
                          </div>
                        </Col>
                        
                        <Col xs={12} sm={8} md={9} lg={10}>
                          <div className="doctor-info">
                            <div className="d-flex flex-wrap justify-content-between mb-2">
                              <div>
                                <h3 className="doctor-name times-roman">{doctor.name}</h3>
                                <p className="doctor-qualification times-roman">{doctor.qualification}</p>
                                
                                <div className="doctor-badges mb-3 times-roman">
                                  <Badge className="badge-specialty me-2 p-2" bg='#'>{doctor.specialization}</Badge>
                                  <Badge className="badge-exp me-2 p-2" bg='#'>{doctor.experience} Yrs Exp</Badge>
                                  <Badge className="badge-gender p-2" bg='#'>{doctor.gender}</Badge>
                                </div>
                              </div>
                              
                              <div className="doctor-rating mt-2 mt-md-0 times-roman">
                                <div className="d-flex align-items-center">
                                  {renderStars(doctor.rating)}
                                  <span className="ms-2">({doctor.reviewCount} reviews)</span>
                                </div>
                              </div>
                            </div>
                            
                            <Row>
                              <Col md={8}>
                                <div className="detail-item mb-2 times-roman">
                                  <Clock className="icon me-2" />
                                  <span>Available: {doctor.availability?.join(', ') || 'Not specified'}</span>
                                </div>
                                
                                <div className="detail-item mb-2 times-roman">
                                  <CheckCircle className="icon me-2" />
                                  <span>{doctor.clinicName}, {doctor.location}, {doctor.city}</span>
                                </div>
                                
                                <div className="detail-item mb-3 times-roman">
                                  <CurrencyRupee className="icon me-2" />
                                  <span>Consultation Fee: {doctor.consultationFee}</span>
                                </div>
                              </Col>
                              
                              <Col md={4} className="text-md-end mt-3 mt-md-0 times-roman">
                                <Button 
                                  variant="success" 
                                  className="book-btn mb-2 d-flex align-items-center justify-content-center"
                                >
                                  <Book className="me-2" /> Book Appointment
                                </Button>
                                
                                <Button 
                                  variant="link" 
                                  className="view-profile-btn times-roman"
                                >
                                  View Profile
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
                
                {doctors.length > pageSize && (
                  <div className="pagination-container d-flex justify-content-center my-4 times-roman">
                    <Button 
                      variant="outline-primary" 
                      className="me-2"
                      disabled={currentPage === 1} 
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    
                    <span className="pagination-text">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <Button 
                      variant="outline-primary" 
                      className="ms-2"
                      disabled={currentPage === totalPages} 
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
        
        <AddDoctorModal
          show={isModalVisible}
          onHide={handleCancel}
          onAddDoctor={handleAddDoctor}
        />
  
        <Modal 
          show={isFilterModalVisible} 
          onHide={hideFilterModal}
          dialogClassName="filter-modal"
          aria-labelledby="filter-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="filter-modal" className="times-roman">Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FilterSidebar onFilterChange={(newFilters) => {
              handleFilterChange(newFilters);
              hideFilterModal();
            }} />
          </Modal.Body>
        </Modal>
      </Container>
    );
  };

  export default DoctorListing;