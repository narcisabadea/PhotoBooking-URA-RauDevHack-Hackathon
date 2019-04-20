<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout align-start justify-center row wrap>
            <v-flex xs3 v-for="i in 6" :key="i">
              <v-card flat class="hoverShadow" >
                <v-img :aspect-ratio="1" 
                 :src="y"
                 height="13rem" width="13rem" contain ></v-img>
                  <template v-slot:placeholder>
                  <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                  </template>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import * as firebase from "firebase";
  export default {
    data () {
      return {
      //
      test: 'test',
      x: null,
      y: null
    }
    },
  
mounted(){
  firebase.database().ref('portofoliu/-LcvqccMplbefTIT7ADQ').on('value', snap => {
        const keys = Object.keys(snap.val())
         keys.forEach(key => {
           this.y = snap.val()[key].denumire
         })
      })
    }
  }
</script>

<style>
    .hoverShadow{
      margin: 5px;
    }
    .hoverShadow:hover {
      -ms-transform: scale(1.01); /* IE 9 */
      -webkit-transform: scale(1.05); /* Safari 3-8 */
      transform: scale(1.05); 
    }
</style>
