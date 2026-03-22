import React from 'react';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            text: "The Artisan gloves are an absolute masterpiece. The Italian leather quality is unmatched, and my knuckles have never felt so protected during heavy sparring sessions. Worth every penny.",
            author: "Marcus T.",
            role: "Pro Boxer",
            initial: "M"
        },
        {
            id: 2,
            text: "I switched to Vontrex from the big names and I'm never going back. The wrist lockdown support on the Heritage series is phenomenal. Pure uncompromised quality all around.",
            author: "Jamie L.",
            role: "MMA Striking Coach",
            initial: "J"
        },
        {
            id: 3,
            text: "Finally, a brand that actually understands fighters. The Stealth Face-Saver headgear is so light I forget I'm wearing it, but it absorbs big shots like a literal tank!",
            author: "David R.",
            role: "Heavyweight Amateur",
            initial: "D"
        }
    ];

    return (
        <section className="section">
            <div className="container">
                <div className="section-header reveal visible">
                    <span className="section-header__label">Social Proof</span>
                    <h2 className="section-header__title">Fighter <span>Testimonials</span></h2>
                    <p className="section-header__subtitle">Don't just take our word for it. Hear from the athletes who rely on our gear daily.</p>
                </div>

                <div className="grid grid-3">
                    {reviews.map((review) => (
                        <div key={review.id} className="testimonial-card reveal visible">
                            <i className="fas fa-quote-right testimonial-card__quote"></i>
                            <div className="testimonial-card__stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <p className="testimonial-card__text">"{review.text}"</p>
                            <div className="testimonial-card__author">
                                <div className="testimonial-card__avatar">{review.initial}</div>
                                <div>
                                    <h4 className="testimonial-card__name">{review.author}</h4>
                                    <span className="testimonial-card__role">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
