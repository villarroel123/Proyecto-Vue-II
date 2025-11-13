<script setup>

import Footer from '../components/Footer.vue';
import Frases from '../components/Frases.vue';
import Anotacion from '../components/Anotacion.vue';
import GaleriaCanciones from '../components/GaleriaCanciones.vue'
import HeaderComponent from '../components/HeaderComponent.vue';
import SliderComponent from '../components/SliderComponent.vue';
import GraficoChart from '../components/GraficoChart.vue';
</script>

<template>
  <body class="body">
    <div>
        <HeaderComponent></HeaderComponent>
        <SliderComponent></SliderComponent>
        <GaleriaCanciones />
        <Frases></Frases>
        <Anotacion></Anotacion>
        <GraficoChart></GraficoChart>
        <Footer></Footer>
    </div>
  </body>
  
 
</template>
<style scoped>
.body{
  display: flex;
  align-items: center;
  justify-content: center;
}
.body div{
  width: 100%;
}
</style>