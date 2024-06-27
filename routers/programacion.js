const express=require('express');
const routerProgramacion= express.Router();
const {programacion}=require('../datos/cursos.js').infoCursos;

// OJO!!!!  este es importante para procesar el cuerpo de la solicitud en formato JSON
// esto es un middleware, se ejecuta despues de recibir una solicitud y antes de dar una respuesta 
// tiene acceso al objeto de una solicitud al objeto de la respuesta y a next(); funcion que se necesita para ejecutar el siguiente middleware
routerProgramacion.use(express.json());

routerProgramacion.get('/',(req, res)=>{
    res.send(JSON.stringify(programacion));
  });
  // la siguiente es la puesta en marcha del router que tiene como camino base hasta /programacion y tiene mas elementos del path
  
routerProgramacion.get('/:lenguaje', (req, res)=>{
    const lenguaje= req.params.lenguaje;
    const resultados=programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultados.length=== 0){
      return res.status(404).send(`no se encontraron cursos de ${lenguaje}`);
    };
   // parametros query la siguiente es solo para ver si se incluyeron parametros query, aun no hay funcionalidad aparentemente 
     console.log(req.query.ordenar);
    if(req.query.ordenar === 'vistas'){
      // agregar metodo .sort que sirve para ordenar, el criterio es el numero de vistas, vistas es un atributo del objeto cursos de programacion
      // ver base de datos simulada. si se cambia de a.vistas- b. vistas, a b.vistas cambia el orden por la cantidad de vistas queda asi: 
        return   res.send(JSON.stringify(resultados.sort((a,b)=> b.vistas - a.vistas)));
    }
      res.send(JSON.stringify(resultados));
  });
  // si no fueran router sino directamnete en el archivo proncipal, la mandamo directo a app
routerProgramacion.post('/', (req, res)=>{
   // extraer el cuerpo de la solicitud
   let cursoNuevo= req.body;
   programacion.push(cursoNuevo);
   res.send(JSON.stringify(programacion));
});
// para crear o actualizar la info usando el put, debe darse todos los atributos
routerProgramacion.put('/:id', (req, res)=>{
   const cursoActualizado= req.body;
   const id= req.params.id;
    const indice= programacion.findIndex(curso => curso.id == id);
    if (indice >= 0){
         programacion[indice]= cursoActualizado;
    }
    res.send(JSON.stringify(programacion));
});
// el siguiente metodo permite reemplazar como put, pero, este si acepta pares clave- valor especificos y no todo el objeto como put 
routerProgramacion.patch('/:id', (req, res)=>{
   const infoActualizada= req.body;
   const id= req.params.id;
   const indice= programacion.findIndex(curso=> curso.id== id);
   if(indice >=0){
      const cursoAModificar = programacion[indice];
      Object.assign(cursoAModificar, infoActualizada);
   }
   res.send(JSON.stringify(programacion));
});

routerProgramacion.delete('/:id', (req, res)=>{
   const id= req.params.id;
   const indice=programacion.findIndex(curso=> curso.id== id);
   if(indice >=0){
      programacion.splice(indice, 1);
   }
   res.send(JSON.stringify(programacion));

 });

module.exports = routerProgramacion;  // Exporté directamente routerProgramacion
// tarea, averiguar sobre codigos de estado 
// si quiero enviar una respuesta res en formato json uso  el metodo res.json