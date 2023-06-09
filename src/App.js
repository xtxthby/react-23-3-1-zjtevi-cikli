import React, { Component } from 'react';
import shortid from 'shortid';
import Container from './components/Container';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import Filter from './components/TodoFilter';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
// імпортую іконку з додаванням як ReactComponent з будь яким імям AddIcon
import { ReactComponent as AddIcon } from './icons/add.svg';
// import Tabs from './components/Tabs';
// import tabs from './tabs.json';
// import Clock from './components/Clock';
// import initialTodos from './todos.json';

class App extends Component {
  state = {
    todos: [],
    filter: '',
    // початкове значення модального вікна
    showModal: false,
  };
  // метод монтування розмітки перший раз
  componentDidMount() {
    console.log('App componentDidMount');
      // в localStorage зберігається перша загрузка як строка
    const todos = localStorage.getItem('todos');
    // тут з неї робимо масив
    const parsedTodos = JSON.parse(todos);
    //  перевірка якщо є тудушки
    if (parsedTodos) {
      // записуємо в пустий масив поверх з localStorage збережені тудушки
      // при перезагрузці вони будуть збережені
      this.setState({ todos: parsedTodos });
    }
  }
  //  метод порівняння і виконання дії на ньому
  // попередній prevProps, prevState до моменту оновлення
  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
    // до оновлення
    console.log(prevState);
    // після оновлення
    console.log(this.state);

    // наступний масив
    const nextTodos = this.state.todos;
    // попередній масив
    const prevTodos = prevState.todos;
    // порівняння та запис в локал сторадж
    if (nextTodos !== prevTodos) {
      console.log('Обновилось поле todos, записываю todos в хранилище');
      // записую в сховище нове значення
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }
    // якщо масив тудушок став довше то закрий модалку, тобіш при сабміті
    // також довжина попередніх тудушек не повинна бути 0
    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
    //  при додаванні форми закривається модалка
    // вище інша можливість
    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(({ text }) =>
      text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };
  // метод відкривання модалкі
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      // якщо не фолс то тру
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        {/* <Tabs items={tabs} /> */}
        {/* {showModal && <Clock />} */}
        {/* <button type='button' onClick={this.toggleModal}>Відкрити модалку</button> */}
        {/* <button type='button' onClick={this.toggleModal}>Відкрити/сховати таймер</button> */}
        {/* <Clock/> */}
        
         {/* onClick={this.toggleModal} рендер по умові  тобіш закрити і відкрити .
         і  aria-label="Добавить todo" це атрибут доступності */}
        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>
         {/* рендеремо модалку по умові */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}

        {/* TODO: вынести в отдельный компонент */}
        <div>
          <p>Всего заметок: {totalTodoCount}</p>
          <p>Выполнено: {completedTodoCount}</p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
