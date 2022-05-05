import React from "react";
import { useNavigate } from "react-router-dom";

export function Profile({ user, reload, logout }) {

  const navigate = useNavigate();

  async function handleLogout() {
    await logout("/api/login", reload, navigate);
  }

  return (
    <div className="profile">
        <h1>{!user ? "Profile" : "You are not loged in"}</h1>
      {user.google && (
        <div>
          <h1>
            User profile: {user.google.name} ({user.google.email})
          </h1>
          <img
            src={user.google.picture}
            alt={user.google.name + " profile picture"}
          />
        </div>
      )}

      {user.hk && (
          <h1>
              User profile: {user.hk.name} ({user.hk.email})
          </h1>
      )}

      <div>
        <button className="btn" onClick={handleLogout}>
            {!user ? "Log out" : "Back"}
        </button>
      </div>
    </div>
  );
}
