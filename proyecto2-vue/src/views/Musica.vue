<script setup>

import formulario from '../components/formulario.vue';
import Footer from '../components/Footer.vue';
import HeaderComponent from '../components/HeaderComponent.vue';


</script>
<template>
    <body class="body">
    <div>
        <HeaderComponent></HeaderComponent>
        <formulario></formulario>
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