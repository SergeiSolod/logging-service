import { FC } from "react";
import Button from "src/kit/button/Button";
import Log from "./components/log/Log";
import styles from "./LogsPage.module.scss";
import localized from "src/helpers/localized";
import { fetchLog } from "./store/LogsAC";
import { setLogsPage } from "./store/LogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { setPage } from "src/modules/main/store/MainSlice";

const LogsPage: FC = () => {
  const dispatch = useDispatch();

  const logs = useSelector((state: RootState) => state.logs);

  const sendLog = () => {
    dispatch(
      fetchLog({
        project: "online-store",
        name: "SyntaxError",
        message: "User age is absent!",
        stack: "SyntaxError: User age is absent! at window.onload",
        system: "Windows 10",
        browser: "Google Chrome 123.0.6312.4",
        user: "183889",
        date: new Date(),
      }),
    );
  };

  const openModal = (id: number) => {};

  const filterLogs = () => {
    if (logs.logsPage === "all") return logs.logs;
    else return logs.logs.filter((log: any) => log.project === logs.logsPage);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {localized.whichLogsShow + " "}
        <strong>{logs.logsPage}</strong>
      </div>

      <div className={styles.elements}>
        <div className={styles.element}>
          <Button
            onClick={() => {
              dispatch(setLogsPage("all"));
            }}
          >
            {localized.allLogs}
          </Button>
        </div>
        <div className={styles.element}>
          <Button
            onClick={() => {
              dispatch(setLogsPage("online-store"));
            }}
          >
            {localized.onlineStore}
          </Button>
        </div>
        <div className={styles.element}>
          <Button
            onClick={() => {
              dispatch(setLogsPage("administrative-panel"));
            }}
          >
            {localized.administrativePanel}
          </Button>
        </div>
      </div>
      <div className={styles.elements}>
        <div className={styles.element}>
          <Button
            onClick={() => {
              sendLog();
            }}
          >
            {localized.createTestLog}
          </Button>
        </div>
        <div className={styles.element}>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(setPage("auth"));
            }}
          >
            {localized.goOut}
          </Button>
        </div>
      </div>
      <div className={styles.logs}>
        {filterLogs().map((log: any) => (
          <Log key={log._id} log={log} openModal={openModal} />
        ))}
      </div>
    </div>
  );
};

export default LogsPage;
