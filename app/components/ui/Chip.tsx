import styles from './Chip.module.css';

export function ChipList({ items, size = 'md' }: { items: string[]; size?: 'sm' | 'md' }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={[styles.chip, size === 'sm' ? styles.sm : ''].join(' ')}>
          {item}
        </li>
      ))}
    </ul>
  );
}
