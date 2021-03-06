import React, { Component } from 'react';

import Backdrop from './Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            transform: this.props.show
              ? 'translate(-50%, -50%)'
              : 'translate(-50%, -300%)',
            opacity: this.props.show ? 1 : 0
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
