import React from 'react';
import '../assets/css/pages.css';

const ReturnsPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Returns & Exchanges</h1>
                <p>We stand behind our gear. If you are not satisfied, we will make it right.</p>
            </div>

            <div className="page-content policy-content">
                <section className="policy-section">
                    <h2>30-Day Guarantee</h2>
                    <p>
                        We offer a 30-day return window from the date your order is delivered. To be eligible for a return, your item must be unused, unwashed, and in the same condition that you received it. It must also be in the original packaging.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>How to Initiate a Return</h2>
                    <ol>
                        <li>Visit our Contact page and fill out the form with your Order ID.</li>
                        <li>Our support team will verify your eligibility and send you a prepaid return shipping label.</li>
                        <li>Pack the items securely in their original packaging and attach the label.</li>
                        <li>Drop the package off at the designated carrier location.</li>
                    </ol>
                </section>

                <section className="policy-section">
                    <h2>Refunds</h2>
                    <p>
                        Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                    </p>
                    <p>
                        If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-10 business days.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Exchanges</h2>
                    <p>
                        If you need a different size or color, the fastest way to get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item. We only replace items free of charge if they are defective or damaged upon arrival.
                    </p>
                </section>

                <section className="policy-section highlight-box">
                    <h3>Exceptions / Non-Returnable Items</h3>
                    <p>
                        Certain types of items cannot be returned, such as custom-made gear or personalized items. Please get in touch if you have questions or concerns about your specific item.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ReturnsPage;
