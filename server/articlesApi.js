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

  return router;
}
