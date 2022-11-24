import React from 'react';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen,
  within
} from '@testing-library/react';
import { Provider } from 'react-redux';
import MessageBox from '../MessagesBox';
import { configureStore } from '@reduxjs/toolkit';
import messagesReducer, { addMessage } from '../../redux/messages-reducer';
import { StoreType } from '../../redux/store';


const createTestStore = () => configureStore({
  reducer: { messages: messagesReducer },
});

const renderWithReduxProvider = (
  ui: React.ReactElement,
  store: StoreType = createTestStore()
) => {

  return render(
      <Provider store={store}>
        {ui}
      </Provider>
    )
}

describe('MessageBox', () => {
  test('should be rendered with given messages from Redux store', () => {
    const store = createTestStore();
    store.dispatch(addMessage({
      type: 'info',
      text: 'some simple message',
    }));

    renderWithReduxProvider(
      <MessageBox />,
      store
    );
    expect(screen.queryByTestId('messageBox')).toBeInTheDocument();
  });

  test('should NOT be rendered (message array is empty)', () => {
    renderWithReduxProvider(<MessageBox />);
    expect(screen.queryByTestId('messageBox')).not.toBeInTheDocument();
  });

  test('close message button removes a message', async () => {
    const store = createTestStore();
    store.dispatch(addMessage({
      type: 'info',
      text: 'some simple message',
    }));
    store.dispatch(addMessage({
      type: 'error',
      text: 'network error',
    }));

    renderWithReduxProvider(
      <MessageBox />,
      store
    );
    let messagesBefore = screen.getAllByRole(/message/);
    expect(messagesBefore.length).toBe(2);

    const messages = screen.getAllByRole(/message/i);
    const firstMessageCloseButton = within(messages[0]).getByRole(/button/i, { name: /close message/i });
    fireEvent.click(firstMessageCloseButton);

    const messagesAfter = await screen.findAllByRole(/message/);
    expect(messagesAfter.length).toBe(1);
  });
});
