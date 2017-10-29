const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
	const name = req.cookies.username;
	if(name){res.render("index", {name});}
	else{res.redirect("/hello");}
});

router.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if(name){res.redirect("/");}
	else{res.render('hello');}
});

router.post('/hello', (req, res) => {
	res.cookie("username", req.body.username )
	res.redirect("/");
});

router.post('/goodbye', (req, res) => {
	res.clearCookie('username');
	res.redirect("/");
});

router.get('/select', (req, res) => {
	const select = req.cookies.select;

	res.render("select", {select:select} );
});

router.post('/select', (req, res) => {
	res.cookie("select", req.body.select);
	res.redirect("/select");
});



module.exports = router;