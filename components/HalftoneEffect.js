import { useState, useRef, useEffect, useCallback } from 'react';
import Controls from './Controls';
import ImagePreview from './ImagePreview';
import { resizeImage, applyHalftoneEffect } from '../utils/imageProcessing';

const MAX_IMAGE_SIZE = 1500;

export default function HalftoneEffect() {
    const [image, setImage] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [dotSize, setDotSize] = useState(5);
    const [contrast, setContrast] = useState(1);
    const [jpgQuality, setJpgQuality] = useState(0.9);
    const [halftoneColor, setHalftoneColor] = useState('#000000');
    const [saturation, setSaturation] = useState(100);
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const canvasRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (image) {
            const img = new window.Image();
            img.onload = () => {
                const { canvas, width, height } = resizeImage(img, MAX_IMAGE_SIZE);
                setImageDimensions({ width, height });

                const displayCanvas = canvasRef.current;
                displayCanvas.width = width;
                displayCanvas.height = height;
                const ctx = displayCanvas.getContext('2d');
                ctx.drawImage(canvas, 0, 0);

                const imageData = ctx.getImageData(0, 0, width, height);
                applyHalftoneEffect(ctx, imageData, dotSize, contrast, halftoneColor, saturation, backgroundColor);
            };
            img.src = image;
        }
    }, [image, dotSize, contrast, halftoneColor, saturation, backgroundColor]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'halftone_image.jpg';
        link.href = canvas.toDataURL('image/jpeg', jpgQuality);
        link.click();
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
            <div className="w-1/4 p-4 bg-white shadow-md overflow-y-auto">
                <Controls
                    image={image}
                    handleImageUpload={handleImageUpload}
                    dotSize={dotSize}
                    setDotSize={setDotSize}
                    contrast={contrast}
                    setContrast={setContrast}
                    halftoneColor={halftoneColor}
                    setHalftoneColor={setHalftoneColor}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}
                    saturation={saturation}
                    setSaturation={setSaturation}
                    jpgQuality={jpgQuality}
                    setJpgQuality={setJpgQuality}
                    handleDownload={handleDownload}
                />
            </div>
            <div className="flex-grow flex">
                <ImagePreview
                    image={image}
                    canvasRef={canvasRef}
                    imageDimensions={imageDimensions}
                />
            </div>
        </div>
    );
}