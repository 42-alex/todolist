import React from 'react';
import styles from './AddItem.module.scss';

const AddItem = () => {
  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const objectOfFields = Object.fromEntries(new FormData(target));
  }

  return (
    <div className={`container ${styles.pageWrapper}`}>
      <h1 className={styles.pageTitle}>Add new todo</h1>
      <form onSubmit={handleFormSubmit} className={styles.addForm}>
        <div className={styles.formGroup}>
          <label htmlFor="todoTitle">Title:</label>
          <input type="text" id="todoTitle" name="todoTitle" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="todoImportance">Importance:</label>
          <select id="todoImportance" name="todoImportance">
            <option>Ordinary</option>
            <option>Important</option>
            <option>Urgent</option>
          </select>
        </div>
        <button className={styles.submitButton}>Save</button>
      </form>
    </div>
  )
}

export default AddItem;
