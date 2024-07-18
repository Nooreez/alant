"use client";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/navigation';

type Props = {};

type RegisterFormsInputs = {
  email: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  role: string;
  institution: string; // Added institution type
  profile_image: FileList; // Added FileList type for profile image
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
  institution: Yup.string().required("Institution is required"), 
  profile_image: Yup.mixed().required("Profile image is required"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });
  
  const router = useRouter();

  const signin = async (form: RegisterFormsInputs) => {
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("username", form.username);
    formData.append("name", form.name);
    formData.append("surname", form.surname);
    formData.append("password", form.password);
    formData.append("role", form.role);
    formData.append("institution", form.institution);
    formData.append("profile_image", form.profile_image[0]);

    try {
      const response = await axios.post("http://localhost:8080/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("SignIn successful:", response.data);
      router.push('/profile/' + form.username);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (form: RegisterFormsInputs) => {
    signin(form);
  };

  return (
    <section className={styles.bodySection}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Sign up for an account</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
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
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                type="text"
                id="username"
                className={styles.input}
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && <p className={styles.error}>{errors.username.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className={styles.input}
                {...register("password")}
              />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
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
              <label htmlFor="profile_image" className={styles.label}>Profile Image</label>
              <input
                type="file"
                id="profile_image"
                className={styles.input}
                {...register("profile_image")}
              />
              {errors.profile_image && <p className={styles.error}>{errors.profile_image.message}</p>}
            </div>
            <button type="submit" className={styles.button}>Sign up</button>
            <p className={styles.link}>
              <a href="/log-in" className={styles.link}>
                Already have an account?
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
