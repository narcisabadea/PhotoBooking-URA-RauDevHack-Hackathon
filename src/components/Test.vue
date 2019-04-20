<template>
  <v-layout align-center fill-height justify-center>
    <v-flex xs12 sm6>
      <v-card v-if="!selectedTag">
        <v-card-title>
          Alege o categorie pentru a incepe
        </v-card-title>
        <v-card-text>
          <div class="text-xs-center">
            <v-chip color="primary" text-color="white" v-for="tag in availableTags" :key="tag" @click="selectedTag = tag">{{tag}}</v-chip>
          </div>
        </v-card-text>
      </v-card>
      <v-card v-if="selectedTag">
        <v-card-title>
          Alegeri ramase: {{ count }}
        </v-card-title>
        <v-card-text>
          <v-container grid-list-sm fluid>
            <v-layout align-start justify-center row wrap>
              <v-flex xs3 v-for="(data, index) in filteredItems" :key="index" @click="addPhotographerId(data.fotograf)">
                <v-card flat class="hoverShadow" >
                  <v-img :aspect-ratio="1" 
                  :src="data.denumire"
                  height="13rem" width="13rem" contain ></v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import * as firebase from "firebase";
  export default {
    data () {
      return {
      dataPortofolio: [],
      selectedTag: null,
      availableTags: ['nunta','botez','evenimente','produse','locatie'],
      count: 3,
      photographers: [],
      showResult: false
    }
  },
  computed: {
    filteredItems () {
      return this.dataPortofolio.filter(item => {
        if (this.selectedTag === '') {
          return true
        } else {
          return item.tag === this.selectedTag
        }
      })
    }
  },
  methods: {
    getPortofolios() {
      this.dataPortofolio = []
      firebase.database().ref('portofoliu/').on('value', snap => {
        let obj = snap.val()
            const keys = Object.keys(obj)
            keys.forEach(key => {
              let object = obj[key]
              const objKeys = Object.keys(object)
              objKeys.forEach(val => {
                this.dataPortofolio.push({
                  denumire: object[val].denumire,
                  galerie: val,
                  fotograf: key,
                  tag: object[val].tags
                })
              })
            })
          })
          this.$store.dispatch('getPortofoliosData', this.dataPortofolio)
    },
    addPhotographerId(idFotograf) {
      if (this.count === 0) {
        this.showResult = true
      } else {
        this.photographers.push(idFotograf)
        this.count = this.count - 1
      }
    }
  },
  mounted() {
    this.getPortofolios()
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
