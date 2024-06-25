import Link from "next/link" 

export default function Header() {
    return (
        <header className="header">
            <div className="header-wrapper">
                <Link href="/" className="logo">ALANT</Link>
                <div className="header-links">
                    <Link href="log-in" className="header-link">Log in</Link>
                    <Link href="sign-in" className="header-link">Sign in</Link>
                </div>
            </div>
        </header>
    )
}