import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Grafico from "../views/Grafico.vue";
import Musica from "../views/Musica.vue";
import Bitacora from "../views/Bitacora.vue";

const router=createRouter({//objeto con 2 propiedades
    history:createWebHashHistory(),//parametro, inicializo
    //creo array de rutas(por pagina)
    routes: [//creo variable
        {
            path: "/",
            name:"home",
            component: Home
        },
        {
            path:"/Grafico",
            name:"grafico",
            component:Grafico
        },
        {
            path:"/Musica",
            name:"musica",
            component:Musica
        },
        {
            path:"/Bitacora",
            name:"bitacora",
            component:Bitacora
        }
      
    ]
})

export default router;