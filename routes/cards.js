const express = require("express");
const router = express.Router();
const {data} = require("../data/flashcardData.json");
const {cards} = data;
//const colors = ["red", "blue", "green", "yellow"];

router.get("/",(req,res)=>{
	const len = cards.length;
	const id = "/cards/"+(Math.floor(Math.random()*len))+"?side=question";
	res.redirect(id);
});

router.get('/:id', (req, res) => {
	const { side } = req.query;
	if(!side){
		return res.redirect(`/cards/${id}?side=question`);
	}
	const id = req.params.id;
	const text = cards[id][side];
	const {hint} = cards[id];
	const name = req.cookies.username;
	const tempData = { text,id,name }; 
	if(side === "question"){
		tempData.hint = hint;
		tempData.link = "answer";
		tempData.side = "question";
	}
	else{
		tempData.link = "question";
		tempData.side = "answer";
	}

    res.render('card', tempData);
});

module.exports = router;