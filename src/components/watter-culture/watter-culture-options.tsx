import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import cuidar_agua2 from '../../assets/watter-culture/cuidar_agua2.webp'





export default function WatterCultureOptions() {
  return (

    <>

   <Card variant='standard' sx={{display:'flex', width:'100dvh'}}>
    <CardContent>
          
   <Card variant='outlined' sx={{ maxWidth: 200, display:'block' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width='80px'
          image={cuidar_agua2}
          alt="green iguana"
          sx={{display:'block', aspectRatio:'16/9'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ¿Porque cuidar el agua?
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Ver video
        </Button>
      </CardActions>
    </Card>

    <Card variant='outlined' sx={{ maxWidth: 200, display:'block' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          width='80px'
          image={cuidar_agua2}
          alt="green iguana"
          sx={{display:'block', aspectRatio:'16/9'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ¿Porque cuidar el agua?
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Ver video
        </Button>
      </CardActions>
    </Card>




    </CardContent>
   </Card>
      
    </>
  );
}