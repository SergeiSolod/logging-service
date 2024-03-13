import { FC, useState } from "react";
import Accordion from "src/kit/accordion/Accordion";
import styles from "./Log.module.scss";
import moment from "moment";
import localized from "src/helpers/localized";

const Log: FC<any> = (props) => {
  const { log, openModal = () => {} } = props;

  const [selectedId, setSelectedId] = useState(null);

  // needed to open the accordion
  const handleSelectedId = (id: number) => {
    if (id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <div className={styles.log} key={log.id}>
      <div className={styles.accordion}>
        <Accordion
          id={log.id}
          selectedId={selectedId}
          handleSelectedId={handleSelectedId}
          title={
            localized.project +
            ": " +
            log.project +
            "; " +
            localized.nameError +
            ": " +
            log.name
          }
          text={
            localized.details +
            ": " +
            log.message +
            "; " +
            localized.callStack +
            ": " +
            log.stack +
            "; " +
            localized.date +
            ": " +
            moment(log.date).format("HH:mm YYYY-MM-DD") +
            "; " +
            localized.system +
            ": " +
            log.system +
            ": " +
            localized.browser +
            ": " +
            log.browser +
            "; " +
            localized.user +
            ": " +
            log.user +
            ";"
          }
          color={"#0f0f0f0"}
          isRoot={false}
          hasChildren={false}
          key={log.id}
        />
      </div>
    </div>
  );
};

export default Log;
