var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user: 'tirthtej1997',
    database: 'tirthtej1997',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var pool=new Pool(config);
app.get('/test-db',function(req,res){
   //make a req of select
   //get a response
   pool.query("SELECT * FROM test",function(err,result){
      if(err)
      { res.status(500).send(err.toString());   }
      else
      { res.send(JSON.stringify(result.rows));   }
   });
});

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

var counter=0;
app.get('/counter',function (req,res) {
  counter=counter+1;
  res.send(counter.toString());
});

app.get('/articles/:articleName', function (req, res) {
  //var articleName=req.params.articleName;
  //res.send(createTemplate(articles[articleName]));
  pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName] ,function(err,result){
      if(err)
      { res.status(500).send(err.toString());    }
      else
      {
          if(result.rows.length===0)
          { res.status(505).send("article not found");    }
          else
          {   var articleData=result.rows[0];
              res.send(createTemplate(articleData));    }
      }
  });
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
