<script setup>
import { usefrasesStore } from '../stores/frases';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const fraseStore=usefrasesStore();

const { frases } = storeToRefs(fraseStore);
const { obtenerFrase } = fraseStore;

onMounted(() => {
    obtenerFrase();
});

//guardo en la store
const agregarFav=()=>{
    fraseStore.fraseFavorita(frases.value)
}


</script>
<template>

<section class="section-frases flex align-justify image">
    <article class="container-frases flex align-justify ">
        <div class="detalles"><!--con position rela-->
            <div class="nube1 image"></div>
            <div class="nube2 image"></div>
            <div class="nube3 image"></div>
        </div>
        <div class="frases flex image">
            <h3 class="titulo inconsolata">Frase del dia</h3>
            <p class="parrafo libre">"{{ frases }}"</p>
            <div class="boton-container flex">
                <div class="boton flex align-justify"><!--flechas-->
                    <i class="fa-solid fa-heart" @click="agregarFav()"></i>
                    
                </div>
            </div>
        </div>
    </article>
</section>
</template>
<style scoped>
.section-frases{
    height: 60vh;
    background-image: url("/imagenes/fondo-frases.jpg");
}
.container-frases{
    background-color: var(--color-violetaoscuro);
    width: 50%;
    min-width: 100em;
    min-height: 30vh;
    border-radius: 4em;
    
}
.detalles{
    min-height: 30vh; 
    position: relative;
    width: 35%;
    margin: 3em;
    height: 100%;
    min-width: 35em;
    
}
.frases{
    background-color: var(--color-blanco);
    background-image: url("/imagenes/frases.jpg");
    padding: 4em;
    flex-direction: column;
    border-radius: 4em;
    margin: 4em;
}
.titulo{
    margin-top: 0.2em;
    font-size: 4em;
    margin-bottom: 0.4em;
}
.parrafo{
    font-size: 2.5em;
}
.boton{
    height: 5vh;
    border-radius: 3em;
   
}
.boton i{
    margin:0.5em;
    font-size:2.5em;
    color:#AA8BE9;
    cursor: pointer;
}
.boton i:hover{
    color: var(--color-violetaoscuro);
}
.boton-container{
    margin-top: 4em;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
}
.nube1{
    position: absolute;
    background-image: url("/imagenes/nube1.svg");
    
    top: -7em;
    z-index: 10;
    right: 0;
    height: 18em;
    width: 39em;
}
.nube2{
    position: absolute;
    background-image: url("/imagenes/nube2.svg");
    z-index: 10;
    height: 18em;
    width: 30em;
    bottom: -5em;
    left: -18em;
  
}
.nube3{
    position: absolute;
    background-image: url("/imagenes/nube3.svg");
    z-index: 10;
    min-height: 15em;
    min-width: 30em;
    bottom: 0;
    left: 7em;
    
}

@media (max-width: 800px) {
 .container-frases{
    width: 90%;
    min-width: 80em;
    min-height: 30vh;
    
}
.detalles{
    width: 35%;
    margin: 3em;
    height: 100%;
    min-width: 25em;
    
}
.nube1{
    top: -7em;
    z-index: 10;
    right: 0;
    height: 14em;
    width: 30em;
}
.nube2{
    height: 14em;
    width: 24em;
    bottom: -5em;
    left: -8em;
  
}
.nube3{
    min-height: 12em;
    min-width: 24em;
    bottom: 0;
    left: 7em;
    
}
.titulo{
    margin-top: 0.2em;
    font-size: 3.5em;
    margin-bottom: 0.4em;
}
.parrafo{
    font-size: 2em;
}
}
@media (max-width: 700px) {
.nube1{
    top: -3em;
    z-index: 10;
    right: 0;
    height: 12em;
    width: 26em;
}
.nube2{
    height: 12em;
    width: 20em;
    bottom: -5em;
    left: -5em;
  
}
.nube3{
    min-height: 10em;
    min-width: 20em;
    bottom: 2em;
    left: 7em;
    
}
.container-frases{
    width: 90%;
    min-width: 60em;
    min-height: 30vh;
    
}
.detalles{
    width: 35%;
    margin: 3em;
    height: 100%;
    min-width: 22em;
    
}
}


@media (max-width: 480px) {
.detalles{
    display: none;
    
}
.container-frases{
    width: 90%;
    min-width: 30em;
    min-height: 30vh;
    
}
}

</style>