import Link from "next/link" 

export default function HeaderLecture({ lecturePath, studentName}: {lecturePath: string, studentName: string}) {
    return (
        <header className="header">
            <div className="header-wrapper">
                <Link href="/lectures" className="header-link">Menu</Link>
                <p className="header-link">{lecturePath}</p>
                <div className="header-links">
                    <Link href="/dashboard" className="header-link">{studentName}</Link>
                </div>
            </div>
        </header>
    )
}