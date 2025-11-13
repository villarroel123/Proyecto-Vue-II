<script setup>
import { useanotacionesStore } from '../stores/anotaciones';
import {useForm} from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { ref, computed} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); 

const anotacionStore=useanotacionesStore();

const fondo=[
    {
        src:'/imagenes/registro-rojo.jpg',
        emocion: "Enojo"//el titulo que va a cambiar
    
    },
    {
        src:'/imagenes/registro-azul.jpg',
        emocion: "Tristeza"//el titulo que va a cambiar
    },
    {
        src:'/imagenes/registro-amarillo.jpg',
        emocion: "Felicidad"//el titulo que va a cambiar
    },
    {
        
        src:'/imagenes/registro-violeta.jpg',
        emocion: "Euforia"//el titulo que va a cambiar
    },
    {
        src:'/imagenes/registro-naranja.jpg',
        emocion: "Calma"//el titulo que va a cambiar
    }
];

//------------------FORMULARIO------------------------//
const validationSchema=toTypedSchema(
    yup.object({
        emocion:yup.string().required('Debe seleccionar una emoción'),
        texto:yup.string().required('Debe escribir algo'),
    })
)
const initialEmotion = fondo[0].emocion;//la que esta en la primera posicion

const { errors, handleSubmit, defineField,resetForm } = useForm({
    validationSchema: validationSchema,
    initialValues: {
    emocion: initialEmotion, 
    texto: ''
 }
});
const [emocionField, emocionAttrs]=defineField('emocion',{
    validateOnModelUpdate: false,//para que no se actualice a cada rato
})
const [texto, textoAttrs]=defineField('texto',{
    validateOnModelUpdate: false,//para que no se actualice a cada rato
})




//botones
const currentSliderIndex=ref(0);

const updateEmotionField = (newIndex) => {
    currentSliderIndex.value = newIndex;
    emocionField.value = fondo[newIndex].emocion;//valor que va a tomar en el input del formulario, cada que se cambie de emocion se va a actualizar
};
const nextSlide=()=>{
    const newIndex=(currentSliderIndex.value+1)%fondo.length;
    updateEmotionField(newIndex);//actualiza la emocion
}
const prevSlide=()=>{
    const newIndex=(currentSliderIndex.value-1+fondo.length)%fondo.length;
    updateEmotionField(newIndex);//actualiza la emocion
}


const onSubmit=handleSubmit(
    values=>{
        anotacionStore.agregarAnotacion({
            emocion:values.emocion,
            texto:values.texto
        })
         resetForm({
            values: {
                emocion: initialEmotion,
                texto: ''
            }
        });
        currentSliderIndex.value=0;
        router.push({name:"bitacora"})//navegacion programatica
    },
    ({ errors }) => {//si no se valida:
        console.error('Errores de validación:', errors);
        const firstError = Object.keys(errors)[0];
        const el = document.querySelector(`[name="${firstError}"]`);
        el?.scrollIntoView({
          behavior: 'smooth',
        });
        el.focus();
      },
)

//-------------------PARA LOS ESTILOS-------------------------//

const estilos={
        Enojo:{
           
            titulo:'titulo-rojo',
            boton:'boton-enojo'
        },
         Calma:{
            titulo:'titulo-naranja',
            boton:'boton-calma'
        },
         Tristeza:{
            titulo:'titulo-azul',
            boton:'boton-tristeza'
        },
         Euforia:{
            titulo:'titulo-violeta',
            boton:'boton-euforia'
        },
         Felicidad:{
            titulo:'titulo-amarillo',
            boton:'boton-felicidad'
        }
}

   


const emocionactual=computed(()=>fondo[currentSliderIndex.value].emocion)

const emocionEstilo=computed(()=>{
    return estilos[emocionactual.value];
})

</script>
<template>
   

<section class="fondo-section image flex align-justify" :style="{ backgroundImage: 'url(' + fondo[currentSliderIndex].src + ')' }">
    <div class="contenedor-section flex align-justify"  >
      
        <div class="emocion flex align-justify transition"
        :class="emocionEstilo.titulo">
            <i class="fa-solid fa-arrow-left"   @click="nextSlide"></i>
            <div class="boton-emocion flex align-justify">
            <!--icono-->
                <h3 class="slider-title libre">{{ fondo[currentSliderIndex].emocion }}</h3>
            </div>
            <i class="fa-solid fa-arrow-right"   @click="prevSlide"></i> 
        </div>
       
        <h2 class="pregunta inconsolata transition" :class="emocionEstilo.titulo">¿Por qué te sientes así?</h2>
        <form  @submit="onSubmit" class="form flex align-justify">

        <input v-model="emocionField" v-bind="emocionAttrs" type="hidden" name="emocion"/>
            <p v-if="errors.emocion" class="error mt-2">{{ errors.emocion }}</p>
            <textarea id="texto"v-model="texto" v-bind="textoAttrs"  placeholder="Describe lo que estas sintiendo..." class="campo-nota"></textarea>
            <p class="error libre" :class="emocionEstilo.titulo">{{ errors.texto }}</p>

            <button type="submit" class="boton-envio libre transition" :class="emocionEstilo.boton">Registrar emoción</button>
        </form>

    </div>
    
</section>




</template>

<style scoped>
/*Euforia */
.boton-euforia{
    background-color:var(--color-violeta);
}
.titulo-violeta{
color:var(--color-violeta);
}
/*Felicidad */
.boton-felicidad{
    background-color:var(--color-amarillo);
}
.titulo-amarillo{
color:var(--color-amarillo);
}
/*Enojo */
.boton-enojo{
    background-color:var(--color-rojo);
}
.titulo-rojo{
color:var(--color-rojo);
}
/*Calma*/
.boton-calma{
    background-color:var(--color-naranja);
}
.titulo-naranja{
color:var(--color-naranja);
}
/*Tristeza*/
.boton-tristeza{
    background-color:var(--color-azul);
}
.titulo-azul{
color:var(--color-azul);
}
.slider-title{
    margin: 0.5em;
    font-size: 2em;
    font-weight: 100;
}





.fondo-section{
    height:100vh;
    transition:1s;

}
.transition{
    transition:1s;
}
.contenedor-section{
    width:30%;
    min-width: 40em;
    flex-direction:column;
    
}
.emocion i{
margin:1em;
font-size:2em;
cursor: pointer;
}

.boton-emocion{
    border-radius:2em;
    height:5em;
    background-color:var(--color-blanco);
    width:15em;
}
.boton-emocion i{
font-size:1.5em;
margin:1em;


}
.pregunta{
    margin-top:1em;
    font-size:4em;
    margin-bottom:1em;
    text-align:center;
}


.form{
    height:60vh;
    flex-direction:column;
   font-size:2em;
   width:100%;
}
.campo-nota{
    height:80%;
    border-radius:0.7em;
    border:none;
    width:100%;
    padding:1em;
}
.boton-envio{
    margin-top:2em;
    border-radius:0.5em;
    border:none;
    padding:0.6em 4em;
    color:var(--color-blanco);
    cursor: pointer;
}
.error{
    margin-top:0.5em;
}
</style>