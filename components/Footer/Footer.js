import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.footerNav}>
        <Link className={styles.footerLink} href="/privacyPolicy">
          {" "}
          <p>Privacy Policy</p>{" "}
        </Link>
        <Link className={styles.footerLink} href="/termsOfService">
          {" "}
          <p>Terms Of Service</p>{" "}
        </Link>
        <Link className={styles.footerLink} href="/pricing">
          {" "}
          <p>Pricing</p>{" "}
        </Link>
        <Link className={styles.footerLink} href="/contactUs">
          {" "}
          <p>Contact Us</p>{" "}
        </Link>
      </div>

      <div className={styles.footerBase}>
        <p>© 2024 Slaysheet, Inc</p>
      </div>
    </div>
  );
};

export default Footer;
