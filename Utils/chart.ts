import ApexCharts from 'apexcharts';
import { CandidatoDAO } from '../DAO/candidatoDAO';
import { Candidato } from '../model/candidato';

export class Chart {
  
  static chartCompetencias(candidatos: CandidatoDAO) {

      let dados: Array<number> = [0, 0, 0, 0, 0, 0]

      for(let i=0; i<candidatos.size(); i++){

          let candidato: Candidato = candidatos.candidatos[i]

          for(let j=0; j<6; j++){

              if(candidato.competencias[j]==true){
                  dados[j]++
              }
              
          }

      }

      var options = {
            color: ['#14342B'],
            series: [{
            data: [dados[0], dados[1], dados[2], dados[3], dados[4], dados[5]]
          }],
            chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: ['Assembly','Frontend' ,'Backend' ,'Fullstack' ,'DevOps' ,'Cloud Computing'
            ],
          }
        };

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      return chart

    }

}