<script setup>
import { ref, reactive } from 'vue'
import { usecancionesStore } from '../stores/canciones';
import { useanotacionesStore } from '../stores/anotaciones';


const cancionesStore=usecancionesStore();
const anotacionesStore=useanotacionesStore();

const cambiofondo=ref()//vuelv reactiva la variable
const opcionseleccionada=ref()
const colorcirculo= ref('')
const emocionactual=ref()

const emocionusuario=(emocion)=>{
emocionactual.value=emocion;
cancionesStore.ObtenerCancionPorEmocion(emocion)
cambiofondo.value=emocion;
opcionseleccionada.value=true;

cancionesStore.registroEmocion(emocion)//--para el grafico

//para los colores del circulo/titulo de cada emocion, evaluo la emocion que se ingresa y en base a eso le agrego un valor a la variable reactiva, el valor de una clase
if(emocion==='Felicidad'){
colorcirculo.value='circuloamarillo';
}else if(emocion==='Tristeza'){
  colorcirculo.value='circuloazul';
}else if(emocion==='Calma'){
  colorcirculo.value='circulonaranja'
}else if(emocion==='Enojo'){
  colorcirculo.value='circulorojo'
}else{
  colorcirculo.value='circulovioleta'
}
}
//--------PARA CANCIONES FAVORITAS--------//
const guardoFav=(cancion)=>{
  //ingreso datos de la cancion seleccionada
  const cancionFav=reactive({
    nombre:cancion.name,
    artista:cancion.artist,
    imagen:cancion.image 
})
//guardo en el store
  cancionesStore.cancionFavorita(cancionFav);
}

//.-------------MODALL--------------//
const modal=ref(false)
const cancionseleccionada=reactive({
  name:"",
  artist:"",
  youtube:""

})
const abreModal=(cancion)=>{
    modal.value=true;
    cancionseleccionada.name=cancion.name;
    cancionseleccionada.artist=cancion.artist;
    cancionseleccionada.youtube=cancion.youtube;
}
const cierraModal=()=>{
  modal.value=false;
}
//------video de youtube-------
const getEmbedUrl = (url) => {
  let videoId = '';
    if (url.includes('youtu.be/')) {
        const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            videoId = match[1];
        }
    } 
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
}
}

//--------PARA CIRCULOS------
const hover1=ref()
const hover2=ref()
const hover3=ref()
const hover4=ref()
const hover5=ref()



</script>
<template>
      <!--MODAL------>
<div v-if="modal" @click.self="cierraModal" class="modal-container flex align-justify">
  <div class="modal">
    <h4 class="titulo-cancion inconsolata">{{ cancionseleccionada.name }}</h4>
    <h5 class="artista-cancion inconsolata">{{ cancionseleccionada.artist }}</h5>
    <iframe class="video" :src="getEmbedUrl(cancionseleccionada.youtube)" frameborder="0"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>
<!--FIN MODAL-->

<section class="section-botones flex align-justify" id="section-boton" >
  <div class="botones-container">
    <h3 class="pregunta inconsolata">¿Qué emoción sentis?</h3>
    <p class="parrafo sifnika">Selecciona la opción con la que más te identifiques en este momento y abajo se desplegará una lista de recomendaciones de canciones.</p>
  </div>
  <div class="botones flex align-justify">
      <div class="section-circulos flex align-justify">
              <div class="mini-circulo flex align-justify circulo-alegria" :class="{'hover-amarillo':hover1, 'icono-amarillo':hover1}">
                <div class="overlay-container-cir" >
                    <div class="overlay-circulo flex align-justify">
                      <img src="/imagenes/carita-feliz.svg">
                    </div>
                </div>    
                </div>
                <div class="mini-circulo flex align-justify circulo-enojo " :class="{'hover-rojo':hover3, 'icono-rojo':hover3}">
                    <div class="overlay-container-cir">
                        <div class="overlay-circulo flex align-justify">
                            <img src="/imagenes/carita-enojada.svg">
                        </div>
                    </div>
                </div>
                <div class="mini-circulo flex align-justify circulo-euforia" :class="{'hover-morado':hover5, 'icono-morado':hover5}">
                    <div class="overlay-container-cir">
                      <div class="overlay-circulo flex align-justify">
                          <img src="/imagenes/carita-euforia.svg">
                      </div>
                    </div>
                </div>
                <div class="mini-circulo flex align-justify circulo-tristeza" :class="{'hover-azul':hover2, 'icono-azul':hover2}">
                    <div class="overlay-container-cir">
                        <div class="overlay-circulo flex align-justify">
                            <img src="/imagenes/carita-triste.svg">
                        </div>
                    </div>
                </div>
                <div class="mini-circulo flex align-justify circulo-calma" :class="{'hover-rosa':hover4, 'icono-rosa':hover4}">
                    <div class="overlay-container-cir">
                        <div class="overlay-circulo flex align-justify">
                            <img src="/imagenes/carita-calma.svg">
                        </div>
                    </div>
                </div>
      </div>
      <button @click="emocionusuario('Felicidad')" @mouseenter="hover1 = true"
      @mouseleave="hover1 = false" class="button sifnika feliz"> Felicidad</button>
      <button @click="emocionusuario('Tristeza')" @mouseenter="hover2 = true"
      @mouseleave="hover2 = false"class="button sifnika triste"> Tristeza</button>
      <button @click="emocionusuario('Enojo')" @mouseenter="hover3 = true"
      @mouseleave="hover3 = false"class="button sifnika enojado"> Enojo</button>
      <button @click="emocionusuario('Calma')" @mouseenter="hover4 = true"
      @mouseleave="hover4 = false"class="button  sifnika calmado"> Calma</button>
      <button @click="emocionusuario('Euforia')" @mouseenter="hover5 = true"
      @mouseleave="hover5 = false"class="button sifnika euforico"> Euforia</button>
  </div>
