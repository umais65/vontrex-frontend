import React from 'react';
import '../assets/css/pages.css';

const SizeGuidePage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Size Guide</h1>
                <p>Choosing the right gear is crucial for performance and protection. Use this guide to find your perfect fit.</p>
            </div>

            <div className="page-content policy-content">
                <section className="policy-section guide-section">
                    <h2>Boxing Gloves Sizing</h2>
                    <p>
                        Boxing gloves are measured in ounces (oz). The weight of the glove refers to the amount of padding it contains. Your weight and what you intend to use the gloves for will determine the size you need.
                    </p>
                    <div className="shipping-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Glove Size (oz)</th>
                                    <th>Your Weight (lbs)</th>
                                    <th>Primary Use</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>10 oz</strong></td>
                                    <td>100 - 120 lbs</td>
                                    <td>Bag work, light pad work, competition</td>
                                </tr>
                                <tr>
                                    <td><strong>12 oz</strong></td>
                                    <td>120 - 150 lbs</td>
                                    <td>Heavy bag work, pad work</td>
                                </tr>
                                <tr>
                                    <td><strong>14 oz</strong></td>
                                    <td>150 - 180 lbs</td>
                                    <td>General training, light sparring</td>
                                </tr>
                                <tr>
                                    <td><strong>16 oz</strong></td>
                                    <td>180+ lbs</td>
                                    <td>Heavy sparring, heavy bag work</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="policy-section guide-section mt-4">
                    <h2>Hand Wraps Sizing</h2>
                    <p>
                        Hand wraps come in two primary lengths. The right length depends on your hand size and how much support you need.
                    </p>
                    <div className="shipping-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Wrap Length</th>
                                    <th>Best For</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>120" (3m)</strong></td>
                                    <td>Smaller hands, youth, women, or those prioritizing speed.</td>
                                </tr>
                                <tr>
                                    <td><strong>180" (4.5m)</strong></td>
                                    <td>Average to larger hands, or anyone wanting maximum knuckle, wrist, and thumb protection.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="policy-section guide-section mt-4">
                    <h2>Headgear Sizing</h2>
                    <p>
                        To find your headgear size, measure the circumference of your head one inch above your eyebrows.
                    </p>
                    <div className="flex-guide">
                        <ul>
                            <li><strong>Small:</strong> 19" - 21" (48 - 53 cm)</li>
                            <li><strong>Medium:</strong> 21" - 22.5" (53 - 57 cm)</li>
                            <li><strong>Large:</strong> 22.5" - 24" (57 - 61 cm)</li>
                            <li><strong>X-Large:</strong> 24" & Over (61+ cm)</li>
                        </ul>
                    </div>
                </section>

                <section className="policy-section guide-section mt-4">
                    <h2>Shin Guards Sizing</h2>
                    <p>
                        Choosing the right shin guard is important for mobility and protection. Measure your shin length from just below the knee to the ankle.
                    </p>
                    <div className="shipping-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Your Height</th>
                                    <th>Shin Length</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Small</strong></td>
                                    <td>&lt; 5'3" (160cm)</td>
                                    <td>&lt; 13" (33cm)</td>
                                </tr>
                                <tr>
                                    <td><strong>Medium</strong></td>
                                    <td>5'3" - 5'9" (160-175cm)</td>
                                    <td>13" - 14.5" (33-37cm)</td>
                                </tr>
                                <tr>
                                    <td><strong>Large</strong></td>
                                    <td>5'10" - 6'1" (178-185cm)</td>
                                    <td>14.5" - 16" (37-41cm)</td>
                                </tr>
                                <tr>
                                    <td><strong>X-Large</strong></td>
                                    <td>&gt; 6'1" (185cm)</td>
                                    <td>&gt; 16" (41cm)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SizeGuidePage;
