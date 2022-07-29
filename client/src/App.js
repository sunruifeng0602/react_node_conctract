import React,{useState , useEffect} from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import fileTransferContract from "./contracts/fileTransfer.json"
import getWeb3 from "./getWeb3"
import "./App.css"
import NotFound from "./NotFound"

import Layout_List from "./Layout/Layout_List"
import Layout_From from './Layout/Layout_From'
import Layout_Personal from './Layout/Layout_Personal'
import Layout_Detial from "./Layout/Layout_Detial"
import Login from "./login/login"
import Register from "./login/register"

function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/list" element={<Layout_List />}></Route>
        <Route path="/detials" element={<Layout_Detial />}></Route>
        <Route path="/upload" element={<Layout_From />}></Route>
        <Route path="/personal" element={<Layout_Personal />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
