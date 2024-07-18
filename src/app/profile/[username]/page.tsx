"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../page.module.css';
import Header from '../../header';

export default function ProfilePage() {
  const params = useParams();
  const { username } = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8080/profile/${username}`)
        .then(response => {
          setUser(response.data.success);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const storedUsername = typeof window !== 'undefined' ? localStorage.getItem("username") : null;

  return (
    <div className={styles.profileContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.profileHeader}>
          <div className={styles.profilePictureContainer}>
            <img
              src={`http://localhost:8080/${user.media_url}`}
              alt="Profile"
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileInfoContainer}>
            <div className={styles.profileInfo}>
              <h1>{user.name} {user.surname}</h1>
            </div>
            {storedUsername === username && (
              <div className={styles.actionButtons}>
                <button className={styles.editProfileButton}>✏️ Edit Profile</button>
                <button className={styles.changePasswordButton}>🔒 Change Password</button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.profileDetails}>
          <p className={styles.profileDetail}><strong>Institution:</strong> Real World University</p>
          <p className={styles.profileDetail}><strong>Courses:</strong></p>
          <ul className={styles.courseList}>
            <li>Linear Algebra MATH-UN 001</li>
            <li>Applied Machine Learning ML-UN 111</li>
            <li>Neuroscience Introduction NEURO-UN 112</li>
          </ul>
          <p className={styles.profileDetail}><strong>Email:</strong> {user.email}</p>
        </div>
      </main>
    </div>
  );
}
