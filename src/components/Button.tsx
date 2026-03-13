import React from "react";
import Button from '@mui/material/Button'
import { styled } from '@mui/system'

const MyButton = styled(Button)(({ theme }) => ({
    borderRadius: '30px',
    border: '0.5px solid #212121',
    color: '#212121',
    padding: '6px 13px',

    [theme.breakpoints.up('md')]: {
        padding: '14px 20px',
    },
}));

export default MyButton;