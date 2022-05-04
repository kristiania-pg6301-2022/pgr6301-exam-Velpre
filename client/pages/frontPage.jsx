import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
    //skal liste bare titell fra DB med en gang
  return (
    <div>
      <h1>Våre Artikler</h1>
      <ul>
        <li>
          <Link to={"/movies"}>List movies</Link>
        </li>
      </ul>
    </div>
  );
}
