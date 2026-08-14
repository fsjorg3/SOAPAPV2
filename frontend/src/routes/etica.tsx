import { useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Container } from '@mui/material';
import EticaGallery from '../components/etica/EticaGallery';
import EticaHero from '../components/etica/EticaHero';
import EticaTabs from '../components/etica/EticaTabs';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { seoMetadata } from '../config/seo-metadata';

export default function Etica() {
    useDocumentMeta(seoMetadata.etica);
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
        <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
            <EticaHero
                onCommitteeClick={() => scrollToTab(0)}
                onNormativeClick={() => scrollToTab(1)}
            />
            <EticaTabs
                value={value}
                onChange={handleChange}
                sectionRef={tabsSectionRef}
            />
            <EticaGallery />
        </Container>
    );
}
