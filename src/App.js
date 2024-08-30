import React, { useState } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import { Modal, Button } from 'react-bootstrap';

function PhotoSearch() {
  const [photo, setPhoto] = useState("");
  const [result, setResult] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const changePhoto = () => {
    axios
      .get(`https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=4UhQL7IdZ55_AGB-WhQQNVlxTwun4XNQI0lXn6L-gqM`)
      .then((response) => {
        setResult(response.data.results);
      });
  };

  const handleSubmitUserForm = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowUserForm(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="container my-5" style={{ position: 'relative' }}>
        <UserInfo
          showUserForm={showUserForm}
          setShowUserForm={setShowUserForm}
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          handleSubmitUserForm={handleSubmitUserForm}
          submitted={submitted}
        />
        <br /> <br /> <br /> <br /> <br /><br />

    
        <div className="d-flex justify-content-center my-4">
          <div style={{ width: '100%', maxWidth: '700px', textAlign: 'center' }}>
            <input
              type="text"
              className="form-control"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Search for photos"
              style={{ width: '100%' }} 
            />
            <button
              type="submit"
              onClick={changePhoto}
              className="btn btn-primary mt-2"
              style={{ width: '20%' }} 
            >
              Search
            </button>
          </div>
        </div>

        <div className="row text-center text-lg-start">
          {result.map((value) => (
            <div key={value.id} className="col-lg-3 col-md-4 col-6">
              <img
                className="img-fluid img-thumbnail d-block mb-4 h-100"
                src={value.urls.small}
                alt=""
                onClick={() => handleImageClick(value)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>

      
      {selectedImage && (
        <Modal show onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Image Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column align-items-center">
              <img
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description}
                style={{ width: '100%', maxHeight: '50vh', objectFit: 'contain' }}
              />
              <p className="mt-2">{selectedImage.description || 'No description available'}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <a href={selectedImage.urls.full} download>
              <Button variant="primary">Download</Button>
            </a>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default PhotoSearch;
