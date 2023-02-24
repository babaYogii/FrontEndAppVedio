import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from './Item'
import data from './Data.json'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function CarouselMain(props)
{
    

    return (
        <Carousel  NextIcon={<NavigateNextIcon/> }
                PrevIcon={<NavigateBeforeIcon/>} >
            {
                data.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

export default CarouselMain;