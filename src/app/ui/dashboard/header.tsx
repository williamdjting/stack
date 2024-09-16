`use client`

import React, { createContext, useState, useEffect, useContext } from "react";

import styles from "./header.module.css";

import Link from 'next/link';


export async function Header() {
  

  return (
  <div className={styles.headerParent}>
    <Link href="/applications/new" 
      className={styles.headerTitle}  
    >
    StackAI
    </Link>

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