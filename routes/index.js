var express = require('express');
var router = express.Router();

/* tentativa de listar as 2 tabelas no index */
//router.get('/', async (req, res, next) => {
//  try{
//    const clientes = await global.db.findAllClients();
//    const produtos = await global.db.findAllProducts();
//    res.render('index', {clientes,produtos});
//  }catch (err){
//    next(err);
//  }
//});

/*  ROTA PRINCIPAL  */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* ----- ROTAS DE CLIENTE ----- */

//  LISTAR TODOS CLIENTES
router.get('/listarClientes', function (req, res) {
  global.db.findAllClients((err, docs) => {
    if (err) { return console.log(err); }
    res.render('listarClientes', { docs });
  });
});

//  PÁGINA DE CADASTRAR CLIENTE
router.get('/novoCliente', function (req, res, next) {
  res.render('novoCliente', {
    title: 'Cadastrando Cliente',
    doc: {
      "nome": "",
      "idade": "",
      "uf": ""
    },
    action: '/novoCliente'
  });
});

//  CADASTRAR CLIENTE
router.post('/novoCliente', function (req, res, next) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insertClient({ nome, idade, uf }, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/listarClientes');
  });
});

//  PÁGINA DE EDITAR CLIENTE
router.get('/editCliente/:id', function (req, res, next) {
  var id = req.params.id;
  global.db.findOneClient(id, (err, docs) => {
    if (err) { return console.log(err); }
    res.render('novoCliente', {
      title: 'Alterando o Cliente',
      doc: docs[0],
      action: '/editCliente/' + docs[0]._id
    });
  });
});

//  EDITAR CLIENTE
router.post('/editCliente/:id', function (req, res, next) {
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.updateClient(id, { nome, idade, uf }, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/listarClientes');
  });
});

//  DELETAR CLIENTE
router.get('/deleteCliente/:id', function (req, res) {
  var id = req.params.id;
  global.db.deleteOneClient(id, (err, r) => {
    if (err) { return console.log(err); }
    res.redirect('/listarClientes');
  });
});


/* ----- ROTAS DE PRODUTO ----- */

//  LISTAR TODOS PRODUTOS
router.get('/listarProdutos', function (req, res) {
  global.db.findAllProducts((err, docs) => {
    if (err) { return console.log(err); }
    res.render('listarProdutos', { docs });
  });
});

//  PÁGINA DE CADASTRAR PRODUTO
router.get('/novoProduto', function (req, res, next) {
  res.render('novoProduto', {
    title: 'Cadastrando Produto',
    doc: {
      "descricao": "",
      "valor_compra": "",
      "valor_venda": ""
    },
    action: '/novoProduto'
  });
});

//  CADASTRAR PRODUTO
router.post('/novoProduto', function (req, res, next) {
  const descricao = req.body.descricao;
  const valor_compra = req.body.valor_compra;
  const valor_venda = req.body.valor_venda;
  global.db.insertProduct({ descricao, valor_compra, valor_venda }, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/listarProdutos');
  });
});

//  PÁGINA DE EDITAR PRODUTO
router.get('/editProduto/:id', function (req, res, next) {
  var id = req.params.id;
  global.db.findOneProduct(id, (err, docs) => {
    if (err) { return console.log(err); }
    res.render('novoProduto', {
      title: 'Alterando o Produto',
      doc: docs[0],
      action: '/editProduto/' + docs[0]._id
    });
  });
});

//  EDITAR PRODUTO
router.post('/editProduto/:id', function (req, res, next) {
  const id = req.params.id;
  const descricao = req.body.descricao;
  const valor_compra = req.body.valor_compra;
  const valor_venda = req.body.valor_venda;
  global.db.updateProduct(id, { descricao, valor_compra, valor_venda }, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/listarProdutos');
  });
});

//  DELETAR PRODUTO
router.get('/deleteProduto/:id', function (req, res) {
  var id = req.params.id;
  global.db.deleteOneProduct(id, (err, r) => {
    if (err) { return console.log(err); }
    res.redirect('/listarProdutos');
  });
});

module.exports = router;
