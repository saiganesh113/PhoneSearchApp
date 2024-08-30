import React, { useState, useRef } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import { Modal, Button } from 'react-bootstrap';
import { Canvas, Image, Text } from 'fabric'; // Updated import

function PhotoSearch() {
  const [photo, setPhoto] = useState("");
  const [result, setResult] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [captions, setCaptions] = useState({});
  const canvasRef = useRef(null);

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
    setCaption("");
    if (canvasRef.current) {
      canvasRef.current.style.display = 'none'; // Hide canvas when modal is closed
    }
  };

  const handleDownload = () => {
    if (!selectedImage || !canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current);
    Image.fromURL(selectedImage.urls.regular, (img) => {
      canvas.setWidth(img.width);
      canvas.setHeight(img.height);

      img.scaleToWidth(img.width);
      canvas.add(img);

      const text = new Text(caption, {
        left: 10,
        top: img.height - 50, // Place text near bottom
        fontSize: 20,
        fill: '#000',
        backgroundColor: 'white',
      });
      canvas.add(text);

      canvas.renderAll();

      // Save caption to the state
      setCaptions(prevCaptions => ({
        ...prevCaptions,
        [selectedImage.id]: caption,
      }));

      // Show the canvas
      canvasRef.current.style.display = 'block'; 

      // Trigger download
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'image_with_caption.png';
      link.click();
      
      // Close modal and clear state
      handleCloseModal();
    });
  };

  return (
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
            <div style={{ position: 'relative' }}>
              <img
                className="img-fluid img-thumbnail d-block mb-4 h-100"
                src={value.urls.small}
                alt=""
                onClick={() => handleImageClick(value)}
                style={{ cursor: 'pointer' }}
              />
              <Button
                className="btn btn-secondary mt-2"
                onClick={() => handleImageClick(value)}
              >
                Add Caption
              </Button>
              {captions[value.id] && (
                <div className="caption mt-2" style={{ textAlign: 'left' }}>
                  <p>{captions[value.id]}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal show onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add Caption to Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <div style={{ width: '50%', paddingRight: '10px' }}>
                <img
                  src={selectedImage.urls.regular}
                  alt={selectedImage.alt_description}
                  style={{ width: '100%', maxHeight: '50vh', objectFit: 'contain' }}
                />
              </div>
              <div style={{ width: '50%' }}>
                <textarea
                  className="form-control"
                  rows="10"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Enter caption here"
                  style={{ width: '100%' }}
                />
                <Button className="btn btn-success mt-2" onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>
            <div style={{ width: '100%', marginTop: '20px' }}>
              <canvas ref={canvasRef} style={{ border: '1px solid black', display: 'none' }} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default PhotoSearch;
