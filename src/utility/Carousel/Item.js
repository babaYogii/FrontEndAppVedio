import { Box, Paper, Typography } from '@mui/material'

function Item(item) {
    console.log(item.item.image)
    return (
        <>
            <Paper className='paperclass' elevation={0} style={{ marginLeft: '20px' }}>
                <img src={item.item.image} alt="Loading ..." />
            </Paper>
            <Box sx={{display:"flex",flexDirection:'column',justifyContent:'center',textAlign:'center', maxWidth:"400px",margin:'auto' }}>

            <Typography variant='h6'>{item.item.heading}</Typography>
            <Typography variant='body1'>{item.item.subheading}</Typography>
            </Box>
        </>

    )
}

export default Item;