import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer';
import Home from '../Home/Home';
import AddItem from '../AddItem';
import EditItem from '../EditItem';
import NoMatch from '../NoMatch';
import MessagesBox from '../../components/MessagesBox';
import Loader from '../../components/Loader';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit" element={<EditItem />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />

      <MessagesBox />
      <Loader />
    </div>
  );
}

export default App;