import React from 'react';
import {
  MessageType,
  removeMessage
} from '../redux/messages-reducer';
import styles from './Message.module.scss'
import { useDispatch } from 'react-redux';

const Message = (props: { message: MessageType }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeMessage({ messageId: props.message.id }));
  }

  return (
    <div className={`${styles.message} ${styles[props.message.type]}`}>
      <div>{props.message.text}</div>
      <button className={styles.closeButton} onClick={handleClick}>
        <svg className={styles.closeIcon} viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  );
};

export default Message;
