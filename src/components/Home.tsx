// src/components/Home.js
import React from 'react';
// import PropTypes from 'prop-types';
import { HeroBanner } from './HeroBanner';
import { FeaturedProducts } from './FeaturedProducts';

/**
 * Home component - Main landing page that composes HeroBanner and FeaturedProducts
 * @returns {JSX.Element} - Rendered home page with all sections
 */
export const Home = () => {
  return (
    <main className="home-page">
      {/* Hero banner section - First visual element on the page */}
      <section aria-label="Main promotional banner">
        <HeroBanner />
      </section>

      {/* Featured products section - Showcases key products */}
      <section aria-label="Featured products" className="py-12">
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>
      </section>
    </main>
  );
};

Home.propTypes = {
  // Example if props were needed:
  // initialData: PropTypes.shape({
  //   heroData: PropTypes.object,
  //   products: PropTypes.array
  // })
};
