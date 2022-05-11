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
import Login from "./Layout/Login"
import Register from "./Layout/Register"

function App () {
  //web3.js connected to MetaMask and Conctract
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState({})

  useEffect(() => {
    async function getWbe3State () {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const depployedNetwork = fileTransferContract.networks[networkId];
        const instance = new web3.eth.Contract(
          fileTransferContract.abi,
          depployedNetwork && depployedNetwork.address,
        );
        setWeb3(web3)
        setAccounts(accounts)
        setContract(instance)
      } catch (error) {
        alert('Failed to load web3, accounts, or contract. Check console for details.')
        console.log(error)
      }
    }
    getWbe3State()
  }, [])

  // console.log(web3)
  // console.log(accounts)
  // console.log(contract)

  if(!web3){
    return (
      <div>
        <p>
          loading web3....
        </p>
      </div>
    )
  }else{
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
}

export default App
