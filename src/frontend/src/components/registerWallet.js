import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Web3 from 'web3';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CONTACT_ABI, CONTACT_ADDRESS } from './config';

const defaultRegistarValues = {
    nickname:"",
    city:"",
    country:"",
};

const Register = (props) => {

    const [formValues, setFormValues] = useState(defaultRegistarValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };
        // console.log(formValues);
        // const web3 = new Web3(window.ethereum);
        // window.ethereum.enable();
        // const discussionList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS); 
    const register = async() =>{
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        const accounts = await web3.eth.requestAccounts();
        const discussionList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS); 
        await discussionList.methods.registerNewUser(formValues.nickname, formValues.city, formValues.country).send({
            from: accounts[0],
            gasPrice: 0x1D91CA3600 
        });
    };
    return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TextField
                    name="nickname"
                    label="Nick Name"
                    type="nickname"
                    id="nickname"
                    onChange={handleInputChange}
                    />
                </Grid> 
                <Grid item xs={3}>
                    <TextField
                    name="city"
                    label="City"
                    type="city"
                    id="city"
                    onChange={handleInputChange}
                    />
                </Grid> 
                <Grid item xs={3}>
                    <TextField
                    name="country"
                    label="Country"
                    type="country"
                    id="country"
                    onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick = {register}
                    >
                    Register Now!
                    </Button>
                </Grid>     
            </Grid>
        </Box>
    );
  };
  
  export default Register;