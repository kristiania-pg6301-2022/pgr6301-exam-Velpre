import React, {useState} from "react";
import { useLoading } from "./lib/useLoading";
import React, { useContext } from "react";
import { ApplicationContext } from "./applicationContext";
import {useNavigate} from "react-router-dom";

export function FrontPage({user, reload}) {
    return (
        <div>
            <ListArticleTitles reload={reload} user={user} />
            {user.google && <User/>}
            {user.hk && <Editor></Editor>}
        </div>
    );
}

function ListArticleTitles({user, reload}) {
    const { listArticles } = useContext(ApplicationContext);
    const {chosenArticle, setChosenArticle} = useState();

    const { loading, error, data } = useLoading(async () => listArticles());

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
    function showWholeArticle (article){
        reload()
        console.log(article)
        console.log(user)
        if(user){
            return(<>
                <h1>{article.title}</h1>
                <h1>{article.plot}</h1>
                <h1>{article.category}</h1>
            </>)
        }
    }

    return (
        <div>
            <h1>Our Articles</h1>
            <p>(Log in to read)</p>

            {data.map((article, index) => (
                <button onClick={()=>showWholeArticle(article)} key={index}> {article.title}</button>
            ))}
        </div>
    );
}



function User(user) {
    const { article } = useContext(ApplicationContext);

return (

    <h1>"test"</h1>
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
        await createArticle({title, category, plot});

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

            <button>Submit</button>
        </form>
    );
}




