var path = require('path'),
    fs = require('fs');
var fortune = require('./fortune.js');


var _getAuthor = function (req, res) {
    res.end("Autor: Alan");
};
var _getFortune = function (req, res) {
    console.log('Se solicita fortuna....'.random);
    //NO Bloqueante
    fortune.getFortune(function (fortunePaperObj) {
        //Configurar el encabezado
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        console.log(`Contestando: ${fortunePaperObj}`.cyan);
        res.end(fortunePaperObj);
    });
};
//-----
// Objeto manejadores
var handler = {};
// Registro de manejadores en el Objeto manejadores
handler['/getauthor'] = _getAuthor;
handler['/getfortune'] = _getFortune;
// Exportando handler(Objeto manejador)
module.exports = handler;