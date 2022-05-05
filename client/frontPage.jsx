import React, { useState, useContext } from "react";
import { useLoading } from "./lib/useLoading";
import { ApplicationContext } from "./applicationContext";

export function FrontPage({ user, reload }) {
  return (
    <div>
      <ListArticles user={user} />
      {user.hk && (
        <div className="front-page-editor">
          <EditorAdd />
          <EditorUpdate />
        </div>
      )}
    </div>
  );
}

export function ListArticles({ user }) {
  const { listArticles } = useContext(ApplicationContext);
  const [chosenArticle, setChosenArticle] = useState("");

  const { loading, error, data } = useLoading(async () => listArticles(), []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  const handleClick = (article) => {
    setChosenArticle(article);
  };

  if (user.google || user.hk) {
    return (
      <div className="list-articles-frontpage-loged">
        <h1>Our Articles</h1>
        <div className="grid-split-frontpage">
          <div>
            {data.map((article, index) => (
              <div key={index}>
                <button onClick={() => handleClick(article)}>
                  {article.title}
                </button>
              </div>
            ))}
          </div>
          <div>{chosenArticle && <ArticleCard article={chosenArticle} />}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-articles-frontpage">
      <h1>Our Articles</h1>
      {data.map((article, index) => (
        <div>
          <h3>{article.title}</h3>
        </div>
      ))}
    </div>
  );
}

function ArticleCard({ article }) {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>Category: {article.category}</p>
      <p>Plot: {article.plot}</p>
    </div>
  );
}

export function EditorAdd() {
  const { createArticle } = useContext(ApplicationContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [plot, setPlot] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    createArticle({ title, category, plot });
    setTitle("");
    setCategory("");
    setPlot("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Article</h1>
      <div>
        <label>
          <div>
            <strong>Category:</strong>
          </div>
          <select required onChange={(e) => setCategory(e.target.value)}>
            <option value={"General"}>General</option>
            <option value={"Local"}>Local</option>
            <option value={"Aboard"}>Aboard</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <div>
            <strong>Title:</strong>
          </div>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <div>
            <strong>Plot:</strong>
          </div>
          <textarea
            required
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
        </label>
      </div>

      <button>Submit</button>
    </form>
  );
}

function EditorUpdate() {
  const { createArticle } = useContext(ApplicationContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [plot, setPlot] = useState("");

  //const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createArticle({ title, category, plot });
    console.log(res);

    setTitle("");
    setCategory("");
    setPlot("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Article</h1>
      <div>
        <label>
          <div>
            <strong>Category:</strong>
          </div>
          <select required onChange={(e) => setCategory(e.target.value)}>
            <option value={"General"}>General</option>
            <option value={"Local"}>Local</option>
            <option value={"Aboard"}>Aboard</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <div>
            <strong>Title:</strong>
          </div>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <div>
            <strong>Plot:</strong>
          </div>
          <textarea
            required
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
        </label>
      </div>

      <button>Submit</button>
    </form>
  );
}
