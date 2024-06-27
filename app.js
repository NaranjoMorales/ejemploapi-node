
const express=require('express');
const app=express();

//usar sintaxis de desestructuralizacion
const {infoCursos} = require('./datos/cursos.js');
// creacion routermatematicas
const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);
// creacion router programacion
const routerProgramacion = require('./routers/programacion.js');
// ahora se va a usar el metodo.use para usar una ruta especifica asociar un router especifico creado
app.use('/api/cursos/programacion', routerProgramacion);


// crear ruta solo para pedir los cursos de programacion, y uso del router, en ligra de app citamos el router 
// se reeemplaza la ruta '/api/cursos/programacion' por una barra inclunada '/' asi:

 // routing
 app.get('/', (req, res)=>{
    res.send('mi primer servidor con express fuck you ');
 });
 // crear otra ruta para probar esto
 app.get('/api/cursos', (req, res)=>{
  res.send(JSON.stringify(infoCursos));
 });



// filtrar por lenguaje de programacion y nivel del curso buscara el lenguaje que se especificque en el navegador  y el nivel que se especifique

app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res)=>{
  const lenguaje= req.params.lenguaje;
  const nivel= req.params.nivel;
  const resultados=infoCursos.programacion.filter(curso=> curso.lenguaje === lenguaje && curso.nivel=== nivel);
  if(resultados.length=== 0){
    return res.status(404).send(`no se encontraron cursos de ${lenguaje}ni ${nivel}`);
  }
  res.send(JSON.stringify(resultados));
});
//crear la escucha y activacion del servidor, esto no cambia 

 const puerto = process.env.PORT|| 8000;

app.listen(puerto, () => {
  console.log(`El servidor está escuchando en el puerto ${puerto}`);
});