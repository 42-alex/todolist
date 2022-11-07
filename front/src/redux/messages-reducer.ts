import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { InferActionsTypes } from './store';

type MessageTypesType = 'success' | 'info' | 'error' | 'warning';

export type MessageType = {
  id: string
  type: MessageTypesType
  text: string
  showTime: number
}

type addMessagePayload = {
  type: MessageTypesType
  text: string
  showTime?: number
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState: [] as MessageType[],
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      return state.concat(action.payload);
    },
    removeMessage: (state, action: PayloadAction<{messageId: string}>) => {
      return state.filter(message => message.id !== action.payload.messageId)
    }
  }
})

export const addMessage = (payload: addMessagePayload) => (dispatch: DispatchType) => {
  const newMessage = {
    id: uuidv4(),
    type: payload.type || 'error',
    text: payload.text || 'something went wrong',
    showTime: payload.showTime || 0
  };
  dispatch(messageSlice.actions.addMessage(newMessage));

  // remove message after specified number of milliseconds
  if (payload.showTime) {
    setTimeout(
      () => dispatch(messageSlice.actions.removeMessage({ messageId: newMessage.id })),
      payload.showTime
    )
  }
}

type ActionType = InferActionsTypes<typeof messageSlice.actions>;
type DispatchType = (action: ActionType) => void;

export const { removeMessage } = messageSlice.actions;

export default messageSlice.reducer;
