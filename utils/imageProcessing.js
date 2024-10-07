export function resizeImage(img, maxSize) {
    const canvas = document.createElement('canvas');
    let { width, height } = img;

    if (width > maxSize || height > maxSize) {
        if (width > height) {
            height *= maxSize / width;
            width = maxSize;
        } else {
            width *= maxSize / height;
            height = maxSize;
        }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height);
    return { canvas, width, height };
}

export function applyHalftoneEffect(ctx, imageData, dotSize, contrast, color, saturation, backgroundColor) {
    const { width, height } = imageData;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    for (let y = 0; y < height; y += dotSize) {
        for (let x = 0; x < width; x += dotSize) {
            let totalBrightness = 0;
            let sampledPixels = 0;

            for (let sy = 0; sy < dotSize; sy++) {
                for (let sx = 0; sx < dotSize; sx++) {
                    const i = ((y + sy) * width + (x + sx)) * 4;
                    if (i < imageData.data.length) {
                        totalBrightness += (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
                        sampledPixels++;
                    }
                }
            }

            const averageBrightness = totalBrightness / sampledPixels;
            const adjustedBrightness = Math.pow(averageBrightness / 255, contrast) * 255;
            const radius = (dotSize / 2) * (1 - adjustedBrightness / 255);

            const grayscale = 1 - (saturation / 100);
            const dotColor = `rgb(${Math.round(r * (1 - grayscale) + (255 - averageBrightness) * grayscale)},
                              ${Math.round(g * (1 - grayscale) + (255 - averageBrightness) * grayscale)},
                              ${Math.round(b * (1 - grayscale) + (255 - averageBrightness) * grayscale)})`;

            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(x + dotSize / 2, y + dotSize / 2, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}