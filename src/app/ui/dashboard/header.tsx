`use client`

import React, { createContext, useState, useEffect, useContext } from "react";

import styles from "./header.module.css";

import Link from 'next/link';


export async function Header() {
  

  return (
  <div className={styles.headerParent}>
    <div className={styles.headerTitle}>
    StackAI 
    </div>

    <Link href="/applications/new" 
      className={styles.headerNew}  
    >
    New Application
    </Link>

    <Link href="/myaccount" 
      className={styles.headerMyAccount}  
    >
    My Account
    </Link>
    

  </div>

  )
}