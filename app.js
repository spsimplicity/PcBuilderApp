var express =  require('express'),
    https =    require('https'),
    fs =       require('fs'),
    path =     require('path'),
    // Page routes
    routes =   require('./routes'),
    angTemps = require('./routes/angularTemplates');

// Setup ssh keys
var sshOptions = {
    key:  fs.readFileSync('./keys/pcKey.pem'),
    cert: fs.readFileSync('./keys/pcKeyCert.pem')
};

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({
    src: __dirname + '/public/stylesheets/less',
    dest: __dirname + '/public/stylesheets/css',
    prefix: '/stylesheets/css',
    compress: true,
    force: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if('development' == app.get('env')) {
  app.use(express.errorHandler());
}
if('production' == app.get('env')) {
}

// Homepage
app.get('/', routes.index);

// Angular template requests
app.get('/view/homepage', angTemps.homepage);

https.createServer(sshOptions, app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});