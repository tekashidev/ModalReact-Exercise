import React, { useState } from 'react';
import Modal from './Modal';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div>
      <h1>Modal Example</h1>
      <button onClick={toggleModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <Modal.Header title="Modal Title" />
        <Modal.Content>
          <p>This is the content of the modal.</p>
        </Modal.Content>
        <Modal.Footer callToActionLabel="Submit" />
      </Modal>
    </div>
  );
}

export default App;
