import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import type { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import { useTheme, useMediaQuery } from "@mui/material";

import VerificacionStepIcon from "./VerificacionStepIcon";
import { verificacionSteps } from "./verificacionData";

const DashedConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    borderStyle: "dashed",
    borderColor: theme.palette.secondary.main,
  },
}));

export default function VerificacionSteps() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", mb: 4 }}>
        ¿Cómo funciona?
      </Typography>

      <Stepper
        orientation={isDesktop ? "horizontal" : "vertical"}
        alternativeLabel={isDesktop}
        connector={<DashedConnector />}
      >
        {verificacionSteps.map((step) => {
          const StepIconForStep = (props: StepIconProps) => (
            <VerificacionStepIcon icon={props.icon} Icono={step.Icono} />
          );

          return (
            <Step key={step.titulo}>
              <StepLabel
                slots={{ stepIcon: StepIconForStep }}
                optional={
                  <Typography variant="body2" color="text.secondary">
                    {step.descripcion}
                  </Typography>
                }
              >
                <Typography variant="h6">{step.titulo}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
