<template>
  <v-layout column>
    <v-container fluid grid-list-md>
      <v-layout row wrap>

<!-- RAPORT: Toti utilizatorii -->
        <v-flex xs12>
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
        <v-flex xs4>
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
        <!-- <v-flex xs6>
          <v-card>
            <v-card-title>
              Numar total de poze pe categorii
            </v-card-title>
            <v-card-text>
              <div id="piechart1"></div>
            </v-card-text>
          </v-card>
        </v-flex> -->

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
    // this.piechart1()
    this.numarPozeCategorii()
    this.readPortofolios()
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
    
    readPortofolios() {
          firebase.database().ref('portofoliu').on('value', snap => {
            const keys = Object.keys(snap.val())
            let myObj = snap.val()
            let portofolios = []
            keys.forEach(key => {
              portofolios.push(myObj[key])
              console.log(portofolios)
            })
          })
        },

    numarPozeCategorii () {
      return firebase.database().ref('portofoliu')
      .on('value', snap => {
        const topSearch = []
        const numbers = []
        const myObj2 = snap.val()
        console.log(myObj2)
        var keysUsers = Object.keys(snap.val())
        keysUsers.forEach(key => {
          console.log(Object.keys(myObj2[key]))
          numbers.push(Object.keys(myObj[key].tags).length)
          if(Object.keys(myObj[key].Collaborations).length === 0) {
            this.usersWithoutCollab = +this.usersWithoutCollab + 1
          } else {
            this.usersWithCollab = +this.usersWithCollab + 1
          }
        })
        for(var i = 0; i < 3; i ++) {
          if(numbers.length == 0) console.log('e gol')
            if(Math.max(...numbers) !== 0) {
            var a = numbers.indexOf(Math.max(...numbers))
            topSearch.push(keysUsers[a])
            numbers[a] = 0
            }
          }
        this.topusersCollab = topSearch
      }, function (error) {
        console.log('Error: ' + error.message)
      })
    }
    // piechart1 () {
    //   var colors = ['#9c5463', '#7b4c67', '#c86060', '#5e4469', '#7f4c66','#b25a62']
    //   google.charts.load('visualization', '1.0',
    //  { packages: ['corechart', 'bar', 'table'], callback: () => {
    //     var chart = new window.google.visualization.PieChart(document.getElementById('piechart1'))
    //     chart.draw(window.google.visualization.arrayToDataTable([
    //       ['Tip', 'Numar'],
    //       ['Cu Colaborări', this.usersWithCollab],
    //       ['Fără Colaborări', this.usersWithoutCollab]
    //     ]), { is3D: false, colors: ['#f86c5c', colors[Math.floor(Math.random() * colors.length)]] })
    //  }})
    // }
  }
}
</script>