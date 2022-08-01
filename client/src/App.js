import React,{useState , useEffect} from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import fileTransferContract from "./contracts/fileTransfer.json"
import getWeb3 from "./getWeb3"
import "./App.css"
import NotFound from "./NotFound"


import Login from "./login/login"
import Register from "./login/register"
import LayoutList from "./layoutSemi/layoutList"
import LayoutUpload from "./layoutSemi/layoutUpload"
import LayoutDetial from "./layoutSemi/layoutDetial"

function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LayoutDetial />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/list" element={<LayoutList />}></Route>
        <Route path="/detials" element={<LayoutDetial />}></Route>
        <Route path="/upload" element={<LayoutUpload />}></Route>
        {/* <Route path="/personal" element={<Layout_Personal />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/test" element= {<layoutList />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
