import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import MessageBox from '../MessagesBox';
import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from '../../redux/messages-reducer';
import type { MessageType } from '../../redux/messages-reducer';
import { RootStateType } from '../../redux/store';


const initialMessages: MessageType[] = [
  {
    id: 'id1',
    type: 'info',
    text: 'some simple message',
    showTime: 0,
  },
  {
    id: 'id2',
    type: 'error',
    text: 'network error',
    showTime: 0,
  },
];

const renderWithReduxProvider = (
  ui: React.ReactElement,
  preloadedState: Partial<RootStateType> = {}
) => {

  const store = configureStore({
    reducer: { messages: messagesReducer },
    preloadedState
  });

  return render(
      <Provider store={store}>
        {ui}
      </Provider>
    )
}

describe('MessageBox', () => {
  test('should be rendered with given messages from Redux store', () => {
    renderWithReduxProvider(
      <MessageBox />,
      { messages: initialMessages }
    );
    screen.debug();
    expect(screen.queryByTestId('messageBox')).toBeInTheDocument();
  });

  test('should NOT be rendered', () => {
    const initialMessages: MessageType[] = [];
    renderWithReduxProvider(
      <MessageBox />,
      { messages: initialMessages }
    );
    expect(screen.queryByTestId('messageBox')).not.toBeInTheDocument();
  });

  test('close message button removes a message', async () => {
    renderWithReduxProvider(
      <MessageBox />,
      { messages: initialMessages }
    );
    let messagesBefore = screen.getAllByRole(/message/);
    expect(messagesBefore.length).toBe(2);

    const buttons = screen.getAllByRole(/button/);
    fireEvent.click(buttons[0]);
    const messagesAfter = await screen.findAllByRole(/message/);
    expect(messagesAfter.length).toBe(1);
  });
});