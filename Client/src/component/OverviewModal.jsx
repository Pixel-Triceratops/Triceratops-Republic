/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const modalStyles = {
  display: 'inline',
  position: 'fixed',
  borderRadius: '10px',
  height: 'fit-content',
  width: 'fit-content',
  minHeight: '1000px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rfga(195, 240, 247, .7)',
  padding: '50px',
  zIndex: 1000
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  grid-template-rows: 20px 1fr;
`;

const Button = styled.button`
  border: none;
  background: none;
  font-size: 2em;
  color: #A4BBCB;
  z-index: 1005
  &:focus{
    outline: none;
  }
  &:hover{
    color: #A4BBCB;
    transform: scale(1.5, 1.5);
  }
`;

const Image = styled.img`
  &:hover{
    transform: scale(2.5, 2.5);
    cursor: pointer;
  }
`;


// const background = productStyles.results[modalImageIndex].photos[0].url;
const OverviewModal = ({ open, onClose, productStyles }) => {
  const [modalImageIndex, setModalImageIndex] = useState(0);
  if (!open) return null;

  const handleNext = () => {
    if (modalImageIndex < productStyles.results.length - 1) {
      setModalImageIndex(((prevImage) => prevImage + 1));
    }
  };

  const handlePrevious = () => {
    if (modalImageIndex > 0) {
      setModalImageIndex((nextImage) => nextImage - 1);
    }
  };

  return (
    <>
      <div style={overlayStyle} />
      <div style={modalStyles}>
        <div>
          <Button onClick={onClose}>&#8855;</Button>
        </div>
        <div>
          <Button type="button" className="modalPrevBtn" onClick={handlePrevious}>&#8249;</Button>
          <Image src={productStyles.results[modalImageIndex].photos[0].url} alt="" height="900" width="700" />
          <Button type="button" className="modalNextBtn" onClick={handleNext}>&#8250;</Button>
        </div>
      </div>
    </>
  );
};

export default OverviewModal;
