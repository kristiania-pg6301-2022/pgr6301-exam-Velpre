import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import { ArticlesApi } from "../articlesApi";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);

beforeAll(async () => {
  await mongoClient.connect(); //Connecter på clienten
  const database = mongoClient.db("MyTest"); //Angir hvilken DB skal den jobbe med
  await database.collection("articles").deleteMany({}); //Sletter alle movies fra test database
  app.use("/api/articles", ArticlesApi(database));
});
afterAll(() => {
  mongoClient.close(); //Stenger connection etter at testene er kjørt
});

describe("articles api", () => {
  it("adds a new article", async () => {
    await request(app)
      .post("/api/articles/new")
      .send({
        title: "My Test Article",
        category: "Action",
        plot: "plot",
      })
      .expect(204);
    expect(
      (await request(app).get("/api/articles").expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain("My Test Article");
  });
  it("lists existing movies", async () => {
    expect(
      (await request(app).get("/api/articles").expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain("My Test Article");
  });
});
