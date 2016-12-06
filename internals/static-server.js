var fs = require('fs'),
    mime = require('mime'),
    path = require('path'),
    config = require('../config/config.js');

exports.serve = function (url, res) {
    var urlPath = path.resolve(config.STATIC_PATH + url);
    console.log(`Recurso solicitado:    ${urlPath}`.data);

    fs.exists(urlPath, function (exists) {
        if (!exists) {
            //No existe
            console.log("No esta papi".error + urlPath);
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end('<h1>404 Recurso No Encontrado</h1>')
        } else {
            //Existe
            //Declarar mime en una variable
            var mimeType = mime.lookup(urlPath);
            fs.readFile(urlPath, function (err, content) {
                if (err) {
                    console.log(`Error al leer archivo ${err}`);
                    //Decidiendo el content type de la extension del archivo solicitado
                    res.writeHead(500, {
                        "Contenr-Type": "text/plain"
                    });
                    res.end('<h1>Error 500: Internal Error...</h1>');
                } else {
                    //Sirve el archivo
                    res.writeHead(200, {
                        "Content-Type": mimeType
                    });
                    console.log(`>Se sirve el archivo: ${urlPath}`.info);
                    res.end(content);
                }
            });
        }
    });
};