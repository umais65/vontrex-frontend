import React from 'react';
import '../assets/css/pages.css';

const ShippingPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Shipping Policy</h1>
                <p>Learn about our delivery methods, timelines, and international shipping options.</p>
            </div>

            <div className="page-content policy-content">
                <section className="policy-section">
                    <h2>Processing Time</h2>
                    <p>
                        All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped, complete with a tracking number.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Domestic Shipping Rates & Estimates</h2>
                    <div className="shipping-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Shipping Method</th>
                                    <th>Estimated Delivery Time</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Standard Shipping</td>
                                    <td>3-5 business days</td>
                                    <td>$5.99 (Free over $100)</td>
                                </tr>
                                <tr>
                                    <td>Expedited Shipping</td>
                                    <td>2 business days</td>
                                    <td>$12.99</td>
                                </tr>
                                <tr>
                                    <td>Overnight Shipping</td>
                                    <td>1 business day</td>
                                    <td>$24.99</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="policy-section">
                    <h2>International Shipping</h2>
                    <p>
                        We offer international shipping to most countries worldwide. Your shipping charges will invariably be calculated and displayed at checkout depending on the shipping carrier available.
                    </p>
                    <p>
                        <strong>Note:</strong> Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. VONTREX is not responsible for these charges if they are applied and are your responsibility as the customer.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>How Do I Check the Status of My Order?</h2>
                    <p>
                        When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
                    </p>
                </section>

                <section className="policy-section highlight-box">
                    <h3>Delayed or Lost Packages</h3>
                    <p>
                        If you haven’t received your order within 7 days of receiving your shipping confirmation email, please contact us at support@vontrex.com with your name and order number, and we will investigate it for you.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ShippingPage;
