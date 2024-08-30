import React, { useState, useRef } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import { Modal, Button } from 'react-bootstrap';
import { Canvas as FabricCanvas, Image as FabricImage, Text as FabricText } from 'fabric';

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
  };

  const handleSaveCaption = () => {
    if (!selectedImage) return;

    const canvas = new FabricCanvas(canvasRef.current);
    FabricImage.fromURL(selectedImage.urls.regular, (img) => {
      canvas.setWidth(img.width);
      canvas.setHeight(img.height);

      img.scaleToWidth(img.width);
      canvas.add(img);

      const text = new FabricText(caption, {
        left: 10,
        top: img.height / 2,
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

      // Close modal and clear state
      handleCloseModal();
    });
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'image_with_caption.png';
    link.click();
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
                />
                <Button className="btn btn-primary mt-2" onClick={handleSaveCaption}>
                  Save Caption
                </Button>
                <Button className="btn btn-success mt-2 ml-2" onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
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
