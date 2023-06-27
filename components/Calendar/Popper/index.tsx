import React, { useState, ReactNode } from "react";
import styles from "./Popper.module.sass";

type Props = {
  children: ReactNode;
  visible: boolean;
};

export default function Popper({ children, visible = false }: Props) {
  if (!visible) return null;
  return (
    <div className={styles.popper_container}>
      {visible && (
        <div className={styles.popper}>
          {/* Content of the popper */}
          Popper Content
          {children}
        </div>
      )}
    </div>
  );
}
