import React, { useContext, useEffect, useState } from "react";
import "./app.css";
import { ApplicationContext } from "./applicationContext";
import { useLoading } from "./useLoading";
import {BrowserRouter, Link, useNavigate, Route, Routes} from "react-router-dom";
import { Login, LoginCallback } from "./login";
import { FrontPage } from "./frontPage";

import { LoginFrontPage } from "./pages/loginFrontpage";


function UserActions({ user }) {
    if (!user || Object.keys(user).length === 0) {
        return <Link to={"/login"}>Login</Link>;
    }

    return (
        <>
            <Link to={"/profile"}>
                {user.google?.name ? `Profile for ${user.google.name}` : "Profile"}
            </Link>
            <Link to={"/login/endsession"}>Log out</Link>
        </>
    );
}

//SKAL RENDRE RIKTIG USER INTERFACE
function CheckUser({user}){
    const navigate = useNavigate();

    console.log(user)
    if (user.google){
        //navigate("/googleInterface")
        return <h1>Hello Google</h1>
    }
    if(user.hk){
        //navigate("/hkInterface")
    }

    if(user.google == undefined || user.hk == undefined){

        navigate("/login")
        return null;
    }
}

export function Application() {

    //Server
    const { fetchLogin } = useContext(ApplicationContext);
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
                <UserActions user={data?.user} />
            </header>


            <Routes>
                <Route path={"/"} element={<FrontPage />} /> //SKAL LISTE AUTOMATISK
                <Route
                    path={"/login/*"}
                    element={<LoginFrontPage config={data.config} reload={reload} />}
                />
                <Route
                    path={"/login/:provider/callback"}
                    element={<LoginCallback config={data.config} reload={reload} />}
                />

            </Routes>
        </BrowserRouter>

    );
}

/* VENTER MED DENNE
     <Route
                    path={"/meny"}
                    element={<CheckUser user={data?.user} />}
                />
 */