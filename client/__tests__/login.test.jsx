import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { LoginFrontPage, StartLogin } from "../pages/loginFrontpage";
import { Application } from "../application";
import { ApplicationContext } from "../applicationContext";

describe("login page", () => {
  it("redirect to log in with google", async () => {
    // replace window.location to be able to detect redirects
    const location = new URL("https://www.example.com");
    delete window.location;
    window.location = new URL(location);

    const authorization_endpoint = `https://foo.example.com/auth`;
    const client_id = `1095582733852-smqnbrhcoiasjjg8q28u0g1k3nu997b0.apps.googleusercontent.com`;

    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <LoginFrontPage
          config={{
            google: { authorization_endpoint, client_id },
          }}
        />
      </MemoryRouter>,
      domElement
    );
    await act(async () => {
      await Simulate.click(domElement.querySelector("button"));
    });
    const redirect_uri = `${location.origin}/login/google/callback`;
    expect(window.location.origin + window.location.pathname).toEqual(
      authorization_endpoint
    );
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search.substring(1))
    );
    expect(params).toMatchObject({ client_id, redirect_uri });
  });
/*
  it("posts received token to server", async () => {
    window.sessionStorage.setItem("expected_state", "test");
    // replace window.location to simulate returning
    const access_token = `abc`;
    const location = new URL(
      `https://www.example.com#access_token=${access_token}&state=test`
    );
    delete window.location;
    window.location = new URL(location);

    const domElement = document.createElement("div");
    const registerLogin = jest.fn();
    const reload = jest.fn();
    await act(() => {
      ReactDOM.render(
        <MemoryRouter initialEntries={["/google/callback"]}>
          <ApplicationContext.Provider value={{ registerLogin }}>
            <LoginFrontPage reload={reload} />
          </ApplicationContext.Provider>
        </MemoryRouter>,
        domElement
      );
    });
    expect(registerLogin).toBeCalledWith("google", { access_token });
  });

 */

  it("render Login", () => {
    const element = document.createElement("div");
    ReactDOM.render(<StartLogin />, element);
    expect(element.querySelector("h1").innerHTML).toEqual("Login");
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("can navigate to user page", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>,
        container
      );
    });
  });
});
