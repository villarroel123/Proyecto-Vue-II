<script setup>
import { ref, reactive } from 'vue'
import { useanotacionesStore } from '../stores/anotaciones';
import { storeToRefs } from 'pinia';
import { usefrasesStore } from '../stores/frases';
import { usecancionesStore } from '../stores/canciones';

const anotacionesStore=useanotacionesStore();
const {anotaciones}=storeToRefs(anotacionesStore)
const{agregarAnotacion}=anotacionesStore

const fraseStore=usefrasesStore();
const { frasesFavoritas } = storeToRefs(fraseStore);
const { fraseFavorita } = fraseStore;

const cancionesStore=usecancionesStore();
const {cancionesFavoritas}=storeToRefs(cancionesStore);
const {cancionstore}=cancionesStore;

//---ESTILOS
const estilos={
        Enojo:{
            titulo:'titulo-rojo',
            color:'boton-enojo',
            borde:'borde-rojo'
        },
         Calma:{
            titulo:'titulo-naranja',
            color:'boton-calma',
            borde:'borde-naranja'
        },
         Tristeza:{
            titulo:'titulo-azul',
            color:'boton-tristeza',
            borde:'borde-azul'
        },
         Euforia:{
            titulo:'titulo-violeta',
            color:'boton-euforia',
            borde:'borde-violeta'
        },
         Felicidad:{ 
            titulo:'titulo-amarillo',
            color:'boton-felicidad',
            borde:'borde-amarillo'
        }
}
const emocionEstilo=(emocion)=>{
    return estilos[emocion];
}
//-----MODALL-------
const modal=ref(false)
const notaseleccionada=reactive({
  emocion:"",
  texto:""
})
const openModal=(emocion,texto)=>{
    modal.value=true;
    notaseleccionada.emocion=emocion;
    notaseleccionada.texto=texto
}
const closeModal=()=>{
  modal.value=false;
}

//para filtros

const filtroAnotaciones=ref(false);
const filtroCanciones=ref(false);
const filtroFrases=ref(false);

const opcion=(seleccion)=>{

if(seleccion==='anotaciones'){
    filtroAnotaciones.value=true;
    filtroCanciones.value=false;
    filtroFrases.value=false;
}else if(seleccion==='canciones'){
    filtroCanciones.value=true;
    filtroFrases.value=false;
    filtroAnotaciones.value=false;
}else{
    filtroFrases.value=true;
    filtroAnotaciones.value=false;
    filtroCanciones.value=false;
}
}
</script>
<template>

<div v-if="modal" @click.self="closeModal" class="modal-container flex align-justify">
  <div class="modal">
    <h4 class="titulo-cancion inconsolata">{{ notaseleccionada.emocion }}</h4>
    <p>{{ notaseleccionada.texto }}</p>
  </div>
</div>
<!--FIN MODAL-->
<section class="section-notas image flex align-justify">
    <div class="contenedor-notas">
        <h2 class="titulo inconsolata">Bitácora Personal</h2>
        <h3 class="subtitulo sifnika">Registro de emociones</h3>
        <div class="efecto container">
            <div class="contenedor-filtro flex">
                <ul class="flex libre">
                    <li class="item" @click="opcion('anotaciones')">Anotaciones</li>
                    <li class="item"@click="opcion('canciones')" >Canciones</li>
                    <li class="item"@click="opcion('frases')">Frases</li>
                </ul>
                <h4 class="nombre libre">hola</h4>
            </div>

            <div class="contenedor-registro" v-if="filtroAnotaciones">
                <article v-for="(anotacion,index) in anotaciones" :key="index" class="contenedor-datos flex efecto2 ">
                    <div class="contenedor-circulo">
                        <div class="circulo" :class="emocionEstilo(anotacion.emocion).color">
                            <!--icono-->
                        </div>
                    </div>
                    <div class="nota flex" :class="emocionEstilo(anotacion.emocion).borde">
                        <div class="datos flex" :class="emocionEstilo(anotacion.emocion).titulo">
                            <h4 class="libre">Registro emocional</h4>
                            <div class="dato-emocion flex">
                                <h5 class="dato-h5 sifnika">Siento</h5>
                                <h5 class="emocion sifnika">{{ anotacion.emocion }}</h5>
                            </div>
                        </div>
                        <div class="contenedor-boton flex" >
                            <div class="boton" :class="emocionEstilo(anotacion.emocion).color" @click="openModal(anotacion.emocion,anotacion.texto)">
                                <h3 class="leer libre">Leer</h3>
                            </div>
                        </div>
                    </div>      
                </article>
            </div>
             <div class="contenedor-registro" v-if="filtroFrases">
                <article v-for="(frases,index) in frasesFavoritas" :key="index" class="contenedor-frases flex align-justify efecto2 ">
                    <div class="contenedor-corazon flex">
                         <i class="fa-solid fa-heart"></i>
                    </div>
                    <div class="frase libre">
                        <p>"{{ frases }}"</p>
                    </div>
                </article>
            </div>
            <div class="contenedor-registro" v-if="filtroCanciones">
                <article v-for="(cancion,index) in cancionesFavoritas" :key="index" class="contenedor-canciones flex align-justify efecto2 ">
                   <div>
                        <img :src="cancion.imagen" :alt="cancion.nombre" class="imagen">
                   </div>
                   <div>
                        <h4>{{ cancion.nombre }}</h4>
                        <h5>{{ cancion.artista }}</h5>
                   </div>
                    
                </article>
            </div>
        </div>
            
    </div>
