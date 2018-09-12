const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarRoot } = require('../middlewares/autenticacion');

const app = express();

app.get("/obtenerusuarios", verificarToken, (req, res) => {
  Usuario.find({}).exec((err, usuarios) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuarios
    });
  });
});

app.put('/participo/:id', [verificarToken,verificarRoot] ,(req, res) => {
  let id = req.params.id;
  
  if (!req.body.participo) {
    return res.status(400).json({
      ok: false,
      err: "se requiere el campo 'participo'"
    });
  }

  let participo = _.pick(req.body, "participo");

  Usuario.findByIdAndUpdate(
    id,
    participo,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Usuario no encontrado"
          }
        });
      }
      res.json({
        ok: true
      });
    }
  );

});

app.put("/actualizarpass", verificarToken, (req, res) =>{

    
    if( !req.body.password){
        return res.status(400).json({
          ok : false,
          err : 'se requiere el campo "password"'
        });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    let password = _.pick(req.body, "password");

    let user = req.usuario._id;

    
    Usuario.findByIdAndUpdate(user ,password,{ new:true , runValidators: true},
    (err, usuarioDB)=>{

      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Usuario no encontrado"
          }
        });
      }

      res.json({
        ok: true,
        message : "Password actualizado"
      });


    });

});

app.put("/actualizarpartidos/:id", verificarToken, (req, res) => {
  let id = req.params.id;
  let participacion;

  if (!req.body.prode) {
    return res.status(400).json({
      ok: false,
      err: "se requiere el campo 'prode'"
    });
  }

  Usuario.findById(id, (err, usuarioDB)=>{
    if(err){
      return res.status(400).json({
        ok : false,
        err
      });
    }
    if(!usuarioDB){
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no encontrado"
        }
      });
    }

    participacion = usuarioDB.participo;

  
    if(participacion == true){
      return res.status(202).json({
        ok: false,
        err : 'El usuario ya participó'
      });
    }
  
    let prode = _.pick(req.body, "prode");
  
    Usuario.findByIdAndUpdate(
      id,
      prode,
      { new: true, runValidators: true },
      (err, usuarioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }
  
        if (!usuarioDB) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "Usuario no encontrado"
            }
          });
        }
        res.json({
          ok: true,
          partido: usuarioDB
        });
      }
    );

  });

});

app.post("/nuevousuario", [verificarToken, verificarRoot]  ,(req, res) => {
 

 
  let body = req.body;

  if (!body.nombre || !body.password) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "No se enviaron los campos correctos (nombre y password)"
      }
    });
  }

  let usuario = new Usuario({
    nombre: body.nombre,
    password: bcrypt.hashSync(body.password, 10),
    role : body.role
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

      res.json({
      ok: true,
      usuario: usuarioDB
    });
  });

});

app.get("/usuariopartidos/:id", verificarToken, (req, res) => {
  let id = req.params.id;
  
  Usuario.findById(id,(err,usuarioDB)=>{
    
    if(err){
      return res.status(400).json({
        ok : false,
        err
      })
    }

    if(!usuarioDB){
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario no encontrado"
        }
      });
    }

    return res.json({
      ok : true,
      partidos : usuarioDB.prode
    });

  });

});


module.exports = app;
