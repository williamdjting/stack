`use client`;

import React, { createContext, useState, useEffect, useContext } from "react";

import styles from "./sidebar.module.css";

import Link from "next/link";

export async function Sidebar() {
  return (
    <>
      <br></br>

      <div>
        <div>My Documents</div>
        <div> (Resume & Cover Letters)</div>
      </div>

      <br></br>
      <br></br>

      <Link href="/projects">
      Existing Applications
      </Link>

      <br></br>
      <br></br>
      <br></br>

      <Link href="/applications/new">
        New Application
      </Link>

      <br></br>
      <br></br>
      <br></br>

      <div>Settings</div>
    </>
  );
}