</section>


<section class="galeria-canciones flex align-justify" :class="cambiofondo" v-if="opcionseleccionada">
  
    <div :class="['circulo', 'circulos', colorcirculo]"></div>
    <div :class="['circulo2', 'circulos', colorcirculo]"></div>
    <div :class="['circulo3', 'circulos', colorcirculo]"></div>
    <div :class="['circulo4', 'circulos', colorcirculo]"></div>
    <div :class="['circulo5', 'circulos', colorcirculo]"></div>
    <div :class="['circulo6', 'circulos', colorcirculo]"></div>
  <div class="container-galeria">
    <h3 class="titulo-emocion inconsolata" >{{ cambiofondo }}</h3>
    <p class="opcion sifnika" >Emoción seleccionada</p>
    
    <div class="container-canciones ">
        <div v-for="cancion in cancionesStore.canciones" :key="cancion.name" class="cancion efecto overlay-container">
              <div class="overlay">
              </div>
              <img :src="cancion.image" :alt="cancion.name" class="imagen">
              <div class="datos libre">
                <div class="flex dato-titulo">
                  <h4 class="datos-h4">{{ cancion.name }}</h4>
                  <i class="fa-solid fa-heart " @click="guardoFav(cancion)"></i>
                </div>
                <h5>{{ cancion.artist }}</h5>
                <div class=" boton-escuchar" :class="cambiofondo">
                  <h4 class="escuchar libre" @click="abreModal(cancion)">Escuchar</h4>
                </div>
              </div>
        </div>
    <!--</div>-->
    </div>
  </div>
</section>



</template>
<style scoped>
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
}
.titulo-cancion{
   font-size: 4em;
    margin-bottom: 0.2em;
    color: var(--color-blanco);
    
}
.artista-cancion{
  font-size: 3em;
  font-weight: 100;
  margin-bottom: 1em;
  color: var(--color-blanco);
  
}
.video{
  width: 100%;
  height:47em;
  
}
/*----cambio de fondo segun emocion*/
.Felicidad{
  background:var(--color-alegria);
  color: var(--titulo-amarillo);
  border: var(--borde-amarillo);
  transition: 2s;
}
.Tristeza{
  background:var(--color-tristeza);
  color:var(--titulo-azul);
  border: var(--borde-azul);
  transition: 2s;
 
}
.Enojo{
  background:var(--color-enojo);
  color:var(--titulo-rojo);
  border: var(--borde-rojo);
  transition: 2s;

}
.Calma{
  background:var(--color-calma);
  transition: 2s;
  color:var(--titulo-naranja);
  border: var(--borde-naranja);
}
.Euforia{
  background:var(--color-euforia);
  transition: 2s;
  color:var(--titulo-violeta);
  border: var(--borde-violeta);
}

/*--------contenido-------*/
.circulos{
  width: 100em;     
  height: 100em;
  border-radius: 50%; 
  position: absolute; 
}
.circulo {
  top: -10em;
  left: -20em;
}
.circulo2 {
  top: 30em;
  right: -8em;
}
.circulo3 {
  bottom: 120em;
  left: 20em;
}
.circulo4 {
  bottom: -16em;
  right: -20em;
}
.circulo6{
  bottom: 20em;
  left: -20em;
}
.circulo5 {
  top: 80em;
  right: 20em;
  
  
}
.circuloamarillo {
    background: var(--circulo-amarillo);
    animation:
    animacion 12s infinite alternate ease-in-out, 
    animacion 12s infinite alternate ease-in-out;

}
.circuloazul {
  background: var(--circulo-azul);
  animation:
    animacion 12s infinite alternate ease-in-out, 
    animacion 12s infinite alternate ease-in-out;
}
.circulonaranja {
  background: var(--circulo-naranja);
   animation:
    animacion 12s infinite alternate ease-in-out, 
    animacion 12s infinite alternate ease-in-out;
}
.circulorojo {
  background: var(--circulo-rojo);
   animation:
    animacion 12s infinite alternate ease-in-out, 
    animacion 12s infinite alternate ease-in-out;
}
.circulovioleta{
  background: var(--circulo-violeta);
   animation:
    animacion 12s infinite alternate ease-in-out, 
    animacion 12s infinite alternate ease-in-out;
}
.galeria-canciones{
  width: 100%;
  border: none;
  position: relative;
  padding-bottom: 6em;
  overflow: hidden;
}
.container-galeria{
  width: 70%;
}

