import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../declaratii/page.module.css";

export const metadata = {
  title: "Noutăți | FocusTax",
  description: "Ultimele noutăți fiscale din România.",
};

export default function NoutatiPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Noutăți Fiscale</h1>
        <p className={styles.subtitle}>
          Ultimele noutăți fiscale din România. În curând...
        </p>
      </main>
      <Footer />
    </>
  );
}
