// 'use client'

import  datasheetData  from '../../lib/datasheet-data';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './ui-dashboard.module.css'



export default function ProjectLinks() {
  

  return (
    <>
    {datasheetData.map((data) => {
      return (
        <Link
          key={data.id}
          href={`/projects/${data.id}`} // Add the missing href property
        >
        <li className={styles.projectbox}>{data.name}</li>
        </Link>
      );
    })}
    
    </>

  )

}


