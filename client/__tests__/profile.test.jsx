import * as React from "react";
import { render } from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Profile } from "../pages/profile";
import { Simulate } from "react-dom/test-utils";

describe("Profile compoent", () => {
  it("Render users", () => {
    const user = {
      google: {
        email: "sajmon.vp@gmail.com",
        name: "V P",
        picture:
          "https://lh3.googleusercontent.com/a/AATXAJzKiTXm2d-4PFX3RwEkS6MBhjOGZNv4PBwEQ3G-=s96-c",
      },
    };
    const fun = jest.fn();
    const element = document.createElement("div");
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Profile user={user} reload={fun} />
      </MemoryRouter>,
      element
    );

    expect(element.querySelector("h1").innerHTML).toEqual("You are not loged in");
    expect(element.innerHTML).toMatchSnapshot();
  });
});
