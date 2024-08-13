`use client`

import React, { createContext, useState, useEffect, useContext } from "react";

import styles from "./header.module.css";

export async function Header() {
  

  return (
  <div className={styles.headerParent}>
    <div className={styles.headerTitle}>
    StackAI 
    </div>

    <div className={styles.headerMyAccount}>
    My Account
    </div>

  </div>

  )
}