@keyframes animacion{
  0% {
    transform: scale(1); /*tamaño inicial*/
  }
  100% {
    transform: scale(1.7); 
  }}
/*contenedor de cards */
.container-canciones{
  min-width: 18em;
    container-type: inline-size;
    border-radius: 3em;
    padding: 7em;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}
.efecto{
  background: linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0));
  backdrop-filter: blur(10em);
  -webkit-backdrop-filter: blur(20em);
  border: 0.4em solid rgba(255,255,255,0.8);
  box-shadow: 0 10em 10em 0 rgba(0,0,0,0.3);
}
.cancion{
  z-index: 10;
  border: 1px solid transparent;
  margin: 1.4em;
  padding:2em;
  border-radius: 1em;
  overflow: hidden;
  @container (min-width: 20rem) {
    .imagen{
      height: 50vh;
    }
  }
}
.imagen{
    transition: 6s;
    margin-bottom:1em;
    border-radius: 1em;
    overflow:hidden;
}
.cancion:hover{
  transform: scale(1.03);
  transition: 1s;
}
.dato-titulo{
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2em;
}
.dato-titulo i{
  font-size: 3em;
  cursor: pointer;
}
.datos-h4{
  font-size: 3em;
  font-weight:600;
}
.datos h5{
  padding-bottom: 0.5em;
  font-size: 2.5em;
  font-weight:400;
}

.titulo-emocion{
    text-align:center;
    font-size: 6em;
    font-weight: bold;
    margin-top: 3em;
    position: relative;
    z-index: 3;
}
.opcion{
  font-size: 2.5em;
  text-align:center;
  font-weight: lighter;
  font-variation-settings:"GRAD" 0;
  margin-bottom: 1.5em;
  position: relative;
  z-index: 4;
}


.overlay-container{
  position: relative;
}
/*.overlay{
  position: absolute;
  top:0;
  left:0;
  background-color:rgba(6, 6, 7, 0.8);
  transition: 0.6s ease;
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Signika", sans-serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
  font-variation-settings:"GRAD" 0;
  color: #FFF5FC;
}*/
.boton-escuchar{
  padding: 0.5em;
  font-size: 2.3em;
  border-radius: 0.5em;
  text-align: center;
}
.escuchar{
font-weight:100;
}
.escuchar:hover{
  color: #131017;
  transition: 0.6s ease;
  cursor: pointer;
}
.overlay-container:hover .overlay{
    opacity:1;
  }
/*---------SECTION BOTONES ----------*/
.section-botones{
  background-image: url("/imagenes/fondo.jpg");
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
}
.botones-container{
width: 80%;/*su ancho para margen*/
}
.pregunta{
    color:var(--titulo-blanco);
    font-size: 5em;
    font-weight: 2;
    font-style: normal;
    padding-bottom: 0.5em;
}
.parrafo{
  color:var(--titulo-blanco);
  font-size: 3em;
  font-weight: lighter;
  font-variation-settings:"GRAD" 0;
  width: 60%;
}
/*--------botones-------*/
/*contenedor bootnoes*/
.botones{ 
  position: relative;
  width: 80%;
  min-width: 170em;
  height: 65vh;
}
.button{
  padding: 0.9em 3em;
  font-size: 2.8em;
  cursor: pointer;
  border: none;
  border-radius: 50em; 
  font-variation-settings:"GRAD" 0;
  position: absolute;
  z-index: 5;
  
}

