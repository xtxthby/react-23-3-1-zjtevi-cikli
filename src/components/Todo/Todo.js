import React from 'react';
// для прикладу імпорт іконки
// import IconButton from '../IconButton';
// import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
// виносимо інпут і баттон і пешку з тудулиста
const Todo = ({ text, completed, onToggleCompleted, onDelete }) => (
  <>
    <input
      type="checkbox"
      className="TodoList__checkbox"
      checked={completed}
      onChange={onToggleCompleted}
    />
    <p className="TodoList__text">{text}</p>
    <button type="button" className="TodoList__btn" onClick={onDelete}>
      Удалить
    </button>
    {/* <IconButton>
      <DeleteIcon width = '32' height= '32' fill='#fff'/>
    </IconButton> */}
  </>
);

export default Todo;