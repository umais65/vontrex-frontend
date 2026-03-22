import React from 'react';

const WhatsAppWidget = () => {
    const phoneNumber = "923368884744"; // User's provided number formatted automatically without the initial 0
    const defaultMessage = "Hello Vontrex! 👋 I'm browsing your website and I am interested in your professional boxing gear. Could you help me with some details?";
    
    // URL encode the message
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

    return (
        <a 
            href={waUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-widget"
            title="Chat with us on WhatsApp"
        >
            <i className="fab fa-whatsapp"></i>
        </a>
    );
};

export default WhatsAppWidget;
