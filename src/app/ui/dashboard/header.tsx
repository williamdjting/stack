`use client`

import React, { createContext, useState, useEffect, useContext } from "react";

import styles from "./header.module.css";

import Link from 'next/link';


export function Header() {
  

  return (
  <div className={styles.headerParent}>
    <Link href="/applications/new" 
      className={styles.headerTitle}  
    >
    StackAI
    </Link>

    
    <Link href="/logout" 
      className={styles.headerMyAccount}  
    >
    Sign Out
    </Link>
    

  </div>

  )
}