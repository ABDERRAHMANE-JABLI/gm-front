import styles from './CardsSkeleton.module.css';

interface Props {
  count?: number;
}

export default function CardsSkeleton({ count = 9 }: Props) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.image} />
          <div className={styles.body}>
            <div className={styles.line} style={{ width: '60%' }} />
            <div className={styles.line} style={{ width: '40%' }} />
            <div className={styles.line} style={{ width: '80%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
