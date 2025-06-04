import Image from "next/image";
import styles from '@/app/(legacy)/css/styles.module.css'

export const Loader = () => {
  return <div className={styles.iconCSS} ><Image alt="Loader Legacy Speaker" src={'/images/legacy/Legacy-icon-only.svg'} priority
  fill
  style={{ objectFit: 'contain' }}/></div>
};
