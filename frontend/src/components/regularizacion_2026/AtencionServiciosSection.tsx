import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const TITLE_GREEN = "#16461A";

interface CentroAtencion {
    nombre: string;
    href: string;
}

const centrosAtencion: CentroAtencion[] = [
    { nombre: "Amalucan", href: "https://www.google.com/maps/search/?api=1&query=Amalucan%2C%20Blvd.%20Xonacatepec%20Esq.%20Av.%20de%20las%20Torres%20S%2FN%2C%20Infonavit%20Amalucan%2C%20C.P.%2072310%2C%20Puebla%2C%20Pue." },
    { nombre: "Plaza Loreto", href: "https://www.google.com/maps/search/?api=1&query=Plaza%20Loreto%2C%20Calzada%20Ignacio%20Zaragoza%20No.%20266%2C%20Centro%20Comercial%20Plaza%20Loreto%20Local%202%20Zona%20G%2C%20C.P.%2072240%2C%20Puebla%2C%20Pue." },
    { nombre: "Castillotla", href: "https://www.google.com/maps/search/?api=1&query=Castillotla%2C%20Prol.%2011%20Sur%20Esq.%20113%20B%20Pte%20S%2FN%2C%20Col.%20Castillotla%2C%20C.P.%2072498%2C%20Puebla%2C%20Pue." },
    { nombre: "Paseo Bravo", href: "https://www.google.com/maps/search/?api=1&query=Paseo%20Bravo%2C%20Calle%2011%20Sur%20No.%20902%2C%20Local%20D%2C%20Col.%20Centro%2C%20C.P.%2072000%2C%20Puebla%2C%20Pue." },
    { nombre: "CIS Ocoyucan", href: "https://www.google.com/maps/search/?api=1&query=CIS%20Ocoyucan%2C%20Blvd.%20de%20los%20Volcanes%20Sur%2C%2072850%20Heroica%20Puebla%20de%20Zaragoza%2C%20Pue." },
    { nombre: "Plaza Crystal", href: "https://www.google.com/maps/search/?api=1&query=Plaza%20Crystal%2C%20Blvd.%20Valsequillo%20No.%20115%2C%20Local%205%20Zona%20C%2C%20Centro%20Comercial%20Plaza%20Crystal%2C%20Col.%20Residencial%20Boulevares%2C%20C.P.%2072440%2C%20Puebla%2C%20Pue." },
    { nombre: "Plaza del Sol", href: "https://www.google.com/maps/search/?api=1&query=Plaza%20del%20Sol%2C%20Av.%207%20Oriente%202008%2C%20Local%2038%20y%2042%2C%20Col.%20Azc%C3%A1rate%2C%20Centro%20Comercial%20Finanzas%2C%20Puebla%2C%20Pue." },
    { nombre: "Plaza San Pedro", href: "https://www.google.com/maps/search/?api=1&query=Plaza%20San%20Pedro%2C%20Plaza%20San%20Pedro%20Local%2014%2C%20Boulevard%20Norte%205%20de%20Mayo%20No.%202210%2C%20Col.%20Las%20Hadas%2C%20Puebla%2C%20Pue." },
    { nombre: "Vía San Ángel", href: "https://www.google.com/maps/search/?api=1&query=V%C3%ADa%20San%20%C3%81ngel%2C%20V%C3%ADa%20Atlixc%C3%A1yotl%20No.%201504%2C%20Local%20B22%2C%20Centro%20Comercial%20V%C3%ADa%20San%20%C3%81ngel%2C%20Puebla%2C%20Pue." },
    { nombre: "San Manuel", href: "https://www.google.com/maps/search/?api=1&query=San%20Manuel%2C%20Calle%20R%C3%ADo%20Grijalva%20No.%205312%2C%20Col.%20Jardines%20de%20San%20Manuel%2C%20C.P.%2072570%2C%20Puebla%2C%20Pue." },
    { nombre: "Plaza Aventura", href: "https://www.google.com/maps/search/?api=1&query=Plaza%20Aventura%2C%20Lateral%20Sur%20de%20la%20V%C3%ADa%20Atlixc%C3%A1yotl%205421%2C%20Local%2037%2C%20Plaza%20Aventura%20Rinc%C3%B3n%20de%20los%20Reyes%2C%2072830%2C%20Puebla%2C%20Pue." },
];

const formasDePago = ["Efectivo en cajas autorizadas", "Transferencia bancaria", "Plataforma en línea*"];

