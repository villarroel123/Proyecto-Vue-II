import frasesDelDia from "../assets/content/frases.json"
import { defineStore } from "pinia";
import{ref} from "vue";

export const usefrasesStore=defineStore("frases",()=>{ 
const frases= ref('');

const arrayfrases= Object.values(frasesDelDia)

const obtenerFrase=()=>{
const numero= Math.floor(Math.random()*12)
const fraserandom=arrayfrases[numero]
frases.value=fraserandom;
}

const frasesFavoritas=ref([])
const fraseFavorita=(frase)=>{
frasesFavoritas.value.push(frase);
}


return{
    frases,
    obtenerFrase,
    fraseFavorita,
    frasesFavoritas
}
},{
  persist: {
    enabled: true,
    
},
});


