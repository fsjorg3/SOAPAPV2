import { Box, Typography, Grid, Card, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function Regularizate2026() {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden', bgcolor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Box sx={{
        bgcolor: 'primary.main',
        backgroundImage: 'url("/assets/regularizate_2026/tlaloc.png")',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: { xs: '100vh', md: 'calc(100vh - 156px)' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 0 },
        px: { xs: 2, md: 5 }
      }}>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, mb: { xs: 4, md: 0 }, pl: { xs: 0, md: '5%' }, pr: { xs: 0, md: '2%' } }}>
          <Typography variant="h1" sx={{
            color: '#f49300',
            fontSize: { xs: '3rem', sm: '4rem', md: '4rem', lg: '5.5rem' },
            fontWeight: 900,
            textTransform: 'uppercase',
            textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
            m: 0,
            textAlign: { xs: 'center', md: 'left' },
            lineHeight: 1
          }}>
            ¡REGULARIZA
          </Typography>

          <Box sx={{
            bgcolor: 'white',
            py: '0.5rem',
            px: '2rem',
            boxShadow: '0px 10px 15px rgba(23, 23, 23, 0.5), 0px 20px 40px rgba(53, 53, 53, 0.5)',
            borderRadius: '10px',
            mt: '0.5rem',
            transform: 'rotate(-2deg)'
          }}>
            <Typography variant="h1" sx={{
              color: '#b0354c',
              fontStyle: 'italic',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3.5rem', lg: '5rem' },
              fontWeight: 900,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              m: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              lineHeight: 1
            }}>
              <Box component="span" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, transform: 'translateY(-5px)' }}>Y</Box> AHORRA!
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '1.5rem', width: '100%', mt: '3rem' }}>
            <Box sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              bgcolor: 'rgba(0, 0, 0, 0.3)', p: '1.5rem', borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.1)', borderLeft: '5px solid #f49300',
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', width: '100%', flex: 1, justifyContent: 'space-between'
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 0.9 }}>
                <Typography sx={{ fontSize: { xs: '1.5rem', md: '1.2rem', lg: '1.5rem' }, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', textTransform: 'uppercase', fontWeight: 'bold' }}>HASTA</Typography>
                <Typography sx={{ fontSize: { xs: '5rem', md: '4rem', lg: '5.5rem' }, color: 'white', fontWeight: 900, m: 0, textShadow: '3px 3px 0 #b0354c, 0px 5px 10px rgba(0,0,0,0.5)' }}>
                  100<Box component="span" sx={{ fontSize: { xs: '2rem', md: '2rem', lg: '3rem' }, color: '#f49300', textShadow: 'none' }}>%</Box>
                </Typography>
                <Typography sx={{ fontSize: { xs: '1.5rem', md: '1.2rem', lg: '1.5rem' }, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', textTransform: 'uppercase', fontWeight: 'bold' }}>DESCUENTO</Typography>
              </Box>
              <Box sx={{ mt: '2rem', textAlign: 'left' }}>
                <Typography sx={{ color: '#f49300', fontSize: { xs: '1rem', md: '0.9rem', lg: '1rem' }, textTransform: 'uppercase', fontWeight: 'bold' }}>EN RECARGOS</Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: '1rem', fontSize: '0.6rem', textTransform: 'uppercase' }}>*APLICAN RESTRICCIONES</Typography>
              </Box>
            </Box>

            <Box sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              bgcolor: 'rgba(0, 0, 0, 0.3)', p: '1.5rem', borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.1)', borderLeft: '5px solid #42ac7c',
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', width: '100%', flex: 1
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
                <Typography sx={{ fontSize: { xs: '1.5rem', md: '1.2rem', lg: '1.5rem' }, color: '#fff', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', m: 0 }}>CONVENIOS</Typography>
                <Typography sx={{ fontSize: { xs: '1rem', md: '0.9rem', lg: '1rem' }, color: '#42ac7c', fontWeight: 'bold', mb: '1rem' }}>DE PAGO</Typography>
                <Typography sx={{ fontSize: { xs: '2.5rem', md: '2rem', lg: '2.5rem' }, color: 'white', fontWeight: 900, m: 0, mt: '1rem', textShadow: '2px 2px 0 #188780, 0px 5px 10px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  HASTA <Box component="span" sx={{ fontSize: { xs: '3.5rem', md: '3rem', lg: '4rem' }, color: '#f49300', lineHeight: 0.8 }}>24</Box>
                </Typography>
                <Typography sx={{ fontSize: { xs: '1.5rem', md: '1.2rem', lg: '1.5rem' }, color: '#fff', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.5)', m: 0 }}>MESES</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', pr: { xs: 0, md: '5%' } }}>
          <Box component="img" src="/assets/regularizate_2026/gota.png" alt="gota de agua sonriendo" sx={{ width: '100%', maxWidth: '400px', filter: 'drop-shadow(0px 0px 30px rgba(255, 255, 255, 0.8))', mb: '2rem' }} />
          <Box sx={{ p: '1.5rem', bgcolor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px', width: '100%', maxWidth: '500px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
            <Typography sx={{ color: '#fff', textAlign: 'center', fontSize: { xs: '1rem', lg: '1.1rem' }, mb: '0.5rem' }}>
              Reducción aplicable exclusivamente sobre los recargos.
            </Typography>
            <Typography sx={{ color: '#fff', textAlign: 'center', fontSize: { xs: '1rem', lg: '1.1rem' } }}>
              El monto del adeudo por los servicios se cobrará al 100%.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ¿En qué consiste este beneficio? */}
      <Box sx={{ bgcolor: 'white', py: '4rem', px: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 1000, color: '#771e36', textAlign: 'center', mb: '3rem', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, textTransform: 'uppercase' }}>
          ¿EN QUÉ CONSISTE ESTE BENEFICIO?
        </Typography>
        <Grid container spacing={4} sx={{ width: '100%', maxWidth: '1200px' }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 4, borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '1px solid #eee', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } }}>
              <Box sx={{ width: 80, height: 80, bgcolor: '#f49300', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto', mb: '1.5rem', boxShadow: '0 5px 15px rgba(244, 147, 0, 0.4)' }}>
                <Box component="img" src="/assets/regularizate_2026/lupa.png" sx={{ width: 40, height: 40, filter: 'brightness(0) invert(1)' }} />
              </Box>
              <Typography sx={{ color: '#771e36', fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }, fontWeight: 'bold', mb: '1rem', textTransform: 'uppercase' }}>Eliminación de recargos</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, textAlign: 'left' }}>
                <Box component="li" sx={{ color: '#555', fontSize: '1.1rem', mb: '0.8rem', position: 'relative', pl: '1.5rem', lineHeight: 1.4, '&::before': { content: '"•"', color: '#f49300', fontSize: '1.5rem', position: 'absolute', left: 0, top: '-4px' } }}>
                  Descuento de hasta el 100% en recargos, sujeto al análisis del adeudo y estrato del usuario.
                </Box>
                <Box component="li" sx={{ color: '#555', fontSize: '1.1rem', mb: '0.8rem', position: 'relative', pl: '1.5rem', lineHeight: 1.4, '&::before': { content: '"•"', color: '#f49300', fontSize: '1.5rem', position: 'absolute', left: 0, top: '-4px' } }}>
                  Aplica para usuarios domésticos y comerciales.
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 4, borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '1px solid #eee', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } }}>
              <Box sx={{ width: 80, height: 80, bgcolor: '#f49300', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto', mb: '1.5rem', boxShadow: '0 5px 15px rgba(244, 147, 0, 0.4)' }}>
                <Box component="img" src="/assets/regularizate_2026/efectivo.png" sx={{ width: 40, height: 40, filter: 'brightness(0) invert(1)' }} />
              </Box>
              <Typography sx={{ color: '#771e36', fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }, fontWeight: 'bold', mb: '1rem', textTransform: 'uppercase' }}>Facilidades de pago</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, textAlign: 'left' }}>
                <Box component="li" sx={{ color: '#555', fontSize: '1.1rem', mb: '0.8rem', position: 'relative', pl: '1.5rem', lineHeight: 1.4, '&::before': { content: '"•"', color: '#f49300', fontSize: '1.5rem', position: 'absolute', left: 0, top: '-4px' } }}>
                  Convenios de pago según la capacidad del usuario.
                </Box>
                <Box component="li" sx={{ color: '#555', fontSize: '1.1rem', mb: '0.8rem', position: 'relative', pl: '1.5rem', lineHeight: 1.4, '&::before': { content: '"•"', color: '#f49300', fontSize: '1.5rem', position: 'absolute', left: 0, top: '-4px' } }}>
                  Plazos de hasta 24 meses.
                </Box>
                <Box component="li" sx={{ color: '#555', fontSize: '1.1rem', mb: '0.8rem', position: 'relative', pl: '1.5rem', lineHeight: 1.4, '&::before': { content: '"•"', color: '#f49300', fontSize: '1.5rem', position: 'absolute', left: 0, top: '-4px' } }}>
                  Pagos iniciales desde el 20%.
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 4, borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '1px solid #eee', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } }}>
              <Box sx={{ width: 80, height: 80, bgcolor: '#f49300', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto', mb: '1.5rem', boxShadow: '0 5px 15px rgba(244, 147, 0, 0.4)' }}>
                <Box component="img" src="/assets/regularizate_2026/correcto.png" sx={{ width: 40, height: 40, filter: 'brightness(0) invert(1)' }} />
              </Box>
              <Typography sx={{ color: '#771e36', fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }, fontWeight: 'bold', mb: '1rem', textTransform: 'uppercase' }}>Opción real de regularización</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, textAlign: 'left' }}>
                <Box component="li" sx={{ color: '#555', fontSize: '1.1rem', mb: '0.8rem', position: 'relative', pl: '1.5rem', lineHeight: 1.4, '&::before': { content: '"•"', color: '#f49300', fontSize: '1.5rem', position: 'absolute', left: 0, top: '-4px' } }}>
                  Pago del consumo sin carga de recargos.
                </Box>
                <Box component="li" sx={{ color: '#555', fontSize: '1.1rem', mb: '0.8rem', position: 'relative', pl: '1.5rem', lineHeight: 1.4, '&::before': { content: '"•"', color: '#f49300', fontSize: '1.5rem', position: 'absolute', left: 0, top: '-4px' } }}>
                  Facilidades para ponerse al día.
                </Box>
                <Box component="li" sx={{ color: '#555', fontSize: '1.1rem', mb: '0.8rem', position: 'relative', pl: '1.5rem', lineHeight: 1.4, '&::before': { content: '"•"', color: '#f49300', fontSize: '1.5rem', position: 'absolute', left: 0, top: '-4px' } }}>
                  Opción viable para usuarios con adeudos acumulados.
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* ¿Quiénes pueden ser candidatos al programa? */}
      <Box sx={{ bgcolor: '#f8f9fa', py: '4rem', px: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 1000, color: '#771e36', textAlign: 'center', mb: '3rem', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, textTransform: 'uppercase' }}>
          ¿QUIÉNES PUEDEN SER CANDIDATOS AL PROGRAMA?
        </Typography>
        <Grid container spacing={4} sx={{ width: '100%', maxWidth: '1200px' }}>
          <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card sx={{ p: '2rem', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', borderLeft: '5px solid #b0354c', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-5px) scale(1.01)', boxShadow: '0 15px 35px rgba(0,0,0,0.15)' } }}>
              <Typography sx={{ color: '#444', fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, lineHeight: 1.6 }}>
                Son candidatos a este beneficio los <strong>usuarios domésticos, comerciales y habitantes de zonas prioritarias</strong> que presenten la principal concentración de adeudos.
              </Typography>
            </Card>
            <Card sx={{ p: '2rem', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', borderLeft: '5px solid #f49300', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-5px) scale(1.01)', boxShadow: '0 15px 35px rgba(0,0,0,0.15)' } }}>
              <Typography sx={{ color: '#444', fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, lineHeight: 1.6 }}>
                Esta es una oportunidad diseñada para facilitar que los usuarios con adeudos acumulados mayores a <strong>6 periodos</strong> se pongan al corriente con su cuenta, resultando de gran utilidad para quienes desean liquidar su deuda bajo condiciones accesibles, como pagos iniciales desde el 20% y plazos de hasta 24 meses, que protejan su economía.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component="img" src="/assets/regularizate_2026/gota2.png" alt="gota explicativa" sx={{ width: '90%', maxWidth: '250px', mb: '-2rem', zIndex: 1, filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))' }} />
            <Box sx={{ bgcolor: '#771e36', color: 'white', p: '3rem 2rem 2rem', borderRadius: '15px', width: '100%', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
              <Box>
                <Typography sx={{ color: '#f49300', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>PUNTOS DE ATENCIÓN</Typography>
                <Box component="a" href="/contacto" sx={{ display: 'block', textDecoration: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', mb: '0.5rem' }}>Oficinas de SOAPAP</Box>
                <Box component="a" href="https://www.aguapuebla.mx/lugares-de-pago-y-centros-de-atencion/" target="_blank" rel="noreferrer" sx={{ display: 'block', textDecoration: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>Agua De Puebla</Box>
              </Box>
              <Box>
                <Typography sx={{ color: '#f49300', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>OPCIONES DE PAGO</Typography>
                <Typography sx={{ display: 'block', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', mb: '0.5rem' }}>Ventanilla</Typography>
                <Box component="a" href="https://www.aguapuebla.mx/donde-pagar/" target="_blank" rel="noreferrer" sx={{ display: 'block', textDecoration: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>Plataforma digital</Box>
              </Box>
              <Box>
                <Typography sx={{ color: '#f49300', fontSize: '1rem', mb: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>REQUISITOS</Typography>
                <Typography sx={{ display: 'block', color: 'white', fontSize: '1.1rem', fontWeight: 'bold' }}>NIS</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Porcentajes de Reducción */}
      <Box sx={{ bgcolor: 'white', py: '4rem', px: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 1000, color: '#771e36', textAlign: 'center', mb: '3rem', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, textTransform: 'uppercase' }}>
          PORCENTAJES DE REDUCCIÓN DE RECARGOS
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '1000px', mb: '3rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
            <Box sx={{ width: '100%', minHeight: '70px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', p: '1rem', bgcolor: '#771e36' }}>
              <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }, fontWeight: 'bold', color: 'white', m: 0, textTransform: 'uppercase' }}>USUARIOS TIPO DOMÉSTICO</Typography>
            </Box>
            <TableContainer sx={{ overflowX: 'hidden' }}>
              <Table sx={{ overflowX: 'hidden' }}>
                <TableHead sx={{ bgcolor: '#f1f3f5', borderBottom: '2px solid #ddd' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' }, textAlign: 'left', pl: '1.5rem' }}>Estrato</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>Estratos<br />1, 2, 3 y 4</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>Estratos<br />5 y 6</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ overflowX: 'hidden' }}>
                  <TableRow sx={{ transition: 'all 0.3s ease', '&:hover': { bgcolor: '#fff2f5', transform: 'scale(1.02)', boxShadow: '0 5px 15px rgba(119, 30, 54, 0.15)' } }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }, pl: '1.5rem' }}>6 a 11<br />periodos de adeudo</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>50%</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>25%</TableCell>
                  </TableRow>
                  <TableRow sx={{ transition: 'all 0.3s ease', '&:hover': { bgcolor: '#fff2f5', transform: 'scale(1.02)', boxShadow: '0 5px 15px rgba(119, 30, 54, 0.15)' } }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }, pl: '1.5rem' }}>12 a 23<br />periodos de adeudo</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>100%</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>75%</TableCell>
                  </TableRow>
                  <TableRow sx={{ transition: 'all 0.3s ease', '&:hover': { bgcolor: '#fff2f5', transform: 'scale(1.02)', boxShadow: '0 5px 15px rgba(119, 30, 54, 0.15)' }, borderBottom: 'none' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }, pl: '1.5rem', borderBottom: 'none' }}>más de 24<br />periodos de adeudo</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' }, borderBottom: 'none' }}>100%</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' }, borderBottom: 'none' }}>100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box sx={{ width: '100%', maxWidth: '1000px', mb: '3rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
            <Box sx={{ width: '100%', minHeight: '70px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', p: '1rem', bgcolor: '#f49300' }}>
              <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }, fontWeight: 'bold', color: 'white', m: 0, textTransform: 'uppercase' }}>USUARIOS TIPO COMERCIAL E INDUSTRIAL</Typography>
            </Box>
            <TableContainer sx={{ overflowX: 'hidden' }}>
              <Table sx={{ overflowX: 'hidden' }}>
                <TableHead sx={{ bgcolor: '#f1f3f5', borderBottom: '2px solid #ddd' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' }, textAlign: 'left', pl: '1.5rem' }}>Estrato</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>II, III, IV, y V</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>VI, VII y VIII</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ overflowX: 'hidden' }}>
                  <TableRow sx={{ transition: 'all 0.3s ease', '&:hover': { bgcolor: '#fff9f0', transform: 'scale(1.02)', boxShadow: '0 5px 15px rgba(244, 147, 0, 0.15)' } }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }, pl: '1.5rem' }}>6 a 11<br />periodos de adeudo</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>50%</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>25%</TableCell>
                  </TableRow>
                  <TableRow sx={{ transition: 'all 0.3s ease', '&:hover': { bgcolor: '#fff9f0', transform: 'scale(1.02)', boxShadow: '0 5px 15px rgba(244, 147, 0, 0.15)' } }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }, pl: '1.5rem' }}>12 a 23<br />periodos de adeudo</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>100%</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>75%</TableCell>
                  </TableRow>
                  <TableRow sx={{ transition: 'all 0.3s ease', '&:hover': { bgcolor: '#fff9f0', transform: 'scale(1.02)', boxShadow: '0 5px 15px rgba(244, 147, 0, 0.15)' }, borderBottom: 'none' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }, pl: '1.5rem', borderBottom: 'none' }}>más de 24<br />periodos de adeudo</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' }, borderBottom: 'none' }}>100%</TableCell>
                    <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' }, borderBottom: 'none' }}>100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      {/* Convenios de Pago */}
      <Box sx={{ bgcolor: '#f8f9fa', py: '4rem', px: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 1000, color: '#771e36', textAlign: 'center', mb: '3rem', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, textTransform: 'uppercase' }}>
          CONVENIOS DE PAGO PARA ADEUDOS MAYORES A 6 PERIODOS
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '1000px', mb: '3rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
            <Box sx={{ width: '100%', minHeight: '70px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', p: '1rem', bgcolor: '#42ac7c' }}>
              <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }, fontWeight: 'bold', color: 'white', m: 0, textTransform: 'uppercase' }}>CONVENIOS DE PAGO</Typography>
            </Box>
            <TableContainer sx={{ overflowX: 'hidden' }}>
              <Table sx={{ overflowX: 'hidden' }}>
                <TableHead sx={{ bgcolor: '#f1f3f5', borderBottom: '2px solid #ddd' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' }, textAlign: 'left', pl: '1.5rem' }}>CLASIFICACIÓN</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>PAGO INICIAL</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>PLAZO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ overflowX: 'hidden' }}>
                  {[
                    ['Doméstico: Estratos 1, 2 y 3', '20%', 'HASTA 24 MESES'],
                    ['Doméstico: Estratos 4', '30%', 'HASTA 24 MESES'],
                    ['Doméstico: Estratos 5', '30%', 'HASTA 12 MESES'],
                    ['Doméstico: Estratos 6', '40%', 'HASTA 12 MESES'],
                    ['Comercial: I y II', '20%', 'HASTA 12 MESES'],
                    ['Comercial: III, IV y V', '30%', 'HASTA 8 MESES'],
                    ['Comercial: VI y VII', '40%', 'HASTA 3 MESES'],
                    ['Comercial: VIII', '50%', 'HASTA 3 MESES'],
                  ].map((row, idx, arr) => (
                    <TableRow key={idx} sx={{ transition: 'all 0.3s ease', '&:hover': { bgcolor: '#f0faf5', transform: 'scale(1.02)', boxShadow: '0 5px 15px rgba(66, 172, 124, 0.15)' }, ...(idx === arr.length - 1 ? { borderBottom: 'none' } : {}) }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }, pl: '1.5rem', ...(idx === arr.length - 1 ? { borderBottom: 'none' } : {}) }}>{row[0].split(':').map((t, i) => i === 0 ? <span key={i}>{t}:<br /></span> : t)}</TableCell>
                      <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' }, ...(idx === arr.length - 1 ? { borderBottom: 'none' } : {}) }}>{row[1]}</TableCell>
                      <TableCell align="center" sx={{ color: '#444', fontSize: { xs: '0.9rem', md: '1.1rem' }, ...(idx === arr.length - 1 ? { borderBottom: 'none' } : {}) }}>{row[2]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
