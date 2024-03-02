import { FC } from "react";
import "./assets/scss/style.scss";
import { Providers } from "./store/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./modules/main/MainPage";

const App: FC = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
