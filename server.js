const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
})

server.get('/', function(req, res) {
  const about = {
    avatar_url: "https://avatars.githubusercontent.com/u/7413619?v=4",
    name: "Alisson Moraes",
    role: "Desenvolvedor Fullstack",
    description: "Criando soluções para os problemas do dia a dia nesse mundão.",
    links: [
      { name: "Github", url: "https://github.com/AlissonMoraesDev"},
      { name: "Instagram", url: "https://www.instagram.com/alissonmoraesdev/"},
      { name: "LinkedIn", url: "https://www.linkedin.com/in/alissonmoraesdev/"}
    ]
  }
  return res.render("about", { about })
})

server.get('/portfolio', function(req, res) {
  return res.render("portfolio", { items: videos })
})

server.get('/cursos', function(req, res) {
  const curso = {
    modulo: [
      { name: "Lógica de programação", time_estimed: "2 semanas"},
      { name: "Desenvolvimento web fundamentos", time_estimed: "4 semanas"},
      { name: "Deploy da Aplicação", time_estimed: "1 semana"}
    ]
  }

  return res.render("cursos", { curso })
})

server.use(function(req, res) {
  res.status(404).render("not-found")
})

server.listen(5000, function() {
  console.log('Server is running...')
})