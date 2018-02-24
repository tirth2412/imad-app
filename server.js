var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles={
    'article-one':{
        title:"Article-1",
        heading:"Article one",
        content:`<p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>
                    <p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>
                    <p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>`
    },
    'article-two':{
        title:"Article-2",
        heading:"Article Two",
        content:`<p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>
                    <p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>
                    <p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>`
    },
    'article-three':{
        title:"Article-3",
        heading:"Article Three",
        content:`<p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>
                    <p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>
                    <p>
                        This is for testing purpose only.
                        All you can Understand...:)
                    </p>`
    }
};

function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=
    `<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width, initial-scale=1">
        <link href="ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">HOME</a>
            </div>
            <hr>
            <h3>
                ${heading}
            </h3>
            <div>
                ${content}
            </div>
        </div>
    </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var counter=1;
app.get('/counter',function (req,res) {
  counter=counter+1;
  res.send(counter.toString());
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