</section>


</template>

<style scoped>
.contenedor-canciones{
    padding: 4em;
}



.contenedor-frases{
    padding: 4em;
    border: 1px solid transparent;
    margin: 1.4em;
    border-radius: 2em;
    flex-direction: column;
}
.contenedor-corazon{
justify-content: flex-end;
width: 100%;
margin-bottom: 1em;
}
.contenedor-corazon i{
    font-size: 4em;
    color: var(--color-violeta);
}
.frase p{
    padding: 1em 0;
    font-size: 2.5em;
    border-top: 0.1em solid rgba(62, 3, 80, 0.7);
    color: var(--color-violeta);
}

.contenedor-filtro{
padding: 1.5em;
height: 4vh;
margin-bottom: 3em;
justify-content: space-between;
}
.item{
    font-size: 3em;
    color: var(--color-blanco);
    margin: 0 0.5em;
    cursor: pointer;
}
.item:hover{
    color:var(--color-violeta);
}
.nombre{
    font-size: 3em;
    color: var(--color-blanco);
    margin: 0 0.5em;
    font-weight: 100;
}



/*MODAL */
.modal-container{
  background-color: rgba(6, 6, 7, 0.8);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.modal{
  width: 40%;
   background-color: white;
  padding: 2em;
  border-radius: 1em;
  width: 40%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
}

/*Euforia */
.boton-euforia{
    background-color:var(--color-violeta);
}
.titulo-violeta{
color:var(--color-violeta);
}
.borde-violeta{
    border-top: 0.2em solid rgba(62, 3, 80, 0.7);
}
/*Felicidad */
.boton-felicidad{
    background-color:var(--color-amarillo);
}
.titulo-amarillo{
color:var(--color-amarillo);
}
.borde-amarillo{
    border-top: 0.2em solid rgba(80, 80, 3, 0.7);
}
/*Enojo */
.boton-enojo{
    background-color:var(--color-rojo);
}
.titulo-rojo{
color:var(--color-rojo);
}
.borde-rojo{
    border-top: 0.2em solid rgba(66, 12, 2, 0.7);
}
/*Calma*/
.boton-calma{
    background-color:var(--color-naranja);
}
.titulo-naranja{
color:var(--color-naranja);
}
.borde-naranja{
    border-top: 0.2em solid rgba(99, 66, 6, 0.7);
}
/*Tristeza*/
.boton-tristeza{
    background-color:var(--color-azul);
}
.titulo-azul{
color:var(--color-azul);
}
.borde-azul{
    border-top: 0.2em solid rgba(2, 13, 66, 0.7);
}
.section-notas{
    background-image: url("/imagenes/fondo-registro.jpg");
    height: 100%;
    min-height: 100vh;
    position: relative;
}
.contenedor-notas{
    width: 80%;
}
.container{
        margin-top: 3em;
        container-type: inline-size;
        border-radius: 3em;
        padding: 7em;
        margin-bottom: 4em;
}

.titulo{
    margin-top: 3.5em;
    text-align: center;
    font-size: 6em;
    color:var(--color-blanco);
}
.subtitulo{
    text-align: center;
    font-size: 3em;
    color:var(--titulo-negro);
}

.nota{
    width: 100%;
    height: 70%;
    padding: 1.5em;
    justify-content: space-between;
    
}
.contenedor-registro{
        
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
       
}
.efecto{
  background: linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0));
  backdrop-filter: blur(10em);
  -webkit-backdrop-filter: blur(20em);
  border: 0.01em solid rgba(255,255,255,0.2);
  box-shadow: 0 10em 10em 0 rgba(0,0,0,0.3);
}
.efecto2{
  background: linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0));
  backdrop-filter: blur(10em);
  -webkit-backdrop-filter: blur(20em);
  border: 0.01em solid rgba(255,255,255,0.4);
  box-shadow: 0 10em 10em 0 rgba(0,0,0,0.3);
}
.contenedor-datos{
    position: relative;
    height: 23vh;
    border: 1px solid transparent;
    margin: 1.4em;
    border-radius: 2em;
    align-items: flex-end;
}
.datos{
    flex-direction: column;
}
.datos h4{
    font-size: 3em;
    font-weight: 100;
    margin-top: 1em;
}

.dato-h5{
    font-size: 2.4em;
    font-weight: 200;
    margin-right: 0.3em;
}
.emocion{
    font-size: 2.4em;
    font-weight: 600; 
}
.contenedor-boton{
align-items: flex-end;
justify-content: center;

}
.boton{
    width: 100%;
    border-radius: 1em;
    padding: 0.5em 4em;
    text-align: center;
    cursor: pointer;
    z-index: 3;
}
.boton h3{
    font-size: 2.4em;
    font-weight: 100;
    color: var(--color-blanco);
}

.contenedor-circulo{
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 1em;
}
.circulo{
   width: 10em;
   height: 10em;
  border-radius: 50%; 
}
</style>