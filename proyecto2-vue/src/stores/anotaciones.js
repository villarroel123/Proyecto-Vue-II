import { defineStore } from "pinia";
import{ref,reactive} from "vue";
export const useanotacionesStore=defineStore("anotaciones",()=>{

const anotaciones=ref([]);//se van a guardar objetos, array de objetos


//registro de emocion
const emocionelegida=ref('');//cada que cambie se actualizan los estilos


const agregarAnotacion=(anotacion)=>{
    anotaciones.value.push(anotacion);
    emocionelegida.value = '';
};
return{
    anotaciones,
    agregarAnotacion,
    emocionelegida
}
},{
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['anotaciones'],
      },
    ],
},
  })



//localStorage.clear();