import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type MessageTypesType = 'success' | 'info' | 'error' | 'warning';

export type MessageType = {
  id: string
  type: MessageTypesType
  text: string
  showTime: number
}

type addMessagePayload = {
  type?: MessageTypesType
  text?: string
  showTime?: number
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState: [] as MessageType[],
  reducers: {
    addMessage: (state, action: { payload: addMessagePayload }) => {
      const newMessage = {
        id: uuidv4(),
        type: action.payload.type || 'error',
        text: action.payload.text || 'something went wrong',
        showTime: action.payload.showTime || 0
      }
      state.push(newMessage);
      return state;
    },
    removeMessage: (state, action: {payload: {messageId: string}}) => {
      return state.filter(message => message.id !== action.payload.messageId)
    }
  }
})

export const { addMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;