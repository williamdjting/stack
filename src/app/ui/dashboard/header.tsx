'use client';

import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from '../../lib/supabase/server';
import { useRouter } from 'next/navigation';

import styles from "./header.module.css";

import Link from 'next/link';


export function Header() {

  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error){
      console.log('Error: ', error.message);
    } else {
      router.push('/auth/login');
    }
  }

  return (
  <div className={styles.headerParent}>
    <Link href="/applications/new" 
      className={styles.headerTitle}  
    >
    StackAI
    </Link>

    <button onClick={handleSignOut}
    className={styles.headerMyAccount}>Sign Out</button>
    

  </div>

  )
}