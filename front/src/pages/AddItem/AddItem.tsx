import React, { useRef } from 'react';
import styles from './AddItem.module.scss';
import useAddTodo from '../../hooks/useAddTodo';
import {
  TodoImportance,
  TodoImportanceValues,
  TodoToCreate,
} from '../../types';
import { capitalize } from '../../helpers';

const AddItem = () => {
  const { mutate: addTodo } = useAddTodo(resetForm);
  const addFormRef = useRef<HTMLFormElement>(null);

  function resetForm()  {
    addFormRef?.current?.reset();
  }

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formFields = Object.fromEntries(new FormData(target)) as {[k: string]: string} ;
    const newTodo: TodoToCreate = {
      title: formFields.todoTitle,
      importance: formFields.todoImportance as TodoImportance,
    }
    addTodo(newTodo);
  }

  return (
    <div className={`container ${styles.pageWrapper}`}>
      <h1 className={styles.pageTitle}>Add new todo</h1>
      <form onSubmit={handleFormSubmit} className={styles.addForm} ref={addFormRef}>
        <div className={styles.formGroup}>
          <label htmlFor="todoTitle">Title:</label>
          <input type="text" id="todoTitle" name="todoTitle" minLength={2} maxLength={130} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="todoImportance">Importance:</label>
          <select id="todoImportance" name="todoImportance">
            { TodoImportanceValues.map(importanceTitle =>
              <option key={importanceTitle} value={importanceTitle}>
                {capitalize(importanceTitle)}
              </option>
            )}
          </select>
        </div>
        <button className={styles.submitButton}>Add</button>
      </form>
    </div>
  )
}

export default AddItem;
