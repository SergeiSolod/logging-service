import { FC } from "react";
import styles from "./Navigation.module.scss";
import clsx from "clsx";

const Navigation: FC = ({ items, page, setPage }) => {
  return (
    <div className={styles.navigation}>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setPage(item);
          }}
          className={clsx(
            styles.navigationItem,
            page === item && styles.navigationItemActive,
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
