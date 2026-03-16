import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Helper to center a crop
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90, // default crop size 90% of image width
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

const ImageCropper = ({ imgFile, onCropComplete, onCancel, aspect = 1 }) => {
    const [imgSrc, setImgSrc] = useState('');
    const imgRef = useRef(null);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();

    // Load the file as a data URL so we can render it in <img>
    React.useEffect(() => {
        if (imgFile) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || '')
            );
            reader.readAsDataURL(imgFile);
        }
    }, [imgFile]);

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    const getCroppedImg = async () => {
        if (!completedCrop || !imgRef.current) return null;

        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) return null;

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        ctx.imageSmoothingQuality = 'high';

        const cropX = completedCrop.x * scaleX;
        const cropY = completedCrop.y * scaleY;

        ctx.drawImage(
            image,
            cropX,
            cropY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error('Canvas is empty');
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    blob.name = imgFile.name; // Keep original name
                    // Convert Blob to File object
                    const croppedFile = new File([blob], imgFile.name, {
                        type: imgFile.type,
                        lastModified: Date.now(),
                    });
                    resolve(croppedFile);
                },
                imgFile.type,
                1 // highest quality for jpeg/png
            );
        });
    };

    const handleSave = async () => {
        try {
            const croppedFile = await getCroppedImg();
            if (croppedFile) {
                onCropComplete(croppedFile);
            }
        } catch (e) {
            console.error('Failed to crop image', e);
            alert('Failed to crop image. Please try again.');
        }
    };

    if (!imgSrc) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h3 style={{ marginBottom: '1rem', marginTop: 0 }}>Crop Image</h3>

                <div style={{ maxHeight: '60vh', overflow: 'auto', marginBottom: '1rem', background: '#111', borderRadius: '4px' }}>
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            onLoad={onImageLoad}
                            style={{ maxWidth: '100%', maxHeight: '50vh', display: 'block', margin: '0 auto' }}
                        />
                    </ReactCrop>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSave} disabled={!completedCrop?.width || !completedCrop?.height}>
                        Crop & Save
                    </button>
                </div>
            </div>
        </div>
    );
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
};

const modalContentStyle = {
    backgroundColor: 'var(--secondary-bg)',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '90vw',
    width: '600px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--border-color)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
};

export default ImageCropper;
