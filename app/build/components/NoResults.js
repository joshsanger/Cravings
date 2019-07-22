import React from 'react';

const NoResults = (props) => (
    <section className="no-items">
        <i className="far fa-info-circle"></i>
        <p>Hm, it looks like there aren't any cravings yet. <label htmlFor="url-input" className="faux-link">Try
            adding some</label>!</p>
    </section>
);

export default NoResults;