import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { ApplicationContext } from "../applicationContext";
import { EditorAdd } from "../frontPage";

describe("add article", () => {
  it("shows article form", () => {
    const element = document.createElement("div");
    ReactDOM.render(<EditorAdd />, element);
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Category:", "Title:", "Plot:"]);
    expect(element.querySelector("h1").innerHTML).toEqual("Add Article");
  });

  it("adds Articles on submit", () => {
    const createArticle = jest.fn();
    const handleNewArticle = jest.fn();
    const element = document.createElement("div");
    ReactDOM.render(
      <ApplicationContext.Provider value={{ createArticle, handleNewArticle}}>
        <EditorAdd handleNewArticle={handleNewArticle}/>
      </ApplicationContext.Provider>,
      element
    );

    Simulate.change(element.querySelector("form div:nth-of-type(1) select"), {
      target: { value: "General" },
    });
    Simulate.change(element.querySelector("form div:nth-of-type(2) input"), {
      target: { value: "Article title" },
    });

    Simulate.submit(element.querySelector("form"));
    expect(createArticle).toBeCalledWith({
      category: "General",
      title: "Article title",
      plot: "",
    });
  });
});
