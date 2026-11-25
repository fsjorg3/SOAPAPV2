import type { ReactNode, RefObject, SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import CilyndDocumentsPanel from './CilyndDocumentsPanel';
import OrganigramaPanel from './OrganigramaPanel';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

interface CilyndTabsProps {
    value: number;
    onChange: (event: SyntheticEvent, newValue: number) => void;
    sectionRef: RefObject<HTMLDivElement | null>;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`cilynd-tabpanel-${index}`}
            aria-labelledby={`cilynd-tab-${index}`}
            tabIndex={0}
        >
            {value === index && <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `cilynd-tab-${index}`,
        'aria-controls': `cilynd-tabpanel-${index}`,
    };
}

export default function CilyndTabs({ value, onChange, sectionRef }: CilyndTabsProps) {
    return (
        <Box
            component="section"
            ref={sectionRef}
            aria-label="Secciones del Comité de Igualdad Laboral y No Discriminación"
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: 'background.paper',
                overflow: 'hidden',
                mb: { xs: 5, md: 8 },
                scrollMarginTop: { xs: 20, md: 32 },
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={onChange}
                    variant="scrollable"
                    scrollButtons={true}
                    allowScrollButtonsMobile
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="Navegación del Comité de Igualdad Laboral y No Discriminación"
                >
                    <Tab
                        {...a11yProps(0)}
                        icon={<GroupIcon />}
                        iconPosition="start"
                        label="Integración del Comité"
                    />
                    <Tab
                        {...a11yProps(1)}
                        icon={<DescriptionIcon />}
                        iconPosition="start"
                        label="Documentos y lineamientos"
                    />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <OrganigramaPanel />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <CilyndDocumentsPanel />
            </CustomTabPanel>
        </Box>
    );
}
