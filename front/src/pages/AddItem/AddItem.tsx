import React, { useRef } from 'react';
import styles from './AddItem.module.scss';
import useAddTodo from '../../hooks/useAddTodo';
import {
  TodoImportance,
  TodoToCreate,
} from '../../types';
import { importanceValues } from '../../constants';
import Loader from '../../components/Loader';

const AddItem = () => {
  const {
    mutate: addTodo,
    isLoading
  } = useAddTodo();
  const addFormRef = useRef<HTMLFormElement>(null);

  const resetForm = () => {
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
    addTodo(newTodo, { onSettled: resetForm })
  }

  return (
    <div className={`container ${styles.pageWrapper}`}>
      { isLoading && <Loader /> }

      <h1 className={styles.pageTitle}>Add new todo</h1>
      <form onSubmit={handleFormSubmit} className={styles.addForm} ref={addFormRef}>
        <div className={styles.formGroup}>
          <label htmlFor="todoTitle">Title:</label>
          <input type="text" id="todoTitle" name="todoTitle" minLength={2} maxLength={130} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="todoImportance">Importance:</label>
          <select id="todoImportance" name="todoImportance">
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
