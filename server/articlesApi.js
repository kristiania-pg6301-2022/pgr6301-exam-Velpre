import { Router } from "express";

export function ArticlesApi(mongoDatabase) {
  const router = new Router();

  let articles = [];

  router.get("/", async (req, res) => {
    articles = await mongoDatabase
      .collection("articel")
      .find()
      .map(({ title, category, plot, author }) => {
        //velger hva slags info skal retuneres fra db - bruker det hos clienten
        return { title, category, plot, author };
      })
      .toArray();

    res.json(articles);
  });

  router.post("/new", async (req, res) => {
    const { title, plot, category } = req.body;
    let checker = false;
    articles.map((a) => {
      if (a.title == title) {
        checker = true;
        res.sendStatus(400);
      }
    });
    if (!checker) {
      mongoDatabase.collection("articel").insertOne({ title, plot, category });
      res.sendStatus(204);
    }
  });

  router.post("/delete", async (req, res) => {
    const { title } = req.body;

    const query = { title: title };
    mongoDatabase.collection("articel").deleteOne(query)
        .then(result => console.log(`Deleted ${result.deletedCount} item.`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
});

  router.post("/update", async (req, res) => {
    const { category, title, author } = req.body;
    const query = { title: title };

    const update = {
      "$push": {
        "title": {
          "title": title
        }
      }
    };

    const options = { "upsert": false };

    mongoDatabase.collection("articel").updateOne(query, update, options)
        .then(result => {
          const { matchedCount, modifiedCount } = result;
          if(matchedCount && modifiedCount) {
            console.log(`Successfully added a new review.`)
          }
        })
        .catch(err => console.error(`Failed to add review: ${err}`))

  });



  return router;
}
