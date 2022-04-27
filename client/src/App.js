import { Layout } from "antd"
import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
// import fileTransferContract from "./contracts/fileTransfer.json"
import getWeb3 from "./getWeb3"
import "./App.css"
import NotFound from "./NotFound"

import Layout_List from "./Layout/Layout_List"
import Layout_From from './Layout/Layout_From'
import Layout_Personal from './Layout/Layout_Personal'
import Layout_Detial from "./Layout/Layout_Detial"
import Login from "./Layout/Login"
import Register from "./Layout/Register"

function App () {
  //web3.js connected to MetaMask and Conctract
  // const [web3, setWeb3] = useState({})
  // const [accounts, setAccounts] = useState([])
  // const [contract, setContract] = useState({})

  // useEffect(() => {
  //   async function getWbe3State () {
  //     try {
  //       setWeb3(await getWeb3())
  //       setAccounts(await web3.eth.getAccounts())
  //       const networkId = await web3.eth.net.getId()
  //       setContract(await web3.eth.Contract())
  //     } catch (error) {
  //       alert('Failed to load web3, accounts, or contract. Check console for details.')
  //       console.log(error)
  //     }
  //   }
  // }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Layout_List />}></Route>
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
