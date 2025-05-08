import React from "react";
import Button from '@mui/material/Button'
import { styled } from '@mui/system'

const MyButton = styled(Button)(({ theme }) => ({
    borderRadius: '30px',
    border: '0.5px solid #212121',
    padding: '10px 20px',
    color: '#212121'
}));

export default MyButton;