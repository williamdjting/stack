"use client";

import React from "react";
import Link from "next/link";

// Import the CSS module
import styles from "./sidebar.module.css";

export function Sidebar() {
  return (
    <>
      <br></br>

      <div className={styles.text}>
        <div>My Documents</div>
        <div>(Resume & Cover Letters)</div>
      </div>

      <br></br>
      <br></br>

      <Link href="/projects" className={styles.text}>
        Existing Applications
      </Link>

      <br></br>
      <br></br>
      <br></br>

      <Link href="/applications/new" className={styles.text}>
        New Application
      </Link>

      <br></br>
      <br></br>
      <br></br>

      <div className={styles.text}>Settings</div>
    </>
  );
}