/*estilos botones*/
.feliz{
  color:var(--titulo-amarillo);
  background-color: var(--color-alegria);
  left: 11em;
  top: 5em;
}
.feliz:hover {
  background-color: #FBD261;
  color: #131017;
  box-shadow: 0 0 3em #F9D675;
}
.triste{
  background-color:var(--color-tristeza);
  color:var(--titulo-azul);
  left: 10em;
  top: 17em;
}
.triste:hover {
  color:#131017;
  background-color: #3067CD;
  box-shadow: 0 0 3em #062a6d ;
}
.enojado{
  background-color: var(--color-enojo);
  color:var(--titulo-rojo);
  bottom: 9em;
  right: 9em;
}
.enojado:hover {
  background-color: #D05959;
  color:#131017;
  box-shadow: 0 0 3em #992020 ;
}
.calmado{
  background-color: var(--color-calma);
  color:var(--titulo-naranja);
  bottom: 1em;
  right: 16em;
}
.calmado:hover {
  background-color: #FEAF92;
  color:#131017;
  box-shadow: 0 0 3em #d15224;
}
.euforico{
  background-color: var(--color-euforia);
  color:var(--titulo-violeta);
  right: 12em;
  top: 3em;
 
}
.euforico:hover{
  background-color: #9B75E6;
  color:#131017;
  box-shadow: 0 0 3em #6d32e3;
}

/*CIRCULOS------ */
.section-circulos{
    width: 30em;
    height: 30em;
    background-color: #120c1b; 
    border-radius: 50%;
    z-index: 1; /* Fondo debajo de los mini-círculos */
    transition: transform 0.8s ease-out; /* Para el efecto de giro */
    position: relative;
}
.mini-circulo{
    position: absolute; 
    width: 2.9em; 
    height: 2.9em;
    border-radius: 50%;
    z-index: 7; 
    font-size: 2.5rem; 
    transition: all 0.5s ease-out;
}
/*cuando hay hover */

.overlay-container-cir{
  border-radius: 50%;
  position: relative;
  width: 100%;
  height: 100%;
}
.overlay-circulo{
  border-radius: 50%;
  position: absolute;
  top:0;
  left:0;
  transition: 0.6s ease;
  opacity: 0;
  width: 100%;
  height: 100%;
}

.icono-amarillo .overlay-circulo{
    background-color:var(--color-amarillo);
    opacity:1;
  }
.hover-amarillo{
transform: scale(1.3);
}
.icono-azul .overlay-circulo{
    background-color:var(--color-azul);
    opacity:1;
  }
.hover-azul{
transform: scale(1.3);
}
.icono-morado .overlay-circulo{
    opacity:1;
  }
.hover-morado{
transform: scale(1.3);
}
.icono-rosa .overlay-circulo{
    opacity:1;
  }
.hover-rosa{
transform: scale(1.3);
}
.icono-rojo .overlay-circulo{
    opacity:1;
  }
.hover-rojo{
transform: scale(1.3);
}







/*estilos y posisciones de los mini circulos*/
.circulo-alegria{
  background-color: var(--color-alegria);
  top: -2em;
  left: -1em;
}
.circulo-tristeza{
  background-color: var(--color-tristeza);
  top:1.8em;
  left: -2.5em;
}
.circulo-calma{
  background-color: var(--color-calma);
  bottom: -2.5em;
  
}
.circulo-enojo{
  background-color: var(--color-enojo);
  right: -2.5em;
  top: 1.8em;
}
.circulo-euforia{
  background-color: var(--color-euforia);
  top: -1.8em;
  right: -1.3em;
}


@media (max-width: 800px) {
  .parrafo{
  font-size: 2.8em;
  width: 100%;
 }
 .section-circulos{
  height: 20em;
  width: 20em;
 }
 .mini-circulo{
  height: 2.3em;
  width: 2.3em;
}
.circulo-alegria{
  top: -1.5em;
  left: -1.1em;
}
.circulo-tristeza{
  top:1.1em;
  left: -1.9em;
}
.circulo-calma{
  bottom: -1.9em;
}
.circulo-enojo{
  right: -1.9em;
  top: 1.1em;
}
.circulo-euforia{
  top: -1.5em;
  right: -1.1em;
}
.hover-amarillo{
transform: scale(1.1);
}
.hover-azul{
transform: scale(1.1);
}
.hover-morado{
transform: scale(1.1);
}
.hover-rosa{
transform: scale(1.1);
}
.hover-rojo{
transform: scale(1.1);
}
.botones{ 
  width: 80%;
  min-width: 156em;
 
}
.triste{
  left: 11em;
  top: 16em;
}
.enojado{
  right: 10em;
}

}

@media (max-width: 700px) {
 .pregunta{
  margin-top: 1em;
  font-size: 3.8em;
 }
 .parrafo{
  font-size: 2.5em;
  width: 100%;
 }

 .botones{ 
  position: static;
  width: 80%;
  min-width: 170em;
  height: 65vh;
  flex-direction: column;
}
.button{
  padding: 0.8em 3em;
  font-size: 2.8em;
  position: static;
  margin: 0.3em;
}
.section-circulos{
  display: none;
}
}
@media (max-width: 480px) {
 .parrafo{
  font-size: 2.2em;
  width: 100%;
 }
}



</style>