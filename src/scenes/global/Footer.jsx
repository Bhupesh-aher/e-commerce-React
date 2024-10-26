import React from 'react'
import { useTheme } from "@mui/material"
import {Box, Typography} from "@mui/material"
import { shades } from '../../theme'

const Footer = () => {

    const {
        palette: {neutral},
    } = useTheme();
    
  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
        <Box
            width="80%"
            margin="auto"
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap="30px"
            columnGap="clamp(20px, 30px, 40px)"
        >

            <Box width="clmap(20%, 30%, 40%)">
                <Typography variant='h4' fontWeight="bold" mb="30px" color={shades.secondary[500]}>ECOOMER</Typography>
                <div>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias nulla reprehenderit expedita laudantium facere voluptatum assumenda, impedit libero mollitia tempore?
                </div>
            </Box>
                <Box>
                    <Typography variant='h4' fontWeight="bold" mb="30px">About Us</Typography>
                    <Typography mb="30px">Carrers</Typography>
                    <Typography mb="30px">Our Stores</Typography>
                    <Typography mb="30px">Terms & Conditions</Typography>
                    <Typography mb="30px">Privacy Policy</Typography>
                </Box>

                <Box>
                    <Typography variant='h4' fontWeight="bold" mb="30px">Customer care</Typography>
                    <Typography mb="30px">Help Center</Typography>
                    <Typography mb="30px">Track Your Order</Typography>
                    <Typography mb="30px">Corporate & bulk Purchasing</Typography>
                    <Typography mb="30px">Returns & Refunds</Typography>
                </Box>
                <Box width="clmap(20%, 25%, 30%)">
                    <Typography variant='h4' fontWeight="bold" mb="30px">Contact Us</Typography>
                    <Typography mb="30px">East Mumbai, Maharashtra, India</Typography>
                    <Typography mb="30px">Email: ecommer@gmail.com</Typography>
                    <Typography mb="30px">(222)333-444</Typography>
                    
                 
            </Box>
        </Box>
    </Box>
  )
}

export default Footer