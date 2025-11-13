//importo json
import cancionesPorEmocion from "../assets/content/cancion.json"
import { defineStore } from "pinia";
import{ref} from "vue";
const getImageUrl = (source) => {
    if (source instanceof File) {
        return URL.createObjectURL(source);
    }
    return source;
};
export const usecancionesStore=defineStore("canciones",()=>{ 
const canciones=ref([]);//array vacio donde se guardaran las canciones del json
//inicalizo conteo
const emocionseleccionada = ref({//se va a modificar a medida que seleccionan un item
        Felicidad: 0,
        Tristeza: 0,
        Calma: 0,
        Enojo: 0,
        Euforia:0
    });

//graf
    const registroEmocion=(emocion)=>{
    emocionseleccionada.value[emocion]++;//accedo al valor de la emocion seleccionadfa y aumenta el conteo
}
//---------para el formulario
const addMusic=(music,emocion)=>{
    const imagenUrl = getImageUrl(music.image);
        const musicaParaGuardar = {
            ...music,
            image: imagenUrl // Reemplazamos el objeto file por su url
        };
    const cancionguardada=JSON.parse(localStorage.getItem("CancionesAgregadas"))|| {};
    if (!cancionguardada[emocion]) {
    cancionguardada[emocion] = [];
    }
    //cancionguardada[emocion].push(music)
    cancionguardada[emocion].push(musicaParaGuardar);
    localStorage.setItem("CancionesAgregadas", JSON.stringify(cancionguardada));
}
//para vista bitacora
const cancionesFavoritas=ref([])
const cancionFavorita=(cancion)=>{
    cancionesFavoritas.value.push(cancion);
}

//funcion que se llamara al momento de hacer click
const ObtenerCancionPorEmocion= (emocion)=>{
    //canciones por emocion
    const cancionPorEmocion=cancionesPorEmocion[emocion]//json
    //para las canciones guardadas con el localstorage
    let cancionesguardadas=localStorage.getItem("CancionesAgregadas")//busca si hay
    let guardadas=[];//para guardar las canciones por emocion
    if(cancionesguardadas){
        cancionesguardadas=JSON.parse(cancionesguardadas);//lo pasa a objeto
        if(cancionesguardadas[emocion]){
            guardadas=cancionesguardadas[emocion];
        }
    }
    canciones.value=[...cancionPorEmocion,...guardadas];//se actualizara cada que cambie de emocion
}; 
return{
    canciones,
    ObtenerCancionPorEmocion,
    registroEmocion,
    addMusic,
    cancionFavorita,
    emocionseleccionada,
    cancionesFavoritas
}
},{
    persist:true,//para que persista la informacion
});

//localStorage.clear();