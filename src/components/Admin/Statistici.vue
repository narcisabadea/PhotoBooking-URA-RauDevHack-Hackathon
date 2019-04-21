<template>
  <v-layout>
    <v-container grid-list-xl align-content-center>
      <v-layout align-center row wrap v-bind="binding">

<!-- RAPORT: Toti utilizatorii -->
        <v-flex xs12 d-flex>
          <v-card>
            <v-card-title>
              Toți utilizatorii
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="items"
                item-key="name"
                class="elevation-1">
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.Key }}</td>
                  <td class="text-xs-left">{{ props.item.nume }}</td>
                  <td class="text-xs-left">{{ props.item.prenume }}</td>
                  <td class="text-xs-left">{{ props.item.dataNastere }}</td>
                  <td class="text-xs-left">{{ props.item.email }}</td>
                  <td class="text-xs-left">{{ props.item.telefon }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

<!-- RAPORT: Top utilizatori activi -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              Top fotografi
            </v-card-title>
            <v-card-text>
              <v-card>
              <v-list>
                <v-list-tile v-for="(item, index) in numarPozeCategorii" :key="index">
                  <v-list-tile-action>
                    <v-icon v-if="index === 0" style="color: #433d6b;" >star</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>
      <!-- STATISTICA: Numar poze pe categorii -->
        <v-flex xs12>
          <v-card>
            <v-card-title>
              Numar total de poze pe categorii
            </v-card-title>
            <v-card-text>
              <div id="piechart1" style="width: 600px; height: 300px;"></div>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import firebase from "@/firebase"
import moment from "moment"
import { debug } from 'util';
export default {
  name: "Statistics",
  data() {
    return {
      headers: [
        { text: 'Key', align: 'left', value: 'key' },
        { text: 'Nume', value: 'nume' },
        { text: 'Prenume', value: 'prenume' },
        { text: 'Data nașterii', value: 'dataNastere' },
        { text: 'Email', value: 'email' },
        { text: 'Telefon', value: 'telefon' }
      ],
      items: [],
    }
  },
  mounted () {
    this.userdetails()
    this.piechart1()
    // this.numarPozeCategorii()
    // this.readPortofolios()
  },
  computed:{
    binding () {
      const binding = {}

      if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

      return binding
    },
    arrayOfPortofolios(){
      return this.$store.getters.arrayPortofolios
    },
    numarPozeCategorii(){
      let tags = {}
      this.arrayOfPortofolios.forEach(item =>{
        tags[item.tag] = (tags[item.tag] || 0) + 1
      })
      return tags
    },
  },

  methods: {
    userdetails () {
      return firebase.database().ref('clienti')
      .on('value', snap => {
        const myObj = snap.val()
        var alluserdetails = []
        const keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          const userdetails = {}
          userdetails.dataNastere = myObj[key].dataNastere
          userdetails.nume = myObj[key].nume
          userdetails.prenume = myObj[key].prenume
          userdetails.email = myObj[key].email
          userdetails.telefon = myObj[key].telefon
          userdetails.Key = key
          alluserdetails.push(userdetails)
        })
        this.items = alluserdetails
      }, function (error) {
      })
    },
    
    // piechart1 () {
    //   var colors = ['#9c5463', '#7b4c67', '#c86060', '#5e4469', '#7f4c66','#b25a62']
    //   google.charts.load('visualization', '1.0',
    //  { packages: ['corechart', 'bar', 'table'], callback: () => {
    //     var chart = new window.google.visualization.PieChart(document.getElementById('piechart1'))
    //     chart.draw(window.google.visualization.arrayToDataTable([
    //       ['Tip', 'Numar'],
    //       ['Botez', this.numarPozeCategorii['botez']],
    //       ['Nunta', this.numarPozeCategorii['nunta']],
    //       ['Produse', this.numarPozeCategorii['produse']],
    //       ['Evenimente', this.numarPozeCategorii['evenimente']],
    //       ['Locatii', this.numarPozeCategorii['locatie']]
    //     ]), { is3D: false, colors: ['#f86c5c', colors[Math.floor(Math.random() * colors.length)]] })
    //  }})
    // },

     piechart1 () {
       var chart1 = this.numarPozeCategorii['botez']
       console.log(chart1)
       var chart2 = this.numarPozeCategorii['nunta']
       var chart3 = this.numarPozeCategorii['produse']
       var chart4 = this.numarPozeCategorii['evenimente']
       var chart5 = this.numarPozeCategorii['locatie']
      var colors = ['#9c5463', '#7b4c67', '#c86060', '#5e4469', '#7f4c66','#b25a62']
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
         ['Tip', 'Numar'],
        ['Botez', chart1],
        ['Nunta', chart2],
        ['Produse', chart3],
        ['Evenimente', chart4],
        ['Locatii', chart5]
        ]);
        var options = {
          title: 'My Daily Activities'
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
        chart.draw(data, options);
      }
    }

  }
}
</script>