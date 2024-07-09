// uploadfile.js
import React, { useState } from 'react';
import { useExtractDataFromPDF } from './hooks/useExtractDataFromPDF';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UploadPDF = () => {
  const { extractDataFromPDF } = useExtractDataFromPDF();
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      console.log('Uploading file:', file.name);
      await extractDataFromPDF(file);
      setFile(null);
      handleClose();
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Upload M-Pesa Statement
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select PDF File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} accept="application/pdf" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadPDF;
