import React, { useEffect, useState } from 'react'
import { Box, Typography, Tab, Tabs, useMediaQuery} from "@mui/material"
// import Item from "../../state"
import Item from "../../components/Item"
import { setItems  } from '../../state'
import { useDispatch, useSelector } from "react-redux"



const ShoppigList = () => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const [value, setValue] = useState("all")
    const items = useSelector((state)=> state.cart.items)
    const isNonMobile = useMediaQuery("(min-width:600px)")
    console.log("items", items);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    async function getItems() {
        const items = await fetch(
            `${apiUrl}/api/items?populate=image`, 
            {method: "GET"}
        );
        console.log(items);
        
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }
    
    useEffect(() => {
        getItems();
    }, [])

    const topRatedItems = items.filter(
        (item) => item.attributes.category === "topRated"
    )

    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === "newArrivals"
    )

    const bestSellersItems = items.filter(
        (item) => item.attributes.category === "bestSellers"
    )

    return (
        <Box width="80%" margin="80px auto">
            <Typography variant="h3" textAlign="center">
                Our Featured <b>Products</b>
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{sx: {display: isNonMobile ? "block" : "none"}}}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer" : {
                        flexWrap: "wrap"
                    }
                }}
            >

            <Tab label="ALL" value="all"/>
            <Tab label="NEW ARRIVALS" value="newArrivals"/>
            <Tab label="BEST SELLERS" value="bestSellers"/>
            <Tab label="TOP RATED" value="topRated"/>
            </Tabs>

            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
            {value === "all" && items.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`}/>
            ))}
            {value === "newArrivals" && newArrivalsItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`}/>
            ))}
            {value === "bestSellers" && bestSellersItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`}/>
            ))}
            {value === "topRated" && topRatedItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`}/>
            ))}

            </Box>

        </Box>
    )
}
 
export default ShoppigList 