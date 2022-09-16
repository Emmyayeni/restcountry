import './App.css';
import * as React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from './component/Home';
// import Header from './component/Header';
import Detail from './component/Detail';
import Region from './component/Region';
import Search from './component/Search';


function App() {
  return (
  <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='country/:country' element={<Detail />}/>
      <Route path='Region/:region' element={<Region />}/>
      <Route path='search' element={<Search />}/>
      </Routes>
 </BrowserRouter>
  );
}

export default App;
