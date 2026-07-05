'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Combobox.module.css';

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  /** Classe du champ (style input fourni par le parent) */
  inputClassName?: string;
}

export default function Combobox({ id, value, onChange, options, placeholder, inputClassName }: Props) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const listId = id ? `${id}-listbox` : undefined;

  // Fermer au clic à l'extérieur
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q ? options.filter((o) => o.toLowerCase().includes(q)) : options;

  function select(opt: string) {
    onChange(opt);
    setQuery('');
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && filtered[highlight]) {
        e.preventDefault();
        select(filtered[highlight]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  }

  return (
    <div className={styles.combobox} ref={ref}>
      <input
        id={id}
        type="text"
        className={inputClassName}
        placeholder={placeholder}
        value={open ? query : value}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlight(0); }}
        onFocus={() => { setOpen(true); setQuery(''); setHighlight(0); }}
        onKeyDown={onKeyDown}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
      />
      {open && (
        <ul id={listId} className={styles.list} role="listbox">
          {filtered.length === 0 ? (
            <li className={styles.empty}>Aucun résultat</li>
          ) : (
            filtered.map((opt, i) => (
              <li
                key={opt}
                role="option"
                aria-selected={opt === value}
                className={`${styles.option} ${opt === value ? styles.optionActive : ''} ${i === highlight ? styles.optionHighlight : ''}`}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => { e.preventDefault(); select(opt); }}
              >
                {opt}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
