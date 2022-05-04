import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
    //skal liste data med en gang
  return (
    <div>
      <h1>Movie Database</h1>
      <ul>
        <li>
          <Link to={"/movies"}>List movies</Link>
        </li>
      </ul>
    </div>
  );
}
