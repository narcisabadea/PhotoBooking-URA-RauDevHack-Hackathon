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
        <v-card-title v-if="count !== 0">
          Alegeri ramase: {{ count }}
        </v-card-title>
        <v-card-text v-if="count !== 0">
          <v-container grid-list-sm fluid>
            <v-layout align-start justify-center row wrap>
              <v-flex xs3 v-for="(data, index) in filteredItems" :key="index" @click="addPhotographerId(data.fotograf, data.denumire)">
                <v-card flat class="hoverShadow">
                  <v-img :aspect-ratio="1" 
                  :src="data.denumire"
                  height="13rem" width="13rem" contain >
                    <v-layout pa-2 column fill-height class="lightbox white--text" v-if="verifyIfSelected(data.denumire)">
                      <v-spacer></v-spacer>
                      <v-flex shrink>
                        <div class="subheading">Selected</div>
                      </v-flex>
                    </v-layout>
                  </v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <div  v-if="count === 0">
          <v-card-text>
            Conform selectarilor facute, fotografii recomandati sunt: 
          </v-card-text>
        <v-card-text>
           <v-data-table
        :headers="headers"
        :items="selectedPhotographers"
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
            <td class="text-xs-left">{{ props.item.nume }} {{ props.item.prenume }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.telefon }}</td>
            <td class="text-xs-left">
              <v-btn flat small class="primary">
                Contacteaza fotograful
              </v-btn>
            </td>
            <td></td>
          </template>
          </v-data-table>

        </v-card-text>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
      selectedTag: null,
      availableTags: ['nunta','botez','evenimente','produse','locatie'],
      count: 3,
      photographers: [],
      showResult: false,
      selectedPhotographers: [],
      headers: [
        {
          text: 'Nume', align: 'left', value: 'user'
        },
        {
          text: 'Email', value: 'university'
        },
        {
          text: 'Telefon', value: 'details'
        },
        {
          text: '', value: 'actions'
        }
      ]
    }
  },
  computed: {
    dataPortofolio() {
      return this.$store.getters.arrayPortofolios
    },
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
    verifyIfSelected(denumire) {
      return this.photographers.map(e => e.denumire).indexOf(denumire) !== -1
    },
    addPhotographerId(idFotograf, denumire) {
      if (this.count === 0) {
        this.showResult = true
        this.getPhotographersData()
      } else {
        this.photographers.push({idFotograf, denumire})
        this.count = this.count - 1
        if (this.count === 0) {
          this.getPhotographersData()
        }
      }
    },
    getPhotographersData() {
      let x = []
      this.$store.getters.photographersDetails.filter(item => { 
        // console.log(item)
        this.photographers.forEach(photographer => {
          if (photographer.idFotograf === item.idFotograf) {
            x.push(item)
          }
        })
      })
      this.selectedPhotographers =  x.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj['idFotograf']).indexOf(obj['idFotograf']) === pos;
      })
    }
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
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
</style>
