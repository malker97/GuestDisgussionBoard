import { useEffect, useState } from 'react';
import Web3 from 'web3';
import AddNewMessage from './addNewMessage';
import Register from './registerWallet';
import ViewMessages from './viewMessages';

const Home = (props) => {
    const [account, setAccount] = useState(); // state variable to set account.
    useEffect(() => {
        async function load() {
            if (typeof window.ethereum !== 'undefined')  console.log('MetaMask is installed!');
            else console.log('Please install MetaMask or another browser-based wallet');
            const web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);
            console.log(accounts);
        }
        load();
       }, []);
    return (
        <div>
            <p>Your account is: {account}</p>
            <Register/>
            <AddNewMessage/>
            <ViewMessages/>

        </div>
    );
  };
  
  export default Home;