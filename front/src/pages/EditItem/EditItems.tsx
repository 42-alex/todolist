// file was renamed from "EditItem.tsx" to "EditItems.tsx"
// cause: typescript didn't work if we had the previous name

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditItem.module.scss';
import useFetchTodos from '../../hooks/useFetchTodos';
import { importanceValues } from '../../constants';
import { todosAPI } from '../../api/todos-api';

const EditItem = () => {
  const { todoId } = useParams();
  const {
    data: todos = []
  } = useFetchTodos();
  const currentTodo = todos.find(todo => todo.id === todoId);
  const [todoState, setTodoState] = useState({
    title: currentTodo?.title || '',
    importance: currentTodo?.importance || '',
    isDone: currentTodo?.isDone || false,
  })
  const navigate = useNavigate();

  function handleFormSubmit (e: React.FormEvent) {
    e.preventDefault();
    const changedTodo = {
      ...todoState,
      id: todoId as string,
    }
    todosAPI.updateTodo(changedTodo)
      .then(() => {
        navigate('/');
      })
  }

  function handleTitleChange (e: React.ChangeEvent<HTMLInputElement>) {
    setTodoState({
      ...todoState,
      title: e.target.value
    });
  }

  function handleImportanceChange (e: React.ChangeEvent<HTMLSelectElement>) {
    setTodoState({
      ...todoState,
      importance: e.target.value,
    });
  }

  function handleIsDoneChange (e: React.ChangeEvent<HTMLInputElement>) {
    setTodoState({
      ...todoState,
      isDone: e.target.checked
    });
  }

  function handleBackButtonClick () {
    navigate('/');
  }

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Edit your todo</h1>
      <div className={styles.editFormWrapper}>
        <form onSubmit={handleFormSubmit} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label htmlFor="todoTitle">Title:</label>
            <input
              type="text"
              id="todoTitle"
              name="title"
              value={todoState.title}
              onChange={handleTitleChange}
              minLength={2}
              maxLength={130}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="todoImportance">Importance:</label>
            <select
              id="todoImportance"
              name="importance"
              value={todoState.importance}
              onChange={handleImportanceChange}
            >
              { Object.entries(importanceValues)
                .map(
                  ([importanceKey, importanceTitle]) =>
                    <option key={importanceKey} value={importanceKey}>
                      {importanceTitle}
                    </option>
                )
              }
            </select>
          </div>
          <div className={`${styles.formGroup} ${styles.formGroupCheckbox}`}>
            <input
              type="checkbox"
              id="todoIsDone"
              name="isDone"
              checked={todoState.isDone}
              onChange={handleIsDoneChange}
            />
            <label htmlFor="todoIsDone">Is todo done</label>
          </div>
          <div className={styles.actions}>
            <button className={styles.submitButton}>Save</button>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={handleBackButtonClick}
            >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditItem;
