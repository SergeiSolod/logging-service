import { FC, useEffect, useState } from "react";
import { languages } from "src/helpers/const";
import styles from "./Stub.module.scss";
import Languages from "src/kit/languages/Languages";

interface StubProps {
  show?: boolean;
  maxWidth?: number;
  title?: string;
  text?: string;
  language?: string;
  changeLanguage?: () => void;
}

const Stub: FC<StubProps> = ({
  show,
  maxWidth,
  title,
  text,
  language,
  changeLanguage,
}) => {
  const useMedia = (maxWidth: number) => {
    const widthWindow = document?.documentElement?.clientWidth;

    const [media, setMedia] = useState(false);

    useEffect(() => {
      setMedia(Number(widthWindow) < Number(maxWidth));
    }, []);

    useEffect(() => {
      window.addEventListener("resize", () => {
        const widthWindow = document?.documentElement?.clientWidth;
        setMedia(Number(widthWindow) < Number(maxWidth));
      });
    });

    return media;
  };

  const media = useMedia(maxWidth);

  return (
    <>
      {(show || media) && (
        <>
          <div className={styles.background} />
          <div className={styles.wrapper}>
            <div className={styles.block}>
              <Languages
                languages={languages}
                language={language}
                changeLanguage={changeLanguage}
              />
              <div className={styles.title}>{title}</div>
              <div className={styles.text}>{text}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Stub;
