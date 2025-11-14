<script set up>
</script>
<template>
<section class="section-slider">
    <div class="slider-container">
        <div>
            <h1 class="titulo">Bienvenidos a Fellings</h1>
            <p class="parrafo">Cuéntanos como te sientes hoy
            y nuestra música te acompañará</p>
        </div>
    </div>
</section>
</template>
<style scoped>
.section-slider{
    height: 100vh;
    background-image: url("/imagenes/fondo-emocion.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
.slider-container{
    width: 80%;
}
.titulo{
    font-size: 8em;
    font-family: "Inconsolata", monospace;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    color: #131017;
    margin-bottom: 1em;
    width: 70%;
}
.parrafo{
    font-size: 4em;
    font-family: "Signika", sans-serif;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    font-variation-settings:"GRAD" 0;
    color: #131017;
    margin-bottom: 1.5em;
    width: 70%;
}

/*___MEDIA QUERIES*/ 
@media (max-width: 700px) {
  .titulo{
    font-size: 6em;
  }
  .parrafo{
    font-size: 2.5em;
  }
}
@media (max-width: 480px) {
    .titulo{
    font-size: 4em;
  }
  .parrafo{
    font-size: 2em;
  }
}





</style>