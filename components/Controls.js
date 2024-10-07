export default function Controls({
    image,
    handleImageUpload,
    dotSize,
    setDotSize,
    contrast,
    setContrast,
    halftoneColor,
    setHalftoneColor,
    backgroundColor,
    setBackgroundColor,
    saturation,
    setSaturation,
    jpgQuality,
    setJpgQuality,
    handleDownload
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center w-full mb-4">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo
                        </p>
                    </div>
                    <input type="file" className="opacity-0" accept="image/*" onChange={handleImageUpload} />
                </label>
            </div>

            {image && (
                <>
                    <RangeInput label="Dot Size" value={dotSize} setValue={setDotSize} min={2} max={20} step={1} />
                    <RangeInput label="Contrast" value={contrast} setValue={setContrast} min={0.5} max={2} step={0.1} />
                    <ColorInput label="Halftone Color" value={halftoneColor} setValue={setHalftoneColor} />
                    <ColorInput label="Background Color" value={backgroundColor} setValue={setBackgroundColor} />
                    <RangeInput label="Saturation" value={saturation} setValue={setSaturation} min={0} max={100} step={1} />
                    <RangeInput label="JPG Quality" value={jpgQuality} setValue={setJpgQuality} min={0.1} max={1} step={0.1} />
                    <button
                        onClick={handleDownload}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Download
                    </button>
                </>
            )}
        </div>
    );
}

function RangeInput({ label, value, setValue, min, max, step }) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={label} className="font-medium text-gray-700">
                {label}: {typeof value === 'number' ? value.toFixed(1) : value}
            </label>
            <input
                type="range"
                id={label}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>
    );
}

function ColorInput({ label, value, setValue }) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={label} className="font-medium text-gray-700">
                {label}
            </label>
            <input
                type="color"
                id={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
            />
        </div>
    );
}