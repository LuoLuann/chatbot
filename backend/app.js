// ---- arquivo de inicialização da aplicação
require("dotenv").config();

const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT
const router = require("./scr/routes/Router");

// Resolvendo cors
// app.use(cors({origin: "http://localhost:3000"}))
// app.use(cors({origin: "http://localhost:5173"}))

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };
app.use(cors(corsOptions))
// DB connection
require('./configs/db.js')

// rotas
app.use(express.json())

//app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})

