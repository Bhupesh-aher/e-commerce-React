import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch} from "react-redux"
import {IconButton, Box, Typography, Button, Tabs, Tab} from "@mui/material"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { shades } from "../../theme"
import {addTocart} from "../../state"
// import { useParams } from "react-router-dom"
import Item from '../../components/Item'
import { useParams } from 'react-router-dom'

const ItemDetails = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const {itemID} = useParams();
  const id = useParams();
  const [value, setValue] = useState("description")
  const [count, setCount] = useState(1)
  const [item, setItem] = useState(null)
  const [items, setItems] = useState([]);
  // console.log(itemId);
  console.log(id);

  
  
  
 
  

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // particular item
  async function getItem() {
    const item = await fetch(
      `${apiUrl}/api/items/${itemID}?populate=image`,
      {method: "GET",
        credentials: 'include',
      }
    );
    // const item = await fetch(`http://localhost:1337/api/items/${itemID}?populate=image`,
    //   {method: "GET"}
    // )
    console.log(item);
    
    const itemJson = await item.json();
    console.log(itemJson);
    
    setItem(itemJson.data);
  }

  // suggested items
  async function getItems() {
    const items = await fetch(
      `${apiUrl}/api/items?populate=image`,
      {method: "GET"}
    )
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemID]) 

  // Access the Cloudinary URL directly
  const cloudinaryUrl = item?.attributes?.image?.data?.attributes?.formats?.medium?.url;

  return (
    
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
          <Box flex="1 1 40%" mb="40px">
          {cloudinaryUrl && (
            <img  alt={item?.name} width="100%" height="100%" 
            src={cloudinaryUrl}
            style={{objectFit: "contain"}}
          />
        )}

        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
            <Box display="flex" justifyContent="space-between">
              <Box>Home/Item</Box>
              <Box>Prev Next</Box>
            </Box>

            <Box m="65px 0 25px 0">
              <Typography variant="h3">{item?.attributes?.name}</Typography>
              <Typography>${item?.attributes?.price}</Typography>
              {/* <Typography sx={{mt: "20px"}}>{item?.attributes?.longDescription}</Typography> */}
            </Box>

            {/* COUNT AND BUTTON */}
            <Box display="flex" alignItems="center" minHeight="50px">
              <Box display="flex" alignItems="center" border={`1.5px solid ${shades.neutral[300]}`} mr="20px" p="2px 5px">
              <IconButton onClick={() => setCount(Math.max(count -1, 1))}>
                <RemoveIcon/>
                  </IconButton>
                                                     
                    <Typography sx={{p: "0 5px"}}>{count}</Typography>                          
                    <IconButton onClick={() => setCount(count + 1)}>
                    <AddIcon/>
                    </IconButton>
              </Box>
              <Button sx={{backgroundColor: "#222222", color: "white", borderRadius: 0, minWidth: "150px", padding: "10px 40px"}}
                onClick={() => dispatch(addTocart({item: {...item, count}}))}
            >
                ADD TO CART
                </Button>
            </Box>

            <Box>
              <Box m="20px 0 5px 0" display="flex" >
                <FavoriteBorderOutlinedIcon/>
                <Typography sx={{ml: "5px"}}>ADD TO WISHLIST</Typography>
              </Box>
              <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
            </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description"/>
          <Tab label="REVIEWS" value="reviews"/>
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription[0]?.children[0]?.text}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}

      <Box mt="50px" width="100%">
          <Typography variant='h3' fontWeight="bold">
            Related Products
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            columnGap="1.33%"
            justifyContent="space-between" 
          >
            {items.slice(0, 4).map((item, i) => (
              <Item key={`${item.name}-${i}`} item={item}/>
            ))}

          </Box>
      </Box>
    </Box>
  )
}

export default ItemDetails