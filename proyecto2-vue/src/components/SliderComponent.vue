<script set up>

</script>
<template>
<section class="section-slider">
    <div class="slider-container">
        <div>
            <h1 class="titulo">Bienvenidos a Fellings</h1>
            <p class="parrafo">Cuéntanos como te sientes hoy
            y nuestra música te acompañará</p>
            <div class="comenzar">
                <h3>Comenzar</h3>
            </div>
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
.comenzar{
    height: 7em;
    width: 25em;
    background-color: #804ECE;
    border-radius: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer ;
    
}
.comenzar:hover{
    background-color: #6b32c9;
    transform: scale(1.1);
    transition: all 1s;
    
}
.comenzar h3{
    font-size: 3em;
    font-family: "Signika", sans-serif;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    font-variation-settings:"GRAD" 0;
    color: #FFF5FC;
    padding: 1em;
    font-weight: 200;
}

/*___MEDIA QUERIES*/ 
@media (max-width: 700px) {
  .titulo{
    font-size: 6em;
  }
  .parrafo{
    font-size: 2.5em;
  }
  .comenzar{
    width: 25em;
    height: 6em;
  }
  .comenzar h3{
    font-size: 2em;
  }
}
@media (max-width: 480px) {
    .titulo{
    font-size: 4em;
  }
  .parrafo{
    font-size: 2em;
  }
  .comenzar{
    width: 35%;
    height: 4em;
  }
  .comenzar h3{
    font-size: 1.6em;
  }
}





</style>