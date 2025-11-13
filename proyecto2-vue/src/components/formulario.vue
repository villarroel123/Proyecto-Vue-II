<script setup>
import { usecancionesStore } from '../stores/canciones';
import { useRouter } from 'vue-router';
import {useForm} from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { ref } from 'vue';
const imagendefault="/imagenes/imagen-default.jpg";
const formatos=['image/jpg','image/png','image/jpeg']
const width= 640;
const height= 640;

// Para las dimensiones de la imagen
function checkDimensions(file, requiredWidth, requiredHeight) {
    if (!file) return Promise.resolve(true); 
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = () => {
                const isValid = img.width === requiredWidth && img.height === requiredHeight;
                resolve(isValid); //veo si cumple con los tamaños
            };
            img.onerror = () => {
                resolve(false); 
            };
        };
        reader.onerror = () => {
            resolve(false); 
        };
    });
}
const router = useRouter();
const cancionStore=usecancionesStore()
// VEE- VALIDATE
const validationSchema = toTypedSchema(
    yup.object({//uso como esquema de form yup
        name: yup.string().required('El nombre es obligatorio'),
        artist: yup.string().required('Debe ingresar el nombre del artista'),
        emocion: yup.string().required('Debe seleccionar una emoción'),
        youtube: yup.string().required('Debe ingresar un link de youtube'),
        image: yup.mixed() 
            .test(
                'Formato de imagen no soportado (solo JPG/PNG).', 
                (value) => {
                    if (!value) return true; 
                    const file = value instanceof FileList ? value[0] : value;
                    return file && formatos.includes(file.type);
                }
            )
            .test('La imagen debe ser de 800 de acho y 600 de alto',
                async (value) => { 
                    const file = value instanceof FileList ? value[0] : value;
                    return await checkDimensions(file, width, height);
                }
            )
    })
);
const { errors, handleSubmit, defineField } = useForm({
    validationSchema: validationSchema,
});
const onSubmit = handleSubmit(
  values => {
    console.log('Valores validados:', values);
    const fileList = values.image;
        const uploadedFile = fileList instanceof FileList && fileList.length > 0 ? fileList[0] : null;
        let imagenfinal;
        if (uploadedFile) {
            imagenfinal = uploadedFile;
        } else {
            imagenfinal = imagendefault;
        }
    cancionStore.addMusic({//creo directamente el objeto una vez que se valida
            name: values.name,//son los datos que devuelve el definefield
            artist: values.artist,
            emocion: values.emocion,
            image : imagenfinal,
            youtube:values.youtube
    }, values.emocion);
    router.push({name:"home"})//navegacion programatica
  },
  ({ errors }) => {//si no se valida:
    console.error('Errores de validación:', errors);
    const firstError = Object.keys(errors)[0];
    const el = document.querySelector(`[name="${firstError}"]`);
    el?.scrollIntoView({
      behavior: 'smooth',
    });
    el.focus();
  },)


const [name,nameAttrs]=defineField('name', {
        validateOnModelUpdate: false,
});
const [artist,artistAttrs]=defineField('artist', {
        validateOnModelUpdate: false,//para que no se actualice a cada rato
});
const [emocion,emocionAttrs]=defineField('emocion', {
        validateOnModelUpdate: false,//para que no se actualice a cada rato
});
const [youtube,youtubeAttrs]=defineField('youtube', {
        validateOnModelUpdate: false,//para que no se actualice a cada rato
});
const [image, imageAttrs] = defineField('image');


//fin de validacion
const colorinput1=ref('');
const colorinput2=ref('');
const colorinput3=ref('');
const colorinput4=ref('');

const cambiocolor=()=>{
colorinput1.value='cambiocolorinput'
}
const cambiocolor2=()=>{
colorinput2.value='cambiocolorinput'
}
const cambiocolor3=()=>{
    colorinput3.value='cambiocolorinput'
}
const cambiocolor4=()=>{
    colorinput4.value='cambiocolorinput'
}
</script>
<template>
<body>
<section class="section-form image">
    <div class="circulo"><!--circulo--></div>
    <article>
        <h2 class="titulo">Agrega tus propias canciones</h2>
        <div class="contenedor-form flex align-justify efecto">
            <form @submit="onSubmit" class="form ">
                <label for="title" class="nombre-input">Nombre de la canción:</label>
                <input v-model="name" v-bind="nameAttrs" type="text" id="title" placeholder="Nombre" class="input" :class="colorinput1" @change="cambiocolor()" @focus="cambiocolor" >
                <p class="error libre" >{{ errors.name }}</p>
                <label for="artist" class="nombre-input">Artista:</label>
                <input v-model="artist" v-bind="artistAttrs" type="text" id="artist" placeholder="Artista" class="input" :class="colorinput2" @change="cambiocolor2" @focus="cambiocolor2">
                <p class="error libre">{{ errors.artist }}</p>
                <label for="color" class="nombre-input">Elegí una emoción:</label>
                <select id="emocion" name="emocion" class="input"v-model="emocion" v-bind="emocionAttrs" :class="colorinput3" @change="cambiocolor3" @focus="cambiocolor3"><!--uso v-,model porque guardo la emocion seleccionada en la constante cancion-->
                    <option value="Felicidad">Felicidad</option>
                    <option value="Tristeza" >Tristeza</option>
                    <option value="Enojo">Enojo</option>
                    <option value="Calma">Calma</option>
                    <option value="Euforia">Euforia</option>
                </select>
                <p class="error libre">{{ errors.emocion }}</p>
                <label for="youtube" class="nombre-input">Link de cancion (Youtube):</label>
                <input v-model="youtube" v-bind="youtubeAttrs" type="text" id="youtube" placeholder="Link de youtube" class="input" :class="colorinput4" @change="cambiocolor4" @focus="cambiocolor4">
                <p class="error libre">{{ errors.youtube }}</p>
                <label for="image" class="nombre-input input-file">Ingresa imagen de álbum(640x640)</label>
                <input type="file" v-bind="imageAttrs" @change="e=>image=e.target.files" id="image" name="image">
                <p class="error libre">{{ errors.image }}</p>
                <button type="submit" class="boton libre">Enviar</button>    
            </form>
        </div>
        
    </article>   
