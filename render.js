var fs  = require("fs"),
    fsp = fs.promises,
    ejs = require("ejs");

fsp.readFile('articles/articles.json', 'utf8' )
    .then(articlesFiles => {
    	var files = JSON.parse(articlesFiles);
	var articles = []
	files.forEach(e=>{
	    e.body = fs.readFileSync("articles/" + e.body, 'utf8');
	    articles.push(e);  
	});

	ejs.renderFile("index.ejs", {articles:articles}, function(err, str){
	    fs.writeFile('index.html', str, function(err) {
		if(err) { console.log(err); return false }
		return true;
	    }); 
	});	
    })
    .catch(error=> {
    	console.log(error);
    });


