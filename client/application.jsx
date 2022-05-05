import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "./applicationContext";
import { useLoading } from "./lib/useLoading";
import {
  BrowserRouter,
  Link,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";
import { LoginCallback } from "./pages/loginFrontpage";
import { LoginFrontPage } from "./pages/loginFrontpage";
import { Profile } from "./pages/profile";
import { FrontPage } from "./frontPage";
import {EditFrontpage} from "./editFrontpage";

function LoginActions({ user, logout, reload }) {
  const navigate = useNavigate();
  if (!user || Object.keys(user).length === 0) {
    return (
      <button className="btn" onClick={() => navigateLogin()}>
        Login
      </button>
    );
  }

  function navigateProfile() {
    navigate("/profile");
  }

  function navigateLogin() {
    navigate("/login");
  }

  function navigateEdit() {
    navigate("/edit");
  }

  return (
    <>
      <button className="btn" onClick={() => navigateProfile()}>
        {user.google?.name ? `User profile` : `Editor profile`}
      </button>
      {user.hk && (<button className="btn" onClick={() => navigateEdit()}>Edit Articles</button>)}
      <button
        className="btn"
        onClick={async () => await logout("/api/login", reload, navigate)}
      >
        Log ut
      </button>
    </>
  );
}

export function Application() {
  //Websockets
  const [articles, setArticles] = useState([]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    ws.onmessage = (event) => {
      const { title, plot, category } = JSON.parse(event.data);
      setArticles((articles) => [...articles, { title, category, plot }]);
    };
    setWs(ws);
  }, []);

  function handleNewArticle(articles) {
    ws.send(JSON.stringify(articles));
  }

  //Server
  const { fetchLogin, logout } = useContext(ApplicationContext);
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
        <Route
          path={"/"}
          element={
            <FrontPage
              handleNewArticle={handleNewArticle}
              articles={articles}
              user={data.user}
              reload={reload}
            />
          }
        />
        <Route
          path={"/login/*"}
          element={<LoginFrontPage config={data.config} reload={reload} />}
        />
        <Route
          path={"/login/:provider/callback"}
          element={<LoginCallback config={data.config} reload={reload} />}
        />

        <Route
          path={"/profile"}
          element={
            <Profile user={data?.user} reload={reload} logout={logout} />
          }
        />

        <Route
            path={"/edit"}
            element={
              <EditFrontpage user={data?.user} reload={reload}/>
            }
        />
      </Routes>
    </BrowserRouter>
  );
}
