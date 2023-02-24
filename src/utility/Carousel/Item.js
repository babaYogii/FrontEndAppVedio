import { Box, Paper, Typography } from '@mui/material'

function Item(item) {
    
    return (
        <>
            <Paper className='paperclass' elevation={0} style={{display:'flex', alignItems:'center',justifyContent:'center' }}>
                <img src={item.item.image} alt="Loading ..." style={{width:'25rem',height:'23rem',objectFit:'cover',borderRadius:'48%'}} />
            </Paper>
            <Box sx={{display:"flex",flexDirection:'column',justifyContent:'center',textAlign:'center', maxWidth:"400px",margin:'auto' }}>

            <Typography variant='h6'>{item.item.heading}</Typography>
            <Typography variant='body1'>{item.item.subheading}</Typography>
            </Box>
        </>

    )
}

export default Item;