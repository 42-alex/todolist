import React from 'react';
import '@testing-library/jest-dom';
import { ITodoListItem } from '../TodoListItem';
import TodoListItem from '../index';
import { render, screen, fireEvent } from '@testing-library/react';
import { iconSymbols } from '../../../constants';
import { Todo } from '../../../types';


const defaultProps: ITodoListItem = {
  todo: {
    id: '1111',
    title: 'To buy a pizza',
    importance: 'ordinary',
    isDone: false,
  },
  onClick: () => {},
  onEdit: () => {},
  onDelete: () => {},
}

const renderTodoListItem = (props: Partial<ITodoListItem> = {}) => {
  const componentProps = { ...defaultProps, ...props };

  return render(<TodoListItem {...componentProps} />);
}

describe('<TodoListItem />', () => {
  it('<TodoListItem /> renders with title, with unchecked icon and without importance ribbon', () => {
    renderTodoListItem();
    expect(screen.getByText(defaultProps.todo.title)).toBeInTheDocument();    // todo title
    expect(screen.getByText(iconSymbols.uncheckedIcon)).toBeInTheDocument();  // checked/unchecked icon
    expect(screen.queryByText(defaultProps.todo.importance)).not.toBeInTheDocument();     // importance ribbon
  })

  it('<TodoListItem /> renders with title, checked icon and with urgent ribbon', () => {
    const testTodo: Todo = {
      ...defaultProps.todo,
      isDone: true,
      importance: 'urgent',
    };
    renderTodoListItem({ todo: testTodo });
    expect(screen.getByText(defaultProps.todo.title)).toBeInTheDocument();  // todo title
    expect(screen.getByText(iconSymbols.checkedIcon)).toBeInTheDocument();  // checked/unchecked icon
    expect(screen.queryByText(testTodo.importance)).toBeInTheDocument();    // importance ribbon
  })

  it('<TodoListItem /> onClick() handler works well', () => {
    const onClick = jest.fn();
    renderTodoListItem({ onClick });
    fireEvent.click(screen.getByText(defaultProps.todo.title));
    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledWith(defaultProps.todo.id, !defaultProps.todo.isDone);
  })

  it('<TodoListItem /> onEdit() handler works well', () => {
    const onEdit = jest.fn();
    renderTodoListItem({ onEdit });
    fireEvent.click(screen.getByRole('button', { description: /Edit todo/i }));
    expect(onEdit).toBeCalledTimes(1);
    expect(onEdit).toBeCalledWith(defaultProps.todo.id);
  })

  it('<TodoListItem /> onDelete() handler works well', () => {
    const onDelete = jest.fn();
    renderTodoListItem({ onDelete });
    fireEvent.click(screen.getByRole('button', { description: /Delete todo/i }));
    expect(onDelete).toBeCalledTimes(1);
    expect(onDelete).toBeCalledWith(defaultProps.todo.id);
  })
});