const bulletSx = {
    display: "list-item",
    listStyleType: "disc",
    ml: 2.5,
    py: 0.4,
    "&::marker": { color: "primary.main" },
} as const;

export default function AtencionServiciosSection() {
    return (
        <Box sx={{ width: "100%", py: { xs: 5, md: 7 }, px: { xs: 2, md: 4 } }}>
            <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
                {/* Title */}
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", mb: { xs: 4, md: 5 } }}>
                    <Typography
                        sx={{
                            fontSize: { xs: "28px", md: "40px" },
                            fontWeight: "900",
                            color: "primary.main",
                            textTransform: "uppercase",
                        }}
                    >
                        Atención y servicios
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mt: 0.5, mb: 1.5 }}>
                        Ubica tu módulo, consulta las formas de pago y accede a nuestros servicios en línea.
                    </Typography>
                    <Box sx={{ width: "64px", height: "4px", backgroundColor: "secondary.main" }} />
                </Box>

                <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
                    {/* Card 1: Centros de atención */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: "100%",
                                p: { xs: 2, md: 3 },
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 2, md: 2.5 } }}>

                                <Box sx={{ flex: 1, minWidth: 0, display:'flex', flexDirection:'column' }}>
                                    <Box sx={{display:'flex', alignItems:'center'}}>
                                        <LocationOnIcon sx={{ fontSize: { xs: 48, md: 56 }, color: TITLE_GREEN, flexShrink: 0 }} />
                                        <Typography sx={{ color: TITLE_GREEN, fontWeight: 700, fontSize: "1.1rem", mb: 1 }}>
                                            Centros de atención
                                        </Typography>
                                    </Box>
                                    <Box>
                                    <List disablePadding sx={{ columns: { xs: 1, sm: 2 }, columnGap: 3 }}>
                                        {centrosAtencion.map((centro) => (
                                            <ListItem key={centro.nombre} disableGutters sx={bulletSx}>
                                                <ListItemText
                                                    primary={
                                                        <Link
                                                            href={centro.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            variant="body2"
                                                        >
                                                            {centro.nombre}
                                                        </Link>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Card 2: Formas de pago */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: "100%",
                                p: { xs: 2, md: 3 },
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
                                <Avatar sx={{ bgcolor: "success.light", color: TITLE_GREEN, width: 56, height: 56 }}>
                                    <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />
                                </Avatar>
                                <Typography sx={{ color: TITLE_GREEN, fontWeight: 700, fontSize: "1.1rem" }}>
                                    Formas de pago
                                </Typography>
                            </Box>

                            <List disablePadding>
                                {formasDePago.map((forma) => (
                                    <ListItem key={forma} disableGutters sx={bulletSx}>
                                        <ListItemText
                                            primary={forma}
                                            slotProps={{ primary: { variant: "body2", sx: { color: "text.secondary" } } }}
                                        />
                                    </ListItem>
                                ))}
                            </List>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                                <InfoOutlinedIcon sx={{ color: TITLE_GREEN, fontSize: 22, flexShrink: 0, mt: 0.2 }} />
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    * Consulta disponibilidad y condiciones en los puntos de atención.
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Card 3: Servicios en línea */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: "100%",
                                p: { xs: 2, md: 3 },
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                <Avatar sx={{ bgcolor: "success.light", color: TITLE_GREEN, width: 56, height: 56 }}>
                                    <LanguageIcon sx={{ fontSize: 28 }} />
                                </Avatar>
                                <Typography sx={{ color: TITLE_GREEN, fontWeight: 700, fontSize: "1.1rem" }}>
                                    Servicios en línea
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: 1,
                                        p: 1.5,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
                                        <CreditCardIcon sx={{ color: TITLE_GREEN, fontSize: 28, flexShrink: 0 }} />
                                        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>Pago Fácil</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        Realiza tu pago en línea de forma rápida y segura.
                                    </Typography>
                                    <Button
                                        component="a"
                                        href="https://pagofacil.aguapuebla.mx/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        endIcon={<OpenInNewIcon />}
                                    >
                                        Ir a Pago Fácil
                                    </Button>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        gap: 1,
                                        p: 1.5,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: "12px",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
                                        <AssignmentTurnedInIcon sx={{ color: TITLE_GREEN, fontSize: 28, flexShrink: 0 }} />
                                        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>Regularízate</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        Inicia tu registro al Programa y obtén tu folio.
                                    </Typography>
                                    <Button
                                        component="a"
                                        href="https://regularizate.aguapuebla.mx/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        endIcon={<OpenInNewIcon />}
                                    >
                                        Ir a Regularízate
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
