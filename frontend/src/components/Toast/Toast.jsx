import styles from "./Toast.module.css";

export default function Toast({ message, error }) {

  if (!message && !error) return null;

  return (
    <div className={`${styles.toast} ${message ? styles.success : styles.error}`}>
      {message || error}
    </div>
  );
}