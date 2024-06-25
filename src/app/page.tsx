import styles from "./page.module.css";
import Header from "./header"
import Footer from "./footer"

export default function Home() {
    return (
        <div>
            <Header />
            <main className={styles.main}>
                <section className={styles.landing}>
                    <h1 className={styles.head}>Your Active Learning and Note-Taking Assistant</h1>
                    <button className={styles.btnLarge}>Learn More</button>
                </section>
            </main>
            <Footer />
        </div>
    );
}
