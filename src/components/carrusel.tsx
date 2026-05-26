import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { type EmblaCarouselType } from 'embla-carousel';
import { Box, IconButton, Stack, Typography, ButtonBase } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router';

export interface SlideData {
  src: string;
  alt?: string;
  url?: string;
}

interface EmblaCarouselProps {
  slides: SlideData[];
  width?: string | number | Record<string, string | number>;
  // Nueva propiedad para inyectar la relación de aspecto
  aspectRatio?: string | Record<string, string>; 
}

const Carrusel: React.FC<EmblaCarouselProps> = ({ 
  slides, 
  width = '100%', 
  // Valor por defecto: 9/16 en móviles (xs), 16/9 de tablets (sm) en adelante
  aspectRatio = { xs: '9/16', sm: '16/9' } 
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const navigate = useNavigate();

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const handleSlideClick = (url?: string) => {
    if (!url || url.trim() === '') return;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  return (
    <Box sx={{ width: width, margin: 'auto', position: 'relative' }}>
      
      <Box ref={emblaRef} sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex' }}>
          {slides.map((slide, index) => {
            const isClickable = Boolean(slide.url && slide.url.trim() !== '');

            return (
              <Box
                key={index}
                sx={{
                  flex: '0 0 100%',
                  minWidth: 0,
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={slide.src}
                  alt={slide.alt || `Slide ${index + 1}`}
                  onClick={() => handleSlideClick(slide.url)}
                  sx={{ 
                    width: '100%',
                    // Eliminamos height y aplicamos aspectRatio
                    aspectRatio: aspectRatio, 
                    objectFit: 'cover',
                    cursor: isClickable ? 'pointer' : 'default',
                    transition: 'transform 0.3s ease',
                    '&:hover': isClickable ? { transform: 'scale(1.02)' } : {}
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      <IconButton
        onClick={scrollPrev}
        disabled={selectedIndex === 0}
        sx={{
          position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', 
          bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)',
          '&:hover': { bgcolor: 'white' }, '&.Mui-disabled': { bgcolor: 'rgba(255, 255, 255, 0.4)' }
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <IconButton
        onClick={scrollNext}
        disabled={selectedIndex === scrollSnaps.length - 1}
        sx={{
          position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', 
          bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)',
          '&:hover': { bgcolor: 'white' }, '&.Mui-disabled': { bgcolor: 'rgba(255, 255, 255, 0.4)' }
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      <Stack direction="row"  sx={{ mt: 2, px: 1, alignItems:"center", justifyContent:"space-between" }}>
        <Typography variant="body2" sx={{ color:"text.secondary", fontWeight:"bold"}}>
          {selectedIndex + 1} / {scrollSnaps.length}
        </Typography>

        <Stack direction="row" spacing={1}>
          {scrollSnaps.map((_, index) => (
            <ButtonBase
              key={index}
              onClick={() => scrollTo(index)}
              sx={{
                width: 10, height: 10, borderRadius: '50%',
                bgcolor: index === selectedIndex ? 'primary.main' : 'grey.400',
                transition: 'background-color 0.3s ease',
                '&:hover': { bgcolor: 'primary.light' }
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Carrusel;