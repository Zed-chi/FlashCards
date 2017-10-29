const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

/*routers*/
const routes = require("./routes/index");
const cardRoutes = require("./routes/cards");

/*setups*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/static", express.static("public"));
app.set("view engine", "pug");

/*middlewares*/
app.use((req,res,next)=>{
	req.message = "Message";
	const err = new Error("error occured");
	err.status = 500;
	next();
});

app.use((req,res,next)=>{
	console.log(req.message);
	next();
});

/*routes*/
app.use(routes);
app.use("/cards", cardRoutes);



/*handlers*/
app.use((req,res,next)=>{
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(err.status);
	res.render("error", err)
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});