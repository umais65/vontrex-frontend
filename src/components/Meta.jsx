import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Vontrex | Premium Boxing & MMA Gears',
    description: 'Shop the best professional boxing gloves, hand wraps, headgear, and MMA equipment at Vontrex. Quality gear tailored for fighters.',
    keywords: 'boxing, mma, gloves, hand wraps, headgear, combat sports, professional boxing gear',
};

export default Meta;
