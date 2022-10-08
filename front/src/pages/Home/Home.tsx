import React from 'react';
import styles from './Home.module.scss';
import Loader from '../../components/Loader';
import useUpdateTodo from '../../hooks/useUpdateTodo';
import useFetchTodos from '../../hooks/useFetchTodos';
import useDeleteTodo from '../../hooks/useDeleteTodo';
import { Link, useNavigate } from 'react-router-dom';
import TodoListItem from '../../components/TodoListItem';


const Home = () => {

  const {
    data: todos = [],
    isFetching,
  } = useFetchTodos();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const navigate = useNavigate()

  const handleTodoClick = (id: string, isDone: boolean) => {
    updateTodo({ id, isDone });
  }

  const handleEditButtonClick = (todoId: string) => {
    navigate(`/edit/${todoId}`);
  }

  const handleDeleteButtonClick = (todoId: string) => {
    deleteTodo(todoId);
  }

  return (
    <div className="container">
      { isFetching && <Loader /> }

      <h1 className="pageTitle">To-do list</h1>
      { todos.length > 0 &&
        <ul className={styles.todosList}>
          {todos.map(todo => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onClick={handleTodoClick}
              onEdit={handleEditButtonClick}
              onDelete={handleDeleteButtonClick}
            />
          ))}
        </ul>
      }

      <Link
        to="/add"
        className={styles.addButton}
        title="Add new todo"
      >+</Link>
    </div>
  )
}

export default Home;
