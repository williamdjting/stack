`use client`;

import React, { createContext, useState, useEffect, useContext } from 'react';

import styles from '../../../styles/footer.module.css';

export async function Footer() {
	return (
		<div className={styles.footerParent}>
			<div className={styles.footerTitle}>Made in Vancouver, Canada</div>

			<div className={styles.footerMyAccount}>Copyright © 2024</div>
		</div>
	);
}
