"use client"
import Link from "next/link" 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default function Header() {
    const [username, setUsername] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const storedUser = localStorage.getItem("username");
      if (storedUser) {
          setUsername(storedUser)
      }
    }, []);
    function logout(){
        localStorage.clear();
        location.reload();
    };
    return (
        <header className="header">
            <div className="header-wrapper">
            
                    
                {username ? (
                    <>
                    <div className="header-links">
                        <Link href="/dashboard" className="header-link">Dashboard</Link>
                        <Link href="/courses" className="header-link">Сourses</Link>
                    </div>
                    </>
                ) : (
                    <>
                    </>
                )}
                <Link href="/" className="logo">ALANT</Link>
                <div className="header-links">
                {username ? (
                    <>
                    <Link href={`/profile/${username}`} className="header-link">{username}</Link>
                    <a onClick={logout} className="header-link">Logout</a>                    
                    </>
                ) : (
                    <>
                    <Link href="/log-in" className="header-link">Log in</Link>
                    <Link href="/sign-in" className="header-link">Sign in</Link>
                    </>
                )}
                </div>
            </div>
        </header>
    )
}