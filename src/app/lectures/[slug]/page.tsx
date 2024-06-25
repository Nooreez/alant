'use client'

import styles from "../page.module.css";
import Link from "next/link"
import { useParams } from 'next/navigation'
import Chat from "../chat"

import HeaderLecture from "../headerLecture";

export default function Lectures() {
    const params = useParams()

    return (
        <main>
            <HeaderLecture lecturePath={`${params['slug']}`} studentName="Student 1"/>

            <div className={styles.main}>
                <p className={styles.transcriptHeader}>Live Lecture Transcription</p>
                <div className={styles.lectureMain}>
                    <div className={styles.lectureTranscript}>
                        The mind is what thinks, feels, perceives, imagines, remembers, and wills, encompassing the totality of mental phenomena. It includes both conscious processes, through which an individual is aware of external and internal circumstances, and unconscious processes, which can influence an individual without intention or awareness. Traditionally, minds were often conceived as separate entities that can exist on their own but are more commonly understood as features or capacities of other entities in the contemporary discourse. The mind plays a central role in most aspects of human life but its exact nature is disputed; some theorists suggest that all mental phenomena are private and directly knowable, transform information, have the ability to refer to and represent other entities, or are dispositions to engage in behavior.
                        The mind–body problem is the challenge of explaining the relation between matter and mind. The dominant position today is physicalism, which says that everything is material, meaning that minds are certain aspects or features of some material objects. The evolutionary history of the mind is tied to the development of the nervous system, which led to the formation of brains. As brains became more complex, the number and capacity of mental functions increased with particular brain areas dedicated to specific mental functions. Individual human minds also develop as they learn from experience and pass through psychological stages in the process of aging. Some people are affected by mental disorders, for which certain mental capacities do not function as they should.
                        It is widely accepted that animals have some form of mind, but it is controversial to which animals this applies. The topic of artificial minds poses similar challenges, with theorists discussing the possibility and consequences of creating them using computers.
                        The main fields of inquiry studying the mind include psychology, neuroscience, cognitive science, and philosophy. They tend to focus on different aspects of the mind and employ different methods of investigation, ranging from empirical observation and neuroimaging to conceptual analysis and thought experiments. The mind is relevant to many other fields, including epistemology, anthropology, religion, and education.
                    </div>
                    <div className={styles.chatAlant}>
                        <Chat lecture="The mind is what thinks, feels, perceives, imagines, remembers, and wills, encompassing the totality of mental phenomena. It includes both conscious processes, through which an individual is aware of external and internal circumstances, and unconscious processes, which can influence an individual without intention or awareness. Traditionally, minds were often conceived as separate entities that can exist on their own but are more commonly understood as features or capacities of other entities in the contemporary discourse. The mind plays a central role in most aspects of human life but its exact nature is disputed; some theorists suggest that all mental phenomena are private and directly knowable, transform information, have the ability to refer to and represent other entities, or are dispositions to engage in behavior.
                        The mind–body problem is the challenge of explaining the relation between matter and mind. The dominant position today is physicalism, which says that everything is material, meaning that minds are certain aspects or features of some material objects. The evolutionary history of the mind is tied to the development of the nervous system, which led to the formation of brains. As brains became more complex, the number and capacity of mental functions increased with particular brain areas dedicated to specific mental functions. Individual human minds also develop as they learn from experience and pass through psychological stages in the process of aging. Some people are affected by mental disorders, for which certain mental capacities do not function as they should.
                        It is widely accepted that animals have some form of mind, but it is controversial to which animals this applies. The topic of artificial minds poses similar challenges, with theorists discussing the possibility and consequences of creating them using computers.
                        The main fields of inquiry studying the mind include psychology, neuroscience, cognitive science, and philosophy. They tend to focus on different aspects of the mind and employ different methods of investigation, ranging from empirical observation and neuroimaging to conceptual analysis and thought experiments. The mind is relevant to many other fields, including epistemology, anthropology, religion, and education.
                    "/>
                    </div>
                </div>
            </div>
        </main>
    );
}