</section>
</body>
</template>
<style scoped>
.section-form{
position: relative;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
background-image: url("/imagenes/fondo-form.jpg");

}
.section-form article{
    width: 70%;
    min-width: 150em;
    margin-bottom: 6em;
}
.titulo{
    font-size: 7em;
    margin-bottom: 0.5em;
    margin-top:5em;
    font-family: "Inconsolata", monospace;
    font-optical-sizing: auto;
    font-weight: weight;
    font-style: normal;
    color: var(--color-blanco);
    width: 50%;
}
.form {
    width: 80%;
    font-size: 3em;
    display: flex;
    flex-direction: column;   
}
.error{
    font-size: 1.1em;
    color: #804ECE;
    margin-bottom: 0.3em;
    font-weight: 100;
    
    color: var(--color-violetaclaro);
}
.input{
    margin-bottom: 0.5em;
    padding: 0.3em;
    border-radius: 0.2em;
    border: 2px solid transparent;
    background-color: #FFF5FC;
    cursor: pointer;
    color: #804ECE;
}
.cambiocolorinput{
    border: 0.15em solid #804ECE;
   
}
.boton{
    margin-top: 1em;
    padding: 0.4em;
    cursor: pointer;
    width: 100%;
    border: none;
    background-color:  #804ECE;
    border-radius: 0.2em;
    color: aliceblue;
    font-size: 1.3em;
}
.boton:hover{
    background-color: #6f32d1;
}
.nombre-input{
    font-size: 1.5em;
    margin-bottom: 0.3em;
    font-family: "Signika", sans-serif;
    font-optical-sizing: auto;
    font-weight: 100;
    font-style: normal;
    font-variation-settings:"GRAD" 0;
    color: #FFF5FC;
}
.input-file{
    width: 100%;
    display: inline-block;
    color: white;
    padding-bottom:0.5em;
    font-weight: bold;
    transition: background 0.2s; 
    font-family: "Signika", sans-serif;
    font-optical-sizing: auto;
    font-weight: normal;
    font-style: normal;
    font-variation-settings:"GRAD" 0;
    font-size: 1.5em;
}

/*.input-file-hidden{
    display: none;
}*/
.circulo{
 width: 190em;     
  height: 190em;       
  border-radius: 50%; 
  position: absolute;
  background-image: url("/imagenes/circulo.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  top:1em;
  right: -48em;
}


.contenedor-form{
width:35%;
padding:4em 1em;
border-radius:2em;
}
.efecto{
  background: linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0));
  backdrop-filter: blur(10em);
  -webkit-backdrop-filter: blur(20em);
  border: 0.1em solid rgba(255,255,255,0.2);
  box-shadow: 0 10em 10em 0 rgba(0,0,0,0.3);
}



/*media queries*/
@media (max-width: 1000px) {
.circulo{
    width: 160em;     
    height: 160em;       
    top:5em;
    right: -60em;
}
.section-form article{
    width: 80%;  
}
.contenedor-form{
min-width: 80em;
}
}
@media (max-width: 800px) {
.circulo{
    width: 140em;     
    height: 140em;       
    top:17em;
    right: -80em;
}
.section-form article{
    width: 60%;  
}
.contenedor-form{
min-width: 70em;
}
}

@media (max-width: 700px) {
.titulo{
    font-size: 5em;
}
.section-form article{
    width: 40%;
    min-width: 130em; 
}
.contenedor-form{
width: 50%;
min-width: 70em;
}
}
@media (max-width: 600px) {
.titulo{
    font-size: 5em;
    width: 100%;
}
.section-form article{
    width: 30%;
    min-width: 80em;  
}
.contenedor-form{
width: 100%;
}
.circulo{
    display: none;
}
}

</style>