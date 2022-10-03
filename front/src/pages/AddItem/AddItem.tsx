import React, { useState } from 'react';
import styles from './AddItem.module.scss';
import useAddTodo from '../../hooks/useAddTodo';
import {
  TodoImportance,
  TodoToCreate,
} from '../../types';
import { importanceValues } from '../../constants';
import Loader from '../../components/Loader';

const initialValues = {
  todoTitle: '',
  todoImportance: Object.keys(importanceValues)[0],
}

const AddItem = () => {
  const [todoTitle, setTodoTitle] = useState(initialValues.todoTitle);
  const [todoImportance, setTodoImportance] = useState(initialValues.todoImportance);
  const {
    mutateAsync: addTodo,
    isLoading
  } = useAddTodo();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTodoTitle(e.target.value)
  const handleImportanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => setTodoImportance(e.target.value)

  const resetForm = () => {
    setTodoTitle(initialValues.todoTitle);
    setTodoImportance(initialValues.todoImportance);
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: TodoToCreate = {
      title: todoTitle,
      importance: todoImportance as TodoImportance,
    }
    addTodo(newTodo).then(resetForm);
  }

  return (
    <div className={`container ${styles.pageWrapper}`}>
      { isLoading && <Loader /> }

      <h1 className={styles.pageTitle}>Add new todo</h1>
      <form onSubmit={handleFormSubmit} className={styles.addForm}>
        <div className={styles.formGroup}>
          <label htmlFor="todoTitle">Title:</label>
          <input
            type="text"
            id="todoTitle"
            value={todoTitle}
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
            value={todoImportance}
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
        <button className={styles.submitButton}>Add</button>
      </form>
    </div>
  )
}

export default AddItem;
