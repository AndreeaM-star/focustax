import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        © 2024 FocusTax.ro — Claritate fiscală și profesionalism
      </div>
    </footer>
  );
}
