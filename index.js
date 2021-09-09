const express = require("express");
const app = express();
const connection = require("./database/database");

//Importa os Controllers
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

//Importa os Models
const Article = require("./articles/Article");
const Category = require("./categories/Category");

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database
connection.authenticate().then(() => {
    console.log("Banco de dados OK")
}).catch((error) => {
    console.log(error);
})

//Rotas
app.use("/", categoriesController);
app.use("/", articlesController);


app.get("/", (req, res) => {
    res.render("index");
})


app.listen(8080, () => {
    console.log("Servidor OK")
})