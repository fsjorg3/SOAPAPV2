import type { ElementType } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import type { SvgIconProps } from "@mui/material/SvgIcon";

import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import FindInPageIcon from "@mui/icons-material/FindInPage";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

type IconComponent = ElementType<SvgIconProps>;
type Tone = "success" | "primary";

interface Step {
    numero: number;
    Icon: IconComponent;
    titulo: string;
    descripcion: string;
    tone: Tone;
}

const steps: Step[] = [
    {
        numero: 1,
        Icon: FindInPageIcon,
        titulo: "Identifica tu beneficio",
        descripcion: "Consulta las condiciones del Programa e identifica cuál aplica a tu situación.",
        tone: "success",
    },
    {
        numero: 2,
        Icon: FactCheckIcon,
        titulo: "Consulta los requisitos",
        descripcion: "Verifica los requisitos necesarios para acceder al beneficio.",
        tone: "success",
    },
    {
        numero: 3,
        Icon: MapsHomeWorkIcon,
        titulo: "Ubica tu punto de atención",
        descripcion: "Consulta la ubicación y horarios del módulo u oficina más cercana.",
        tone: "success",
    },
    {
        numero: 4,
        Icon: AccountBalanceWalletIcon,
        titulo: "Elige tu forma de pago",
        descripcion: "Selecciona la opción que más te convenga para realizar tu acuerdo o liquidación.",
        tone: "primary",
    },
];

function StepCard({ step }: { step: Step }) {
    const { Icon, titulo, descripcion, tone } = step;
    return (
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    alignItems: { xs: "flex-start", md: "center" },
                    textAlign: { xs: "left", md: "center" },
                    gap: { xs: 2, md: 0 },
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: `${tone}.light`,
                        color: tone === "primary" ? "primary.contrastText" : "#16461A",
                        width: { xs: 56, md: 72 },
                        height: { xs: 56, md: 72 },
                        flexShrink: 0,
                        mb: { xs: 0, md: 2 },
                    }}
                >
                    <Icon sx={{ fontSize: { xs: 28, md: 36 } }} />
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        sx={{
                            color: `${tone}.main`,
                            fontWeight: 700,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                        }}
                    >
                        {titulo}
                    </Typography>
                    <Box
                        sx={{
                            width: "32px",
                            height: "3px",
                            backgroundColor: "divider",
                            my: 1,
                            mx: { xs: 0, md: "auto" },
                        }}
                    />
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                        {descripcion}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}

export default function ComoYDondeSection() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ width: "100%", py: { xs: 5, md: 7 }, px: { xs: 2, md: 4 } }}>
            <Box sx={{ maxWidth: "1100px", mx: "auto" }}>
                {/* Title */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: { xs: 4, md: 5 } }}>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: { xs: "24px", md: "40px" },
                            fontWeight: "900",
                            color: "primary.main",
                            textTransform: "uppercase",
                        }}
                    >
                        ¿Cómo y dónde realizar tu trámite?
                    </Typography>
                    <Typography sx={{ color: "text.secondary", textAlign: "center", mt: 1, mb: 1.5 }}>
                        Sigue estos pasos para acceder a los beneficios del Programa.
                    </Typography>
                    <Box sx={{ width: "64px", height: "4px", backgroundColor: "secondary.main" }} />
                </Box>

                {isMobile ? (
                    <Timeline
                        sx={{
                            p: 0,
                            [`& .${timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0,
                            },
                        }}
                    >
                        {steps.map((step, index) => (
                            <TimelineItem key={step.numero}>
                                <TimelineSeparator>
                                    <TimelineDot
                                        sx={{
                                            bgcolor: "success.dark",
                                            color: "primary.contrastText",
                                            width: 40,
                                            height: 40,
                                            m: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "none",
                                            boxShadow: "none",
                                            fontWeight: 800,
                                        }}
                                    >
                                        {String(step.numero).padStart(2, "0")}
                                    </TimelineDot>
                                    {index < steps.length - 1 && (
                                        <TimelineConnector sx={{ bgcolor: "success.dark" }} />
                                    )}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: 1.5, px: 2 }}>
                                    <StepCard step={step} />
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                ) : (
                    <Box sx={{ position: "relative" }}>
                        <Box
                            sx={{
                                position: "absolute",
                                top: 36,
                                left: "12.5%",
                                right: "12.5%",
                                height: "3px",
                                backgroundColor: "success.dark",
                                zIndex: 0,
                            }}
                        />
                        <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }}>
                            {steps.map((step) => (
                                <Grid
                                    key={step.numero}
                                    size={3}
                                    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: "success.dark",
                                            color: "primary.contrastText",
                                            width: 56,
                                            height: 56,
                                            fontWeight: 800,
                                            fontSize: "1.1rem",
                                            mb: 2.5,
                                            border: "4px solid",
                                            borderColor: "background.default",
                                        }}
                                    >
                                        {String(step.numero).padStart(2, "0")}
                                    </Avatar>
                                    <StepCard step={step} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
