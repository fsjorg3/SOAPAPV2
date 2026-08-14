import type { ReactNode, RefObject, SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import CommitteeMembersPanel from './CommitteeMembersPanel';
import NormativeDocumentsPanel from './NormativeDocumentsPanel';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

interface EticaTabsProps {
    value: number;
    onChange: (event: SyntheticEvent, newValue: number) => void;
    sectionRef: RefObject<HTMLDivElement | null>;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`etica-tabpanel-${index}`}
            aria-labelledby={`etica-tab-${index}`}
            tabIndex={0}
            sx={{ outline: 'none' }}
        >
            {value === index && <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `etica-tab-${index}`,
        'aria-controls': `etica-tabpanel-${index}`,
    };
}

export default function EticaTabs({ value, onChange, sectionRef }: EticaTabsProps) {
    return (
        <Box
            component="section"
            ref={sectionRef}
            aria-label="Secciones del Comité de Ética"
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
                    aria-label="Navegación del Comité de Ética"
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
                        label="Lineamientos generales"
                    />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <CommitteeMembersPanel />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <NormativeDocumentsPanel />
            </CustomTabPanel>
        </Box>
    );
}
