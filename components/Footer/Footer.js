import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.Footer}>
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
  );
};

export default Footer;
