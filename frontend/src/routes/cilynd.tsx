import { useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Box } from '@mui/material';
import CilyndContact from '../components/cilynd/CilyndContact';
import CilyndHero from '../components/cilynd/CilyndHero';
import CilyndTabs from '../components/cilynd/CilyndTabs';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { seoMetadata } from '../config/seo-metadata';

export default function Cilynd() {
    useDocumentMeta(seoMetadata.cilynd);
    const [value, setValue] = useState(0);
    const tabsSectionRef = useRef<HTMLDivElement>(null);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const scrollToTab = (tabIndex: number) => {
        setValue(tabIndex);
        requestAnimationFrame(() => {
            tabsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    };

    return (
        <Box sx={{ py: { xs: 3, md: 6 } }}>
            <CilyndHero
                onCommitteeClick={() => scrollToTab(0)}
                onDocumentsClick={() => scrollToTab(1)}
            />
            <CilyndTabs
                value={value}
                onChange={handleChange}
                sectionRef={tabsSectionRef}
            />
            <CilyndContact />
        </Box>
    );
}
