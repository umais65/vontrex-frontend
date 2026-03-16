import React, { useState } from 'react';
import '../assets/css/pages.css';

const faqs = [
    {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship globally! Shipping costs and delivery times will be calculated at checkout based on your location."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day hassle-free return policy on all unused and undamaged items. The gear must be in its original packaging."
    },
    {
        question: "How do I clean my boxing gloves?",
        answer: "Wipe them down with a damp cloth and antibacterial spray after every use. Never submerge them in water or put them in the washing machine. Let them air dry completely in a well-ventilated area."
    },
    {
        question: "Which size glove should I get?",
        answer: "Glove size generally depends on your weight and intended use. 10oz-12oz are great for bag work and pads. 14oz-16oz are standard for sparring. Please refer to our Size Guide for detailed recommendations."
    }
];

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Frequently Asked Questions</h1>
                <p>Find answers to common questions about our products, shipping, and returns.</p>
            </div>

            <div className="page-content faq-content">
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <span className="faq-icon">
                                    <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
                                </span>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-more-help">
                    <h2>Still have questions?</h2>
                    <p>If you couldn't find the answer you were looking for, our support team is ready to help.</p>
                    <a href="/contact" className="btn-secondary">Contact Support</a>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
