import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../declaratii/page.module.css";

export const metadata = {
  title: "Contact | FocusTax",
  description: "Contactează echipa FocusTax pentru asistență fiscală.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.subtitle}>
          Contactează echipa FocusTax pentru asistență fiscală. În curând...
        </p>
      </main>
      <Footer />
    </>
  );
}
