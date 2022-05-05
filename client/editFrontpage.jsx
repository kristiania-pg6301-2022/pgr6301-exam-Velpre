import React, { useState, useContext } from "react";
import { useLoading } from "./lib/useLoading";
import { ApplicationContext } from "./applicationContext";
import {useNavigate} from "react-router-dom";

export function EditFrontpage({ user, reload }) {
    const { listArticles } = useContext(ApplicationContext);
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

    if (!user || Object.keys(user).length === 0){
        return <h1>You need to log in</h1>
    }

    return (
        <div className="edit-frontpage">
            <EditorUpdate data={data} user={user} reload={reload}/>
            <EditorDelete data={data} reload={reload} user={user} />
        </div>
    );
}

function EditorUpdate({user, data, reload}) {
    const navigate = useNavigate();
    const { updateArticle } = useContext(ApplicationContext);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [plot, setPlot] = useState("");
    const [author, setAuthor] =useState(user.hk.author)
    const [articleToUpdate, setArticleToUpdate] =useState()



    async function handleSubmit(e) {
        e.preventDefault();
        updateArticle({ title, category, plot, author, articleToUpdate });
        setTitle("");
        setCategory("");
        setPlot("");
        reload()
        navigate("/")
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Article</h1>
            <div>
                <label>
                    <div>
                        <strong>Choose Article to update:</strong>
                    </div>
                    <select onChange={(e) => setArticleToUpdate(e.target.value)}>
                        {data.map((article, index) => (
                            <option key={index} value={article.title}>{article.title}</option>
                        ))
                        }
                    </select>
                </label>
            </div>
            <div>
                <label>
                    <div>
                        <strong>Choose Category:</strong>
                    </div>
                    <select required onChange={(e) => setCategory(e.target.value)}>
                        <option value="" selected></option>
                        <option value={"General"}>General</option>
                        <option value={"Local"}>Local</option>
                        <option value={"Aboard"}>Aboard</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    <div>
                        <strong>New Title:</strong>
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
                        <strong>New Plot:</strong>
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

function EditorDelete({reload, user, data}) {
    const navigate = useNavigate();
    const { deleteArticle } = useContext(ApplicationContext);
    const [title, setTitle] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        deleteArticle({title});
        setTitle("");
        navigate("/")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Delete Article</h1>
            <div>
                <label>
                    <strong>Delete Article:</strong>
                    <select required onChange={(e) => setTitle(e.target.value)}>
                        <option value="" selected></option>
                        {data.map((article, index) => (
                            <option key={index} value={article.title}>{article.title}</option>
                        ))
                        }
                    </select>
                </label>
            </div>
            <button>Delete</button>
        </form>
    );
}