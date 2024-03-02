import { FC } from "react";
import styles from "./Popup.module.scss";
import { CSSTransition } from "react-transition-group";

interface PopupProps {
  id?: string;
  show?: boolean;
  closeText?: string;
  infoText?: string;
  close?: () => void;
  width?: string;
  children?: React.ReactNode;
}

const Popup: FC<PopupProps> = ({
  id = "",
  show = false,
  closeText,
  infoText,
  close,
  width,
  children,
}) => {
  return (
    <CSSTransition
      in={show}
      timeout={700}
      mountOnEnter
      unmountOnExit
      classNames="my-node"
    >
      <div className={styles.modal} id={id}>
        <div className={styles.container} style={{ width: width }}>
          <div className={styles.header}>
            <p className={styles.contentLabel}>{infoText}</p>
            <div
              className={styles.close}
              onClick={() => {
                close(false);
              }}
            >
              <p>{closeText?.toLowerCase()}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Popup;
