"use client";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import axios from "axios"

type Props = {};

type RegisterFormsInputs = {
  email: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  role: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
});
  
  
const RegisterPage = (props: Props) => {
    const signin = (user: RegisterFormsInputs) => {
        axios.post("http://localhost:8080/signup", user)
        .then(response => {
        console.log("SignIn successful:", response.data);
        })
        .catch(error => {
        console.log(error);
        });
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

    const handleLogin = (form: RegisterFormsInputs) => {
      signin(form)
    };

  return (
    <section className={styles.bodySection}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Sign in to your account</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                placeholder="Name"
                {...register("name")}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="Surname" className={styles.label}>
                Surname
              </label>
              <input
                type="text"
                id="surname"
                className={styles.input}
                placeholder="Surname"
                {...register("surname")}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="text"
                id="email"
                className={styles.input}
                placeholder="Email"
                {...register("email")}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                className={styles.input}
                placeholder="Username"
                {...register("username")}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className={styles.input}
                {...register("password")}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="role" className={styles.label}>
                Role
              </label>
              <select
                id="role"
                className={styles.select}
                {...register("role")}
              >
                <option value="" disabled>Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <button type="submit" className={styles.button}>
              Sign in
            </button>
            <p className={styles.link}>
              <a href="/log-in" className={styles.link}>
                  Do have an account?{" "}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
