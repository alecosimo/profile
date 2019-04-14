var fs  = require("fs"),
    fsp = fs.promises,
    ejs = require("ejs");

//var url = "https://alecosimo.github.io/profile/compiledViews"
//var url = "file:///home/alecosimo/watson/cvproject/profile/compiledViews"

fsp.readFile('views/articles/articles.json', 'utf8' )
    .then(articlesFiles => {
    	var files = JSON.parse(articlesFiles);
	var articles = []
	files.forEach((e, index)=>{
	    articles.push(e);
	    body = fs.readFileSync("views/articles/" + e.name, 'utf8');
	    ejs.renderFile("views/show-article.ejs", {article:e, articleBody:body, prevArt:files[index-1], nextArt:files[index+1]}, function(err, str){
		fs.writeFile(e.name, str, function(err) {
		    if(err) { console.log(err); return false }
		    return true;
		}); 
	    });	

	});

	ejs.renderFile("views/index.ejs", {articles:articles}, function(err, str){
	    fs.writeFile('index.html', str, function(err) {
		if(err) { console.log(err); return false }
		return true;
	    }); 
	});	

    })
    .catch(error=> {
    	console.log(error);
    });


