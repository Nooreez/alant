import styles from "./page.module.css";
import Link from "next/link"

import HeaderLecture from "./headerLecture";

function LectureCard({lectureId}: {lectureId: string}) {
    return (
        <Link href={`/lectures/${lectureId}`}>
            <div className={styles.lectureCard}>{lectureId}</div>
        </Link>
    )
}

function SubjectSection({ subjectId }: { subjectId: string }) {
    return (
    <section className={styles.subject}>
        <h1 className={styles.subjectHeader}>{subjectId}</h1>
        <div className={styles.lecturesList}>
            <LectureCard lectureId={"Lecture-1-Mind"}/>
            <LectureCard lectureId={"Lecture-2-Self"}/>
        </div>
    </section>
    )
}

export default function Lectures() {
    return (
        <main>
            <HeaderLecture lecturePath="" studentName="Student 1"/>

            <div className={styles.main}>
                <h1 className={styles.lectureHeader}>Your Lectures</h1>
                
                <SubjectSection subjectId={"Psychology"}/>
                <SubjectSection subjectId={"Mathematics"}/>
            </div>
        </main>
    );
}
