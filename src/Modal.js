import React, { Component, createContext } from 'react';
import './App.css';

const ModalContext = createContext();

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: props.isOpen || false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }  

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return (
      <ModalContext.Provider value={{ toggle: this.toggle }}>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
            onClick={this.toggle}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 8,
                minWidth: '300px',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        )}
      </ModalContext.Provider>
    );
  }
}

Modal.Header = class Header extends Component {
  static contextType = ModalContext;

  render() {
    const { title } = this.props;
    const { toggle } = this.context;

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', padding: '10px' }}>
        <h3>{title}</h3>
        <button onClick={toggle}>Close</button>
      </div>
    );
  }
};

Modal.Content = class Content extends Component {
  static contextType = ModalContext;

  render() {
    const { children } = this.props;
    return <div style={{ backgroundColor: 'white', padding: '10px' }}>{children}</div>;
  }
};

Modal.Footer = class Footer extends Component {
  static contextType = ModalContext;

  render() {
    const { callToActionLabel } = this.props;
    const { toggle } = this.context;

    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white', padding: '10px' }}>
        <button onClick={toggle} style={{ marginRight: '10px' }}>
          Cancel
        </button>
        <button
          onClick={() => {
            toggle();
            alert('OK');
          }}
        >
          {callToActionLabel}
        </button>
      </div>
    );
  }
};

export default Modal;
