import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../declaratii/page.module.css";

export const metadata = {
  title: "Ghiduri | FocusTax",
  description: "Ghiduri fiscale practice pentru contribuabilii din România.",
};

export default function GhiduriPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <h1 className={styles.title}>Ghiduri Fiscale</h1>
        <p className={styles.subtitle}>
          Ghiduri practice pentru contribuabilii din România. În curând...
        </p>
      </main>
      <Footer />
    </>
  );
}
