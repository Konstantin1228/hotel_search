import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers';
import "./styles/reset.scss"
import "./styles/index.scss"

function App() {
  const { isUserLogged } = useSelector((store: RootState) => store.localStorageReducer)

  return (
    <Routes>
      {isUserLogged ?
        <Route element={<Home />} path={"/home"} />
        :
        <Route element={<Auth />} path={"/authorization"} />
      }
      <Route path='*' element={isUserLogged ? <Navigate to={"/home"} /> : <Navigate to={"/authorization"} />} />
    </Routes>
  );
}

export default App;
