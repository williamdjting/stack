// 'use client'
import styles from './ui-dashboard.module.css'

export function Card({
  key,
  title,
  value,
  value2
}: {
  key: number;
  title: string;
  value: string;
  value2: string;
}) {
  

  return (
    <>
    <div className={styles.cards}>
      <span>
        <ul>{title}</ul>
        <ul>{value}</ul>
        <ul>{value2}</ul>
      </span>
    </div>
    
    </>
  );
}