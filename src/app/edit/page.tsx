"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../sign-in/page.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Header from '../header';

type Props = {};

type EditProfileInputs = {
  email: string;
  name: string;
  surname: string;
  username: string;
  role: string;
  institution: string;
  profile_image: File | null; 
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  role: Yup.string().required("Role is required"),
  institution: Yup.string().required("Institution is required"), 
  profile_image: Yup.mixed().notRequired(), // Profile image is optional for updates
});

export default function EditProfilePage() {
  const username = localStorage.getItem("username");
  const [initialData, setInitialData] = useState<EditProfileInputs>({
    email: '',
    name: '',
    surname: '',
    username: '',
    role: '',
    institution: '',
    profile_image: null,
  });
  const router = useRouter();
  if (!username) {
    router.push('/');
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileInputs>({ resolver: yupResolver(validation) });

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8080/profile/${username}`)
        .then(response => {
          const { email, name, surname, username, role, institution } = response.data.success;
          setInitialData({ email, name, surname, username, role, institution, profile_image: null });
          setValue("email", email);
          setValue("name", name);
          setValue("surname", surname);
          setValue("username", username);
          setValue("role", role);
          setValue("institution", institution);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [username, setValue]);

  const updateProfile = async (form: EditProfileInputs) => {
    const data = {
      email: form.email,
      username: form.username,
      name: form.name,
      surname: form.surname,
      role: form.role,
      institution: form.institution,
    };

    try {
      const response = await axios.put(`http://localhost:8080/profile/${username}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Profile update successful:", response.data);
      router.push('/profile/' + form.username);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (data: EditProfileInputs) => {
    updateProfile(data);
  };

  return (
    <section className={styles.bodySection}>
      <Header />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Edit Profile</h1>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                type="text"
                id="username"
                className={styles.input}
                placeholder="Username"
                {...register("username")}
                disabled
              />
              {errors.username && <p className={styles.error}>{errors.username.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                className={styles.input}
                placeholder="Name"
                {...register("name")}
              />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="surname" className={styles.label}>Surname</label>
              <input
                type="text"
                id="surname"
                className={styles.input}
                placeholder="Surname"
                {...register("surname")}
              />
              {errors.surname && <p className={styles.error}>{errors.surname.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="text"
                id="email"
                className={styles.input}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="role" className={styles.label}>Role</label>
              <select
                id="role"
                className={styles.select}
                {...register("role")}
              >
                <option value="" disabled>Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              {errors.role && <p className={styles.error}>{errors.role.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="institution" className={styles.label}>Institution</label>
              <input
                type="text"
                id="institution"
                className={styles.input}
                placeholder="Institution"
                {...register("institution")}
              />
              {errors.institution && <p className={styles.error}>{errors.institution.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="profile_image" className={styles.label}>Profile Image</label>
              <input
                type="file"
                id="profile_image"
                className={styles.input}
                {...register("profile_image")}
              />
              {errors.profile_image && <p className={styles.error}>{errors.profile_image.message}</p>}
            </div>
            <button type="submit" className={styles.button}>Save Changes</button>
          </form>
        </div>
      </div>
    </section>
  );
}
