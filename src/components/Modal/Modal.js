import React, { Component } from 'react';
// метод який будує портал createPortal 
import { createPortal } from 'react-dom';
import './Modal.scss';
// вибіраю по айдішніку дів з public index.html
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  // метод componentDidMount яким ми вішаємо слухача подій
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }
  // метод componentWillUnmount очищає за собою при закритті
  // тобіш розмонтує модалу
  // знімає слухача події removeEventListener
  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  // колбек на закриття модалки за кнопкою
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');
          // onClose() це ссилка на {this.toggleModal} в Арр
      this.props.onClose();
    }
  };
  // закриття модалки при натисненні на бегдроп
  handleBackdropClick = event => {
    // console.log('Кликнули в бекдроп');

    console.log('currentTarget: ', event.currentTarget);
    console.log('target: ', event.target);

    // якщо event.target моє натискання - бегдроп (бо  currentTarge на бегдропі) 
    // .то закрий модалку 
    if (event.currentTarget === event.target) {
      // тут так само як  handleKeyDown
      this.props.onClose();
    }
  };

  render() {
    // викликаємо createPortal і рендеримо розмітку поверх всього віндовса
    //  за рахунок  modalRoot яка додасть посилання на дів в віндовс
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        {/* {this.props.children}за рахунок цього ми можемо в Арр в модалці 
        рендерити все що нам потрібно - тегі */}
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      // додає посилання діB на віндовс
      modalRoot,
    );
  }
}