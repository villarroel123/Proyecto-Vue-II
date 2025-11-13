<script setup>


</script>
<template>
<footer class="footer">
    <div class="footer-container">
        <div class="datos">
            <a class="nombre">Fellings </a> 
            <p>Feelings es una app interactiva que conecta la música con tus emociones.</p>
        </div>
        <div class="navegador">
            <ul class="lista">
            <li class="item">
                <router-link class="link" :to="{name:'home'}">Home</router-link><!--carga la pagina home-->
            </li>
            <li class="item">
                <router-link class="link" :to="{name:'grafico'}">Grafico</router-link><!--carga la pagina home-->
            </li>
            <li class="item">
                <router-link class="link" :to="{name:'musica'}">Música</router-link><!--carga la pagina home-->
            </li>
        </ul>
        </div>
    </div>
    <div class="texto-final">
        <p>© 2025 Feelings — Music for every emotion.</p>
    </div>

</footer>

</template>
<style scoped>
.footer{
background-color: #131017;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
}
.footer-container{
    margin-top: 3em;
    width: 80%;
    display: flex;
    justify-content: space-between;
}
.nombre{
      color: #804ECE;
    font-family: "Inconsolata", monospace;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    font-size: 3em;
    transition: 1.5s;
    
}
.footer-container p{
    margin-top: 1.2em;
    font-family: "Signika", sans-serif;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    font-variation-settings:"GRAD" 0;
    font-size: 1.8em;
    color: #6e667c;
    width: 30%;
}

.navegador{
    padding: 0;
    display: flex;
    align-items: flex-start;
    
    

}
.lista{
    padding: 0 1em;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;

    
    
} .item{
    margin: 0 0.5em;
    font-family: "Signika", sans-serif;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    font-variation-settings:"GRAD" 0;
    color: #6e667c;
    font-size: 2.5em;
}
.link{
    position: relative;
    transition: 0.7s;
}
.item:hover{
    color: #804ECE;
}
.texto-final{
    border-top: 1px solid #6e667c;
    margin-top: 5em;
    width: 80%;
    display: flex;
    justify-content: flex-end;
    font-family: "Signika", sans-serif;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    font-variation-settings:"GRAD" 0;
    font-size: 1.5em;
    color: #6e667c;
    margin-bottom: 1em;
}
.texto-final p{
    margin-top: 1.6em;
}



/*media queries*/
@media (max-width: 700px) {

}

@media (max-width: 480px) {
.footer-container p{
    width: 50%;
}
}




</style>