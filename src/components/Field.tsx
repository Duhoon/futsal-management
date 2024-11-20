import styles from "@/styles/field.module.scss";

export default function Field() {
  return (
    <main className={styles.field}>
      <img className={styles["field-img"]} src="/field.png"></img>
    </main>
  );
}
