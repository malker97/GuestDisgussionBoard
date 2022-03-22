import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CONTACT_ABI, CONTACT_ADDRESS } from './config';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const ViewMessages = (props) => {
    const [account, setAccount] = useState(); // state variable to set account.
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        async function load() {
            const web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            const discussionList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
            const messages = await discussionList.methods.getMsgs().call(); 
            console.log(messages[1].mesg);
            setMessages(messages);   
        }
        load();
       }, []);
    return (
        <div>
            <p>ViewMessages</p>
            <Grid container spacing={3}>
                {messages.map((message, index) => (
                    <Grid key={index}  item xs={10}>
                        <Card variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {message.msgowner}
                                </Typography>
                                <Typography variant="body2">
                                    {message.mesg}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
  };
  
  export default ViewMessages;