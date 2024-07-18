// pages/userList.js
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './page.module.css';
import Header from '../header';

export default function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then(response => {
        setUsers(response.data.success);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, []);

  return (
    <div className={styles.userListContainer}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>User List</h1>
        {users.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link href={`/profile/${user.username}`} className='header-link'>{user.username}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
