const express = require('express');
const _ = require('underscore');

const { verificarToken } = require('../middlewares/autenticacion');
const { verificarRoot } = require('../middlewares/autenticacion');

const Resultado = require('../models/resultado');


const app = express();

app.get('/todosresultados', verificarToken ,(req, res)=>{

    Resultado.find({})
    .exec( (err, resultados)=>{
        
        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Resultado.count({}, (err, pj)=> {
            
            res.json({
                ok : true,
                resultados,
                pj
            });
        })

    })

});

app.post('/nuevoresultado' , [verificarToken,verificarRoot] ,(req, res)=>{

    let body = req.body;

    let resultado = new Resultado({
        partido: body.partido,
        resultado : body.resultado
    });

    resultado.save( (err,resultadoDB) =>{

        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok : true,
            resultado : resultadoDB
        });

    });

});

app.put('/modificarresultado/:partido', [verificarToken,verificarRoot], (req, res) =>{

    let partido = req.params.partido;
    
    let body = _.pick(req.body, 'resultado' );

    Resultado.findOneAndUpdate({'partido' : partido}, body, {new : true , runValidators : true} ,(err, partidoDB) => {

        if (err) {
            return res.status(400).json({
                ok : false,
                err
            });
        }
        
        if(!partidoDB){
            return res.status(400).json({
                ok : false,
                err : {
                    message : 'Partido no encontrado'
                }
            });
        }
        return res.json({
            ok: true,
            partido : partidoDB
        });
    } );

});


module.exports = app; 