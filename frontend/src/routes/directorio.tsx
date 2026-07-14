import { useState } from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

interface employ {
  name: string;
  position: string;
  email: string;
  number?: string;
  extension?: number;
}

export default function Directorio() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Directorio: employ[] = [
    {
      name: "Morales Guerrero Josefina",
      position: "Dirección General",
      email: "direccion@soapap.gob.mx",
    },
    {
      name: "Pérez Perucho Luis Fernando",
      position: "Gerencia de Administración y Finanzas",
      email: "l_perez@soapap.gob.mx",
    },
    {
      name: "Ramírez Molinos Tatiana",
      position: "Gerencia de Saneamiento y Medio Ambiente",
      email: "tramirez@soapap.gob.mx",
    },
    {
      name: "Marroquín Ortíz Daniel Hiram",
      position: "Gerencia de Proyectos y Supervisión de Obra e Infraestructura",
      email: "dmarroquin@soapap.gob.mx",
    },
    {
      name: "Rodríguez Palacios Dulce Beatríz",
      position: "Gerencia de Asuntos Legales",
      email: "drodriguez@soapap.gob.mx",
    },
    {
      name: "Dattoli Mora Miguel Ángel",
      position: "Gerencia de Supervisión Técnica de los Servicios",
      email: "mdattoli@soapap.gob.mx",
    },
    {
      name: "García Casiano Mónica Alejandra",
      position: "Depto. de Comunicación Social y Vinculación",
      email: "mgarcia@soapap.gob.mx",
    },
    {
      name: "Canseco Carrera Guillermina",
      position: "Depto. de Tesorería y Contabilidad",
      email: "gcanseco@soapap.gob.mx",
    },
    {
      name: "Regino Munguía Cecilia",
      position: "Depto. de Personal y Recursos Materiales",
      email: "cregino@soapap.gob.mx",
    },
    {
      name: "Sánchez Chavez Selene Estefania",
      position: "Depto. de Planeacion y Presupuesto",
      email: "ssanchez@soapap.gob.mx",
    },
    {
      name: "Huerta Sánchez Felipe",
      position: "Depto. de Adquisiciones y Archivo",
      email: "fhuerta@soapap.gob.mx",
    },
    {
      name: "Pérez Santa María Edmundo",
      position: "Depto. de Informática",
      email: "esantamaria@soapap.gob.mx",
    },
    {
      name: "Manuatl Medina Víctor Hugo",
      position: "Depto. de Oficialía de Partes",
      email: "vmanuatl@soapap.gob.mx",
    },
    {
      name: "Luna Rivera Josué Francisco",
      position: "Depto. de Calidad Técnica en el Servicio de Drenaje",
      email: "jluna@soapap.gob.mx",
    },
    //{
    //  name: "Castro Guerrero Roberto Carlos",
    //  position: "Depto. de Atención y Supervisión a Contingencias",
    //  email: "rcastro@soapap.gob.mx",
    //},
    {
      name: "Martínez Bret Héctor",
      position: "Depto. de Supervisión de Obras e Infraestructura",
      email: "hmartinez@soapap.gob.mx",
    },
    {
      name: "Milán Corsino Kelly Ghisleine",
      position: "Depto. de Normas",
      email: "kmilan@soapap.gob.mx",
    },
    {
      name: "Victoria Jiménez Cristina Guadalupe",
      position: "Depto. de Actos de Autoridad e Imposición de Sanciones",
      email: "cjimenez@soapap.gob.mx",
    },
    {
      name: "Coyotzi Gómez Monica",
      position: "Depto. de Calidad Técnica en el Servicio de Agua Potable",
      email: "mcoyotzi@soapap.gob.mx",
    },
    {
      name: "Becerril Ramírez Adrián",
      position: "Depto. de Supervisión Comercial y Atención Ciudadana",
      email: "abecerril@soapap.gob.mx",
    },
  ];

  const paginatedDirectorio = Directorio.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Title */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          marginBottom: { xs: "20px", md: "40px" },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "900",
            color: "primary.main",
            borderBottom: "2px solid secondary.main",
          }}
        >
          Directorio Institucional
        </Typography>
        <Box
          sx={{
            width: { xs: "25%", md: "15%" },
            height: "5px",
            backgroundColor: "secondary.main",
          }}
        />
      </Box>

      {isMobile ? (
        <Stack spacing={2} sx={{ mb: 2 }}>
          {paginatedDirectorio.map((row, index) => (
            <Card key={index} variant="outlined">
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, color: "primary.main" }}>
                  {row.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "secondary.main", mt: 0.5 }}>
                  {row.position}
                </Typography>
              </Box>
              <Divider />
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon sx={{ color: "primary.main" }} />
                    <Typography variant="body2" component='a' href={`mailto:${row.email}`} sx={{ color: "text.primary" }}>
                      {row.email}
                    </Typography>
                  </Box>
                  {row.number && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneIcon sx={{ color: "primary.main" }} />
                      <Typography variant="body2" sx={{ color: "text.primary" }}>
                        {row.number}
                        {row.extension ? ` Ext. ${row.extension}` : ""}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="Directorio del personal">
            <TableHead sx={{ backgroundColor: "grey.100" }}>
              <TableRow>
                <TableCell sx={{ backgroundColor: "transparent", color: "primary.dark" }}>
                  Nombre del funcionario
                </TableCell>
                <TableCell sx={{ backgroundColor: "transparent", color: "primary.dark" }}>
                  Cargo/puesto
                </TableCell>
                <TableCell sx={{ backgroundColor: "transparent", color: "primary.dark" }}>
                  Método de contacto
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDirectorio.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary" }}>
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {row.position}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <EmailIcon sx={{ color: "primary.main" }} />
                        <Typography variant="body2" component='a' href={`mailto:${row.email}`} sx={{ color: "text.primary" }}>
                          {row.email}
                        </Typography>
                      </Box>
                      {row.number && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <PhoneIcon sx={{ color: "primary.main" }} />
                          <Typography variant="body2" sx={{ color: "text.primary" }}>
                            {row.number}
                            {row.extension ? ` Ext. ${row.extension}` : ""}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 25]}
        component="div"
        count={Directorio.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={isMobile ? "Filas:" : "Filas por página:"}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
        sx={{
          overflow: "hidden",
          width: "100%",
          "& .MuiTablePagination-toolbar": {
            px: isMobile ? 1 : 2,
            flexWrap: isMobile ? "wrap" : "nowrap",
            justifyContent: isMobile ? "center" : "flex-end",
          },
          "& .MuiTablePagination-selectLabel": {
            margin: 0,
            fontSize: "0.875rem",
          },
          "& .MuiTablePagination-displayedRows": {
            margin: 0,
            fontSize: "0.875rem",
          },
          "& .MuiTablePagination-actions": {
            marginLeft: isMobile ? 1 : 2,
          },
        }}
      />
    </Container>
  );
}
