import React, {useState, useContext} from "react";
import { useLoading } from "./lib/useLoading";
import { ApplicationContext } from "./applicationContext";


export function FrontPage({user, reload}) {
    return (
        <div className="front-page">
            <ListArticleTitles reload={reload} user={user} />
            {user.google && <User/>}
            {user.hk && <Editor/>}
        </div>
    );
}

export function ListArticleTitles({user, reload}) {
    const { listArticles } = useContext(ApplicationContext);

    const { loading, error, data } = useLoading(async () => listArticles());

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

    return (
        <div className="box1">
            <h1>Our Articles</h1>
            <p>(Log in to read)</p>
            <div className="titles">
                {data.map((article, index) => (
                    <button key={index}> {article.title}</button>
                ))}
            </div>
        </div>
    );
}


function User(user) {
    const { article } = useContext(ApplicationContext);

return (

    <h1 className="box2" >"test"</h1>
)

}


export function Editor() {
    const { createArticle} = useContext(ApplicationContext);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [plot, setPlot] = useState("");

   //const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await createArticle({title, category, plot});
        console.log(res)

        setTitle("");
        setCategory("");
        setPlot("");
    }


    return (
        <form  className="box2" onSubmit={handleSubmit}>
            <h1>Add Article</h1>
            <div>
                <label>
                    <div>
                    <strong>Category</strong>
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
                        <strong>Title</strong>
                    </div>
                    <input required value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    <div>
                        <strong>Plot</strong>
                    </div>
                    <textarea required value={plot} onChange={(e) => setPlot(e.target.value)} />
                </label>
            </div>

            <button >Submit</button>
        </form>
    );
}




