<script setup>
import Home from '../views/Home.vue';
//import AddMovie from '../views/AddMovie.vue';
import {  RouterLink } from 'vue-router';
import{ref,onMounted,onUnmounted} from 'vue';
//para que al scrollear cambie el color y tenga posicion fija
const isScrolled=ref(false)
const detectoScroll=()=>{
    isScrolled.value=window.scrollY>100;
}
onMounted(() => {
  window.addEventListener('scroll', detectoScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', detectoScroll)
})
</script>
<template>

<header class="header flex align-justify" :class="{'scrolled':isScrolled}"  >
    <div class="header-container flex align-justify">
         <a class="nombre">Fellings </a>      
        <nav class="navegador">
            <ul class="lista">
                <li class="item">
                    <router-link class="link" :to="{name:'home'}">Home</router-link><!--carga la pagina home-->
                </li>
                <li class="item">
                    <router-link class="link" :to="{name:'musica'}">Música</router-link><!--carga la pagina home-->
                </li>
                <li class="item">
                    <router-link class="link" :to="{name:'bitacora'}">Bitacora</router-link>
                </li>
            </ul>
        </nav>
    </div>
</header>
</template>
<style scoped>
.header{
    width: 100%;
    background-color: #FFF5FC;
    height: 12vh;
    position: fixed;
    transition: 0.7s;
    z-index: 1000;
}
.header-container{
    width: 80%;
    justify-content: space-between;
}
.navegador{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.lista{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
} .item{
    padding: 0.5em;
    font-family: "Signika", sans-serif;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    font-variation-settings:"GRAD" 0;
    color: #131017;
    font-size: 3.2em;
}
.link{
    position: relative;
    transition: 0.7s;
}
.item:hover{
    color: #804ECE;
}
.nombre{
    color: #804ECE;
    font-family: "Inconsolata", monospace;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    font-size: 3.5em;
    transition: 1.5s;
}
.scrolled{
    background-color: #131017;
}
.scrolled li{
    color: rgb(196, 196, 196);
}
.scrolled li :hover{
    color: #804ECE;
}
.scrolled a{
    color: rgb(196, 196, 196);
}
/*___MEDIA QUERIES*/ 
@media (max-width: 700px) {
  .nombre{
    font-size: 2.5em;
  }
  .item{
    font-size: 2.3em;
  }
}
@media (max-width: 480px) {
    .nombre{
    font-size: 2.3em;
  }
  .item{
    font-size: 2em;
  }
}
</style>