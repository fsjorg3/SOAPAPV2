import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

import Carrusel from "../components/carrusel";
import puebla from '../assets/logos/nuevo_gobierno-estado.webp'
import soapap from '../assets/logos/soapap.webp'
import amor from '../assets/logos/amor_puebla.webp'



export default function Inicio() {



    return <>
        <Box sx={{ width: '100%', height: 'auto',}}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}>
                <Box component='img' src={puebla} sx={{ width: { xs: '40%', md: '25%' }, height: 'auto' }} />
                <Divider
                    component='div'
                    orientation="vertical"
                    flexItem
                    sx={{
                        borderRightWidth: {xs:'2', md:'4'},          // El grosor que configuramos antes
                        borderColor: 'primary.main', // Color opcional para resaltar
                        transform: 'rotate(7deg)',  // La magia de la inclinación
                        mx: 2,                       // Margen horizontal en el eje X (esencial para evitar choques)
                        height: {xs:'20px', md:'80px'},               // Reducir un poco la altura evita que las esquinas desborden el contenedor
                        marginTop:'auto',
                        marginBottom:'auto',
                        
                    }}
                />
                <Box component='img' src={soapap} sx={{ width: { xs: '40%', md: '25%' }, height: '90%' }} />
                <Divider
                    component='div'
                    orientation="vertical"
                    flexItem
                    sx={{
                        borderRightWidth: {xs:'2', md:'4'},          // El grosor que configuramos antes
                        borderColor: 'primary.main', // Color opcional para resaltar
                        transform: 'rotate(7deg)',  // La magia de la inclinación
                        mx: 2,                       // Margen horizontal en el eje X (esencial para evitar choques)
                        height: '80px',               // Reducir un poco la altura evita que las esquinas desborden el contenedor
                        marginTop:'auto',
                        marginBottom:'auto',
                        display:{xs:'none',md:'block'}
                        
                    }}
                />
                <Box component='img' src={amor} sx={{ width: '16%',display:{xs:'none',md:'block'} }} />
            </Box>

            <Carrusel></Carrusel>
        </Box>

    </>
}