<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import Footer from '../components/Footer.vue';
import Notas from '../components/Notas.vue';
</script>
<template>
<body class="body">
    <div>
        <HeaderComponent></HeaderComponent>
        <Notas></Notas>
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