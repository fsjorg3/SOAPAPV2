// frontend/src/components/media/ZoomableNotice.tsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface ZoomableNoticeProps {
    src: string;
    alt: string;
    caption?: string;
    maxWidth?: number | string;
}

export default function ZoomableNotice({
    src,
    alt,
    caption,
    maxWidth = 420,
}: ZoomableNoticeProps) {
    return (
        <Box sx={{ maxWidth, mx: "auto", textAlign: "center" }}>
            <PhotoProvider maskOpacity={0.9}>
                <PhotoView src={src}>
                    <Box
                        component="img"
                        src={src}
                        alt={alt}
                        sx={{
                            width: "100%",
                            display: "block",
                            borderRadius: 1,
                            border: 1,
                            borderColor: "divider",
                            cursor: "zoom-in",
                            transition: "border-color 0.2s",
                            "&:hover": { borderColor: "secondary.main" },
                        }}
                    />
                </PhotoView>
            </PhotoProvider>

            {caption && (
                <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 1, color: "text.secondary" }}
                >
                    {caption}
                </Typography>
            )}
        </Box>
    );
}