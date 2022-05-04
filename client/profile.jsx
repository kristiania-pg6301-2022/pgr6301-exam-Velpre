import React, { useContext } from "react";
import { ApplicationContext } from "./applicationContext";
import { useNavigate } from "react-router-dom";

export function Profile({ user, reload }) {
  const { logout } = useContext(ApplicationContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout("/api/login", reload, navigate);
  }

  return (
    <div>
      {user.google ? (
        <div>
          <h1>
            User profile: {user.google.name} ({user.google.email})
          </h1>
          <img
            src={user.google.picture}
            alt={user.google.name + " profile picture"}
          />
        </div>
      ) : (
        <h1>
          User profile: {user.hk.name} ({user.hk.email})
        </h1>
      )}
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}
