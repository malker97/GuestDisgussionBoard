import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Web3 from 'web3';
import { NFT_CONTACT_ADDRESS, NFT_CONTACT_ABI } from './NFTconfig';
const MintNFT = (props) => {
    const mintOne = async() =>{
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        const accounts = await web3.eth.requestAccounts();
        const nftContract = new web3.eth.Contract(NFT_CONTACT_ABI, NFT_CONTACT_ADDRESS);
        await nftContract.methods.mintNicMeta(1).send(
            {
                from: accounts[0],
                // gasPrice: 0x1D91CA3600,
                // 这个地方默认是的wei
                value: 100000000000000000
            }
        ); 
    };
    return(
        <div>
                <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // onClick = {handleSubmit}
                    onClick={mintOne}
                    >
                    Mint!
                </Button>
        </div>
    );
};

export default MintNFT;