const express=require('express');
const routerMatematicas= express.Router();
//son dos puntos en la direccion porque no estan en la misma carpeta
const {matematicas}=require('../datos/cursos.js').infoCursos;

routerMatematicas.get('/', (req, res)=>{
    res.send(JSON.stringify(matematicas));
  });
  // parametros de URL para hacer mas eficiciente la busqueda 
  // ojo!!! lenguaje hace referencia a la propiedad del objeto infocursos/ programacion: lenguaje
  // a continucion meteremos paraetros query 
module.exports = routerMatematicas;



