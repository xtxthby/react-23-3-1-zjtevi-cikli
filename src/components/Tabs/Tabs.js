import React, { PureComponent } from 'react';
//  альтернатива shouldComponentUpdate є PureComponent це чистий компонент
export default class Tabs extends PureComponent {
  state = {
    // зберігаємо індекс активної таби
    activeTabIdx: 0,
  };
  //   перевірка перед рендером

  // shouldComponentUpdate(nextProps, nextState) {
  // коли силки не рівні тоді перерендери тобіш при натисканні на ту саму кнопку 
  // розмітка не рендериться
  //   return nextState.activeTabIdx !== this.state.activeTabIdx;
  // }
  
  // сетимо активну табу по кліку
  setActiveTabIdx = idx => {
    this.setState({ activeTabIdx: idx });
  };

  render() {
    console.log(`Re-render @ ${Date.now()}`);

    const { activeTabIdx } = this.state;
    const { items } = this.props;
    // з усіх таб вибираємо активну
    const activeTab = items[activeTabIdx];

    return (
      <>
        <div> 
          {/* рендеримо таби по кліку */}
          {items.map((item, idx) => (
            <button
              type="button"
              // ключем слугує label
              key={item.label}
              onClick={() => this.setActiveTabIdx(idx)}
            >
              {/* назва таби */}
              {item.label}
            </button>
          ))}
        </div>

        <div>
          <h2>{activeTab.label}</h2>
          <p>{activeTab.content}</p>
        </div>
      </>
    );
  }
}