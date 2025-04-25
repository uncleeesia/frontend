import React from 'react';
import styles from './About.module.css';

const About = () => (
  <div className={styles.About}>
    <h1>About Us</h1>
    <section className={styles.Mission}>
      <h2>Our Mission</h2>
      <p>To provide exceptional cleaning services that exceed our customers' expectations.</p>
    </section>
    <section className={styles.Values}>
      <h2>Our Values</h2>
      <ul>
        <li>Integrity</li>
        <li>Commitment to Excellence</li>
        <li>Customer Satisfaction</li>
      </ul>
    </section>
    <section className={styles.SocialProof}>
      <h2>What Our Customers Say</h2>
      <blockquote>"Best cleaning service ever! Highly recommend!" - Jane Doe</blockquote>
    </section>
  </div>
);

export default About;
