import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from '../Home';
import AddItem from '../AddItem';
import EditItem from '../EditItem/EditItems';
import NoMatch from '../NoMatch';
import MessagesBox from '../../components/MessagesBox';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:todoId" element={<EditItem />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>

      <MessagesBox />
    </div>
  );
}

export default App;