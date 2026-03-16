import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ImageCropper from '../../components/ImageCropper';

const AdminProductEditPage = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useAuth();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [uploadingMultiple, setUploadingMultiple] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const errorRef = useRef(null);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [error]);
    const [pendingImageFile, setPendingImageFile] = useState(null);
    const [pendingMultipleFiles, setPendingMultipleFiles] = useState([]);
    const [croppedMultipleFiles, setCroppedMultipleFiles] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setImages(data.images || []);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setIsFeatured(data.isFeatured || false);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // Single main image upload - triggers cropper
    const fileSelectHandler = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPendingImageFile(file);
        setShowCropper(true);
        // Reset input so the same file could be selected again if cancelled
        e.target.value = null;
    };

    const handleCropComplete = async (croppedFile) => {
        setShowCropper(false);
        setPendingImageFile(null);

        const formData = new FormData();
        formData.append('image', croppedFile);
        setUploading(true);

        try {
            const { data } = await axios.post('/api/upload', formData, {
                withCredentials: true,
            });
            setImage(data.image);
            setUploading(false);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Image upload failed! Only JPG/PNG allowed (max 5MB).');
            setUploading(false);
        }
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setPendingImageFile(null);
    };

    // Multiple additional images upload
    const uploadMultipleHandler = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        if (files.length > 5) {
            alert('Maximum 5 images at a time!');
            return;
        }
        setPendingMultipleFiles(files);
        setCroppedMultipleFiles([]);
        e.target.value = ''; // Reset file input
    };

    const uploadCroppedFiles = async (files) => {
        if (files.length === 0) return;
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });
        setUploadingMultiple(true);

        try {
            const { data } = await axios.post('/api/upload/multiple', formData, {
                withCredentials: true,
            });
            setImages(prev => [...prev, ...data.images]);
            setUploadingMultiple(false);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Upload failed! Only JPG/PNG allowed (max 5MB each).');
            setUploadingMultiple(false);
        }
    };

    const handleMultipleCropComplete = (croppedFile) => {
        const updatedCroppedFiles = [...croppedMultipleFiles, croppedFile];
        setCroppedMultipleFiles(updatedCroppedFiles);

        if (pendingMultipleFiles.length === 1) {
            // Last file
            uploadCroppedFiles(updatedCroppedFiles);
            setPendingMultipleFiles([]);
            setCroppedMultipleFiles([]);
        } else {
            // Move to next file
            setPendingMultipleFiles(prev => prev.slice(1));
        }
    };

    const handleMultipleCropCancel = () => {
        if (pendingMultipleFiles.length === 1) {
            // Last file
            if (croppedMultipleFiles.length > 0) {
                uploadCroppedFiles(croppedMultipleFiles);
            }
            setPendingMultipleFiles([]);
            setCroppedMultipleFiles([]);
        } else {
            // Move to next file
            setPendingMultipleFiles(prev => prev.slice(1));
        }
    };

    // Remove an additional image
    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `/api/products/${productId}`,
                { name, price, image, images, category, countInStock, description, isFeatured },
                { headers: {} }
            );
            navigate('/admin/productlist');
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    return (
        <main className="container section" style={{ padding: '120px 5% 80px', minHeight: '80vh' }}>
            <Link to="/admin/productlist" className="btn btn-secondary" style={{ marginBottom: '2rem', display: 'inline-block' }}>
                Go Back
            </Link>

            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--secondary-bg)', padding: '2rem', borderRadius: '8px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Edit Product</h1>

                {loading ? (
                    <h3>Loading...</h3>
                ) : error ? (
                    <div ref={errorRef} style={{ color: 'var(--accent-red)', marginBottom: '1rem' }}>{error}</div>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                            <input type="text" className="form-input" style={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price ($)</label>
                            <input type="number" step="0.01" className="form-input" style={{ width: '100%' }} value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>

                        {/* Main Image */}
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Main Image</label>
                            <input type="text" className="form-input" style={{ width: '100%', marginBottom: '0.5rem' }} value={image} onChange={(e) => setImage(e.target.value)} required />
                            <input type="file" accept=".jpg,.jpeg,.png" onChange={fileSelectHandler} />
                            {uploading && <span style={{ color: 'var(--accent-red)', marginLeft: '0.5rem' }}>Uploading...</span>}
                            {image && <img src={image} alt="Main" style={{ marginTop: '1rem', width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '2px solid var(--accent-red)' }} />}
                        </div>

                        {/* Additional Images */}
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Additional Images <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.85rem' }}>(select multiple — max 5 at a time)</span></label>
                            <input type="file" accept=".jpg,.jpeg,.png" multiple onChange={uploadMultipleHandler} />
                            {uploadingMultiple && <span style={{ color: 'var(--accent-red)', marginLeft: '0.5rem' }}>Uploading images...</span>}

                            {images.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                                    {images.map((img, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img src={img} alt={`Product ${index + 1}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                style={{
                                                    position: 'absolute', top: '-6px', right: '-6px',
                                                    width: '20px', height: '20px', borderRadius: '50%',
                                                    background: 'var(--accent-red)', color: 'white',
                                                    border: 'none', cursor: 'pointer', fontSize: '12px',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    lineHeight: 1
                                                }}
                                                title="Remove image"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                            <input type="text" className="form-input" style={{ width: '100%' }} value={category} onChange={(e) => setCategory(e.target.value)} required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Count In Stock</label>
                            <input type="number" className="form-input" style={{ width: '100%' }} value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                            <textarea className="form-input" rows="4" style={{ width: '100%' }} value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem 1rem', background: isFeatured ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isFeatured ? 'rgba(255, 193, 7, 0.4)' : 'var(--border-color)'}`, borderRadius: '8px', transition: 'all 0.3s ease' }}>
                                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#ffc107', cursor: 'pointer' }} />
                                <span style={{ fontSize: '1.1rem' }}>{isFeatured ? '⭐' : '☆'}</span>
                                <span style={{ fontWeight: 600 }}>Featured Product</span>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Update Product
                        </button>
                    </form>
                )}
            </div>
            {showCropper && pendingImageFile && (
                <ImageCropper
                    imgFile={pendingImageFile}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                    aspect={1}
                />
            )}
            {pendingMultipleFiles.length > 0 && (
                <ImageCropper
                    imgFile={pendingMultipleFiles[0]}
                    onCropComplete={handleMultipleCropComplete}
                    onCancel={handleMultipleCropCancel}
                    aspect={1}
                />
            )}
        </main>
    );
};

export default AdminProductEditPage;
