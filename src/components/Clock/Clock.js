import React, { Component } from 'react';
import './Clock.scss';

export default class Clock extends Component {
  state = {
    // зберігаємо поточний час локальний
    time: new Date().toLocaleTimeString(),
  };
  // для підчистки зберігаємо айдішнік 
  intervalId = null;
  // монтуємо компонент
  componentDidMount() {
    console.log('setInterval');
    // при запуску інтервала записуємо айді(часи працюють кожну секунду)
    this.intervalId =setInterval(
      () => this.setState({ time: new Date().toLocaleTimeString() }),
      1000,
    );
  }
  // якщо компонент не розмонтовється то ця процедура не потрібна
  componentWillUnmount() {
    // я.к тільки розмонтуємо ми знімаємо інтервал
    clearInterval(this.intervalId);
  }

  render() {
    return <div className="Clock__face">{this.state.time}</div>;
  }
}
