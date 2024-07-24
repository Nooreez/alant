"use client";
import React,{ useState } from "react";
import styles from "./page.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import Header from '../header';

type LoginFormsInputs = {
  username: string;
  password: string;
};

const validation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const router = useRouter();

  const login = (user: LoginFormsInputs) => {
    axios.post("http://localhost:8080/login", user)
      .then(response => {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data);
        localStorage.setItem("username" , user.username)
        console.log(localStorage.getItem("username"))
        router.push('/profile/'+user.username)
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleLogin = (form: LoginFormsInputs) => {
    login(form)
  };

  return (
    <section className={styles.bodySection}>
      <Header />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Login to your account</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
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
                className={styles.input}
                placeholder="••••••••"
                {...register("password")}
              />
            </div>
            <button type="submit" className={styles.button}>
              Login
            </button>
            <p className={styles.link}>
              <a href="/sign-in" className={styles.link}>
                Don’t have an account yet?{" "}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

