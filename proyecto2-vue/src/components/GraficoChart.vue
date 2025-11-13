<script setup>
import { ref,computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { usecancionesStore } from '../stores/canciones';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
ChartJS.register(ArcElement, Title, Tooltip, Legend)
const store=usecancionesStore();
const chartData = computed(()=>{//comunted porque va a usar valores que vienen de una variable reactiva.
  const historial=store.emocionseleccionada || {};
  const conteo=Object.values(historial);
  const emociones=Object.keys(historial);
  
  return{
  labels: emociones,
  datasets: [
    {
      label: 'Veces seleccionada',
      borderRadius: 4,
      data: conteo,
      backgroundColor: [
      '#f8ce5a',
      '#1c57c5',
      '#FEC2AC',
      '#992020',
      '#AA8BE9'
    ],
      borderColor: '#FFF5FC',
      borderWidth: 1,
      hoverOffset: 15,
      borderAlign:'inner',
      hoverBackgroundColor:[
      '#7C5E0B',
      '#021A46',
      '#A82F03',
      '#2B0000',
      '#271B40'
    ],
    }
  ]
  }
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%', 
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#FFF5FC',
        boxWidth: 15,
        padding: 10,
        borderRadius:10,
        font: {
          size: 18,
          family: '"Libre Franklin", sans-serif',
        }
      }
    },
    
  }
}
</script>
<template>
<section class="section-grafico image flex align-justify">
  <div class="datos flex">
    <div class="titulo flex">
        <h2 class="registro libre">Registro</h2>
        <h2 class="emocional inconsolata">Emocional</h2>
    </div>
    <div class="subtitulo libre flex">
      <h4 class="historial">Historial</h4>
      <h4 class="emociones">de tus emociones</h4>
    </div>
  </div>

  <div class="grafico-container flex align-justify efecto">
      <Doughnut :data="chartData" :key="JSON.stringify(chartData)":options="chartOptions" />
      
  </div>
</section>
 
</template>
<style scoped>
.section-grafico{
  background-image: url("/imagenes/fondo-grafico.jpg");
  padding: 5em;
  height: 100vh;
  flex-direction: column;
}
.grafico-container {
 width: 50%;
 min-width: 60em;
 padding: 3em;  
 height: 65vh;  
box-shadow: 0 10em 20em rgba(106, 73, 73, 0.2);

  
}
.datos{
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 3em;
}
.titulo{
font-size: 7em;

}
.subtitulo{
  font-size: 3em;
  font-weight: 100;
}
.historial{
  color: var(--color-euforia);
  font-weight: 100;
}
.emociones{
  margin: 0 0.2em;
  color: var(--color-blanco);
  font-weight: 100;
}
.registro{
  font-weight: 100;
  color: var(--color-blanco);
}
.emocional{
  margin: 0 0.2em;
  font-weight: 100;
  color: var(--color-euforia);
}
.efecto{
  background: linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0));
  backdrop-filter: blur(20em);
  -webkit-backdrop-filter: blur(20em);
  border: 0.2em solid rgba(255,255,255,0.2);
  box-shadow: 0 10em 10em 0 rgba(0,0,0,0.6);
  border-radius: 1em;
}
</style>