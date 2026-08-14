import type { ElementType } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

type IconComponent = ElementType<SvgIconProps>;

interface Consideracion {
    numero: number;
    Icon: IconComponent;
    titulo: string;
    descripcion: React.ReactNode;
    bullets?: string[];
    tone?: "success" | "error";
}

const consideraciones: Consideracion[] = [
    {
        numero: 1,
        Icon: CalendarMonthIcon,
        titulo: "Vigencia",
        descripcion: (
            <>
                El programa estará vigente del{" "}
                <Box component="strong" sx={{ fontWeight: 700 }}>
                    1 de agosto al 31 de diciembre de 2026
                </Box>
                .
            </>
        ),
    },
    {
        numero: 2,
        Icon: AssignmentTurnedInIcon,
        titulo: "Cumplimiento de requisitos",
        descripcion:
            "Para acceder a los beneficios es necesario presentar y cumplir con los requisitos establecidos en el Programa.",
    },
    {
        numero: 3,
        Icon: CreditCardOffIcon,
        titulo: "Pagos realizados anteriormente",
        descripcion:
            "Los pagos realizados antes de la entrada en vigor del Programa no generan devolución ni compensación.",
    },
    {
        numero: 4,
        Icon: DoDisturbOnIcon,
        titulo: "¿A quiénes no aplican los beneficios?",
        descripcion: "Los beneficios no aplican a usuarios con:",
        tone: "error",
        bullets: [
            "Suministros pecuarios.",
            "Suministros de gobierno.",
            "Suministros público oficial.",
            "Suministros para asistencia social.",
            "Suministros público urbano.",
            "Derechos de factibilidad.",
            "Derechos de contratación.",
            "Derechos de reconexión.",
            "Cualquier otro uso distinto de los contemplados en el Programa.",
        ],
    },
    {
        numero: 5,
        Icon: GroupRemoveIcon,
        titulo: "Si ya recibiste otro beneficio",
        tone: "error",
        descripcion:
            "No podrán acceder al Programa quienes ya hayan gozado de cualquier otro beneficio durante el ejercicio operativo 2026.",
    },
];

export default function ConsideracionesImportantesSection() {
    return (
        <Box sx={{ width: "100%", py: { xs: 5, md: 7 }, px: { xs: 2, md: 4 } }}>
            <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
                {/* Title */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: { xs: 4, md: 5 } }}>
                    <Typography
                        sx={{
                            fontSize: { xs: "28px", md: "40px" },
                            fontWeight: "900",
                            color: "primary.main",
                            textTransform: "uppercase",
                        }}
                    >
                        Consideraciones importantes
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mt: 0.5, mb: 1.5 }}>
                        Información clave antes de acceder al programa
                    </Typography>
                    <Box sx={{ width: "64px", height: "4px", backgroundColor: "secondary.main" }} />
                </Box>

                {/* Cards */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    {consideraciones.map(({ numero, Icon, titulo, descripcion, bullets, tone = "success" }) => (
                        <Card
                            key={numero}
                            variant="outlined"
                            sx={{
                                p: { xs: 2, md: 3 },
                                borderRadius: "16px",
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 2, md: 3 } }}>
                                <Avatar
                                    sx={{
                                        bgcolor: `${tone}.light`,
                                        color: `${tone}.main`,
                                        width: { xs: 56, md: 64 },
                                        height: { xs: 56, md: 64 },
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon sx={{ fontSize: { xs: 28, md: 32 } }} />
                                </Avatar>

                                <Divider orientation="vertical" flexItem sx={{ borderColor: "divider" }} />

                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: "primary.main",
                                                color: "primary.contrastText",
                                                width: 32,
                                                height: 32,
                                                fontWeight: 700,
                                                fontSize: "0.95rem",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {numero}
                                        </Avatar>
                                        <Typography
                                            sx={{
                                                color: "primary.main",
                                                fontWeight: 700,
                                                fontSize: { xs: "1rem", md: "1.15rem" },
                                            }}
                                        >
                                            {titulo}
                                        </Typography>
                                    </Box>

                                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                                        {descripcion}
                                    </Typography>

                                    {bullets && (
                                        <List
                                            dense
                                            disablePadding
                                            sx={{
                                                mt: 1,
                                                columns: { xs: 1, sm: 2 },
                                                columnGap: 4,
                                            }}
                                        >
                                            {bullets.map((bullet) => (
                                                <ListItem
                                                    key={bullet}
                                                    disableGutters
                                                    sx={{
                                                        display: "list-item",
                                                        listStyleType: "disc",
                                                        ml: 2.5,
                                                        py: 0.25,
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={bullet}
                                                        slotProps={{
                                                            primary: {
                                                                variant: "body2",
                                                                sx: { color: "text.secondary" },
                                                            },
                                                        }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Box>

                {/* Important note */}
                <Alert severity="info" sx={{ mt: 3 }}>
                    <Box component="strong" sx={{ fontWeight: 700 }}>
                        Importante:
                    </Box>{" "}
                    Los beneficios están sujetos al cumplimiento de las condiciones y requisitos establecidos en el
                    Programa.
                </Alert>
            </Box>
        </Box>
    );
}
