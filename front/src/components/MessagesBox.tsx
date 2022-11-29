import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../redux/store';
import Message from './Message';
import styles from './MessagesBox.module.scss';
import { removeMessage } from '../redux/messages-reducer';

const MessageBox = () => {
  const messages = useSelector((state: RootStateType) => state.messages)
  const dispatch = useDispatch();

  const handleCloseMessage = (messageId: string) => {
    dispatch(removeMessage({ messageId }));
  }

  if (!messages?.length) {
    return null;
  }

  return (
    <div className={`${styles.messagesBox} container`} data-testid="messageBox">
      { messages.map(message => (
        <Message
          key={message.id}
          message={message}
          onClose={handleCloseMessage}
        />
      ))}
    </div>
  )
};

export default MessageBox;
