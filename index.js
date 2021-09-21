const express = require("express");
const app = express();
const connection = require("./database/database");
const session = require("express-session");

//Importa os Controllers
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./user/UsersController");

//Importa os Models
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/Users");

//View engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret: "prosperidade",
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true
}));

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
app.use("/", usersController);

app.get("/", (req, res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        })
    })
})

app.get("/:slug", (req,res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            })
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
})

app.get("/category/:slug", (req,res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles,categories: categories})
            })
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})

app.listen(8080, () => {
    console.log("Servidor OK")
})