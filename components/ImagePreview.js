import Image from 'next/image';

export default function ImagePreview({ image, canvasRef, imageDimensions }) {
    return (
        <div className="flex-grow flex flex-col p-4">
            <div className="flex mb-2">
                <h2 className="text-lg font-semibold text-gray-700 w-1/2">Original Image</h2>
                <h2 className="text-lg font-semibold text-gray-700 w-1/2">Halftone Preview</h2>
            </div>
            <div className="flex-grow flex">
                {image ? (
                    <>
                        <div className="w-1/2 pr-2">
                            <div className="relative w-full h-full">
                                <Image
                                    src={image}
                                    alt="Original"
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded shadow"
                                />
                            </div>
                        </div>
                        <div className="w-1/2 pl-2">
                            <div className="relative w-full h-full overflow-auto">
                                <canvas
                                    ref={canvasRef}
                                    className="rounded shadow"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full flex items-center justify-center text-gray-500">
                        Upload an image to see the preview
                    </div>
                )}
            </div>
        </div>
    );
}