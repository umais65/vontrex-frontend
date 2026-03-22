import React, { useState } from 'react';
import { testimonialsData } from '../data/testimonials';

const Testimonials = () => {
    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    return (
        <section className="section">
            <div className="container">
                <div className="section-header reveal visible">
                    <span className="section-header__label">Social Proof</span>
                    <h2 className="section-header__title">Fighter <span>Testimonials</span></h2>
                    <p className="section-header__subtitle">Don't just take our word for it. Hear from the athletes who rely on our gear daily.</p>
                </div>

                <div className="grid grid-6 testimonial-grid" style={{ gap: '1.5rem' }}>
                    {testimonialsData.slice(0, visibleCount).map((review) => (
                        <div key={review.id} className="testimonial-card reveal visible" style={{ padding: '1.25rem' }}>
                            <i className="fas fa-quote-right testimonial-card__quote" style={{ fontSize: '1.25rem', top: '15px', right: '15px' }}></i>
                            <div className="testimonial-card__stars" style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`fa-star ${i < review.rating ? 'fas' : 'far'}`} style={{ color: i < review.rating ? '#FFD700' : '#444' }}></i>
                                ))}
                            </div>
                            <p className="testimonial-card__text" style={{ fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '1rem' }}>"{review.text}"</p>
                            <div className="testimonial-card__author" style={{ paddingTop: '0.75rem', gap: '0.5rem' }}>
                                <div className="testimonial-card__avatar" style={{ minWidth: '35px', width: '35px', height: '35px', fontSize: '0.9rem' }}>{review.initial}</div>
                                <div>
                                    <h4 className="testimonial-card__name" style={{ fontSize: '0.85rem' }}>{review.author}</h4>
                                    <span className="testimonial-card__role" style={{ fontSize: '0.65rem', color: '#888' }}>{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {visibleCount < testimonialsData.length && (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button className="btn btn-outline" onClick={handleLoadMore}>
                            Load More Reviews
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
