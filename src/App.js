import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/fragment/Header";
import MainPage from "./component/MainPage";
import NotFoundPage from "./component/NotFoundPage";
import Footer from "./component/fragment/Footer";
import { ThemeContext } from "./context/ThemeContext";
import { LoginContext } from "./context/LoginContext";
import { useState } from "react";
import "./App.css";
import LoginPage from "./component/LoginPage";

function App() {
    const [isDark, setIsDark] = useState(false);
    const [user, setUser] = useState({
        id: "1234",
        pw: "1234",
        name: "김승윤",
        like: [],
    });

    // if(user == null){
    //   window.location.href= "/login";
    // }

    return (
        <LoginContext.Provider value={{ user, setUser }}>
            <ThemeContext.Provider value={{ isDark, setIsDark }}>
                {user ? <Header /> : ""}
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="/" element={<MainPage />}></Route>
                        <Route path="*" element={<NotFoundPage />}></Route>
                    </Routes>
                </BrowserRouter>
                {user ? <Footer /> : ""}
            </ThemeContext.Provider>
        </LoginContext.Provider>
    );
}

export default App;
