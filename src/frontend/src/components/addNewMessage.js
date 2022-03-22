import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CONTACT_ABI, CONTACT_ADDRESS } from './config';
const defaultMessageValues = {
    mesg:"",
};

const AddNewMessage = (props) => {

    const [formValues, setFormValues] = useState(defaultMessageValues);
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        console.log(formValues.mesg);
    };
        // console.log(formValues);
        // const web3 = new Web3(window.ethereum);
        // window.ethereum.enable();
        // const discussionList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS); 
    const submitMessage = async() =>{
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        const accounts = await web3.eth.requestAccounts();
        const discussionList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS); 
        await discussionList.methods.postMessage(formValues.mesg).send({
            from: accounts[0],
            gasPrice: 0x1D91CA3600 
          });
    };
    return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    name="mesg"
                    label="Your Message"
                    type="mesg"
                    id="mesg"
                    onChange={handleInputChange}
                    />
                </Grid> 
                <Grid item xs={12}>
                    <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // onClick = {handleSubmit}
                    onClick={submitMessage}
                    >
                    Submit
                    </Button>
                </Grid>     
            </Grid>
        </Box>
    );
  };
  
  export default AddNewMessage;