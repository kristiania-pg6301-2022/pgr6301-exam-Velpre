import React, { useContext } from "react";
import "./app.css";
import { ApplicationContext } from "./applicationContext";
import { useLoading } from "./lib/useLoading";
import {BrowserRouter, Link, useNavigate, Route, Routes} from "react-router-dom";
import {LoginCallback } from "./pages/loginFrontpage";
import { FrontPage } from "./pages/frontPage";

import { LoginFrontPage } from "./pages/loginFrontpage";
import {Profile} from "./pages/profile";



function LoginActions({ user,logout, reload }) {
    const navigate = useNavigate();
    if (!user || Object.keys(user).length === 0) {
        return <button onClick={()=>navigateLogin()}>Login</button>;
    }

    function navigateProfile(){
        navigate("/profile")
    }

    function navigateLogin(){
        navigate("/login")
    }

    return (
        <>
            <button onClick={() => navigateProfile()}>{user.google?.name ? `User profile` : `Editor profile`}</button>
            <button onClick={async () => await logout("/api/login", reload, navigate)}>Log ut</button>
        </>
    );
}

function User(user) {
    return <>
        {user.user.google ? <h1>Logget User</h1> : <h1>Ulogget user</h1>}

    </>

}

function Editor(user) {
    return <>
        {user.user.hk ? <h1>Logget Editor</h1> : <h1>Ulogget editor</h1>}

    </>
}

export function Application() {

    //Server
    const { fetchLogin, logout} = useContext(ApplicationContext);
    const { data, error, loading, reload } = useLoading(fetchLogin);

    if (error) {
        return <div>Error: {error.toString()}</div>;
    }
    if (loading) {
        return <div>Please wait...</div>;
    }

    return (
        <BrowserRouter>
            <header>
                <Link to={"/"}>Front page</Link>
                <LoginActions user={data?.user} logout={logout} reload={reload} />
            </header>


            <Routes>
                <Route path={"/"} element={<FrontPage />} /> //SKAL LISTE titler automatisk
                <Route
                    path={"/login/*"}
                    element={<LoginFrontPage config={data.config} reload={reload} />}
                />
                <Route
                    path={"/login/:provider/callback"}
                    element={<LoginCallback config={data.config} reload={reload} />}
                />

                <Route path={"/profile"} element={<Profile user={data?.user} reload={reload} logout={logout}/>} />

                <Route path={"/user"} element={<User user={data?.user}/>} />
                <Route path={"/editor"} element={<Editor user={data?.user}/>} />

            </Routes>
        </BrowserRouter>

    );
}
