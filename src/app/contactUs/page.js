import React from "react";
import styles from "./ContactUs.module.scss";

const ContactUs = () => {
  return (
    <div className={styles.ContactUs}>
      <h1>Get in Touch</h1>
      <div className={styles.ContactDetails}>
        <h2>Contact Information</h2>
        <p>
          Need assistance or have a question? We are here to help. Reach out to
          us!
        </p>

        <div className={styles.Address}>
          <h3>Company Address</h3>
          <p>Deshbandhu Para, Siliguri, West Bengal, India</p>
        </div>

        <div className={styles.Email}>
          <h3>Email</h3>
          <p>
            <a href="mailto:arkalal.chakravarty@gmail.com">
              arkalal.chakravarty@gmail.com
            </a>
          </p>
        </div>

        <div className={styles.Phone}>
          <h3>Phone</h3>
          <p>
            <a href="tel:+917365052973">+91-7365052973</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
