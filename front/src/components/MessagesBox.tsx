import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../redux/store';
import Message from './Message';
import styles from './MessagesBox.module.scss';

const MessageBox = () => {
  const messages = useSelector((state: RootStateType) => state.messages)

  if (!messages?.length) {
    return null;
  }

  return (
    <div className={`${styles.messagesBox} container`}>
      { messages.map(message => <Message key={message.id} message={message} />) }
    </div>
  )
};

export default MessageBox;
