import { ChangeEvent, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Add from './Components/Add';
import Signup from './Components/SignUp';
import Locations from './Components/Locations';
import Maps from './Components/Maps2';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import { download, upload } from './create-reference/storage';
import ImageUploader from './Components/ImageUploader';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import Edit from './Components/Edit';
import OpenLocation from './Components/OpenLocation';
import Background from './Components/HomePage';
import HomePage from './Components/HomePage';
import renderMaps from './Components/Map';

// function App() {

//   const [file, setfile] = useState('');



//   const fDownload = (e: ChangeEvent<HTMLButtonElement>) => {
//     console.log("in download!");
//     download();
//   }
//   // const f = (event:EventTarget) => {
//   //   console.log(file);
//   //   console.log(event);
//   //   // upload(e.target.result);
//   // }



const App: React.FC = () => {

  const f = (e: ChangeEvent<HTMLButtonElement>) => {
    console.log(file);
    console.log(e);
  }
  const fileChange = (e: ChangeEvent<HTMLButtonElement>) => {
    // console.log(e.target.)
  }
  const [file, setfile] = useState('');

  return (
    <>
      <ResponsiveAppBar />

      {/* <HomePage> */}
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
        <Route path='/location' Component={Locations} />
        <Route path='/add' Component={Add} />
        <Route path='/edit' Component={Edit} />
        <Route path='/maps' Component={Maps} />
        {/* </HomePage> */}
        <Route path='/openLocation' Component={OpenLocation} />
      </Routes>
    </>
  )
}

export default App
