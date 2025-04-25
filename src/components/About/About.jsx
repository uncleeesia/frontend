import React from "react";
import styles from "./About.module.css";
import Typography from "../Common/Typography";

const About = () => (
  <div className={styles.About}>
    <Typography variant="h1">About Us</Typography>
    <section className={styles.Mission}>
      <Typography variant="h2">Our Mission</Typography>
      <Typography>
        To provide exceptional cleaning services that exceed our customers'
        expectations.
      </Typography>
    </section>
    <section className={styles.Values}>
      <Typography variant="h2">Our Values</Typography>
      <ul>
        <li>Integrity</li>
        <li>Commitment to Excellence</li>
        <li>Customer Satisfaction</li>
      </ul>
    </section>
    <section className={styles.SocialProof}>
      <Typography variant="h2">What Our Customers Say</Typography>
      <Typography variant="blockquote">
        "Best cleaning service ever! Highly recommend!" - Jane Doe
      </Typography>
    </section>
  </div>
);

export default About;
