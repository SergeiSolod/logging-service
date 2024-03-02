import { FC, useEffect } from "react";
import AuthPage from "src/modules/auth/AuthPage";
import LogsPage from "src/modules/logs/LogsPage";
import Message from "src/kit/message/Message";
import Preloader from "src/kit/preloader/Preloader";
import Stub from "src/kit/stub/Stub";
import localized from "src/helpers/localized";
import { closeMessage, setPage } from "./store/MainSlice";
import { fetchCheckToken } from "./store/MainAC";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { CSSTransition } from "react-transition-group";
import { setLanguage } from "src/modules/main/store/MainSlice";

const MainPage: FC = () => {
  const dispatch = useDispatch();

  const main = useSelector((state: RootState) => state.main);
  const loading = useSelector((state: RootState) => state.main.loading);

  useEffect(() => {
    localized.setLanguage("en");
    if (localStorage.getItem("token")) {
      dispatch(fetchCheckToken());
    } else {
      dispatch(setPage("auth"));
    }
  }, []);

  const closeInfo = () => {
    dispatch(closeMessage());
  };

  const changeLanguage = (code: string) => {
    dispatch(setLanguage(code));
    localized.setLanguage(code);
  };

  return (
    <div>
      <Preloader loading={loading} background={0} />
      <Stub
        maxWidth={639}
        title={localized.mobileErrorTitle}
        text={localized.mobileErrorText}
        language={main.language || "en"}
        changeLanguage={changeLanguage}
      />
      <CSSTransition
        in={main.message}
        timeout={700}
        mountOnEnter
        unmountOnExit
        classNames="my-node"
      >
        <Message
          show={main.message}
          id="main"
          title={main.infoTitle}
          message={main.infoText}
          isError={main.isError}
          onAccept={closeInfo}
        />
      </CSSTransition>

      {main.page === "auth" && <AuthPage />}
      {main.page === "logs" && <LogsPage />}
    </div>
  );
};

export default MainPage;
