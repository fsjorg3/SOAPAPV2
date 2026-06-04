import { Box, Container, Grid, Typography } from "@mui/material";

export default function InformacionFinanciera() {


    return (<>
        
        <Container >
            <Grid container spacing={2}>
                <Grid 
                size={{xs:12,md:3,lg:4}} 
                sx={{
                    minHeight: '80dvh',
                    boxShadow:'8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25)',
                    border:'1px solid grey'
                }}>

                    <Typography>
                        
                    </Typography>


                </Grid>
                <Grid 
                size={{xs:12,md:9,lg:8}} 
                sx={{
                    minHeight: '80dvh',
                    boxShadow:'8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.25)',
                    border:'1px solid grey'
                }}></Grid>
            </Grid>
        </Container>
      
    </>)
}