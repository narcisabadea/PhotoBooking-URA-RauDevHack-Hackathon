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
              <v-btn flat small class="primary" v-if="cereriTrimise.indexOf(props.item.idFotograf) === -1" @click="verificaUser(props.item.idFotograf)">
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

  <v-dialog v-model="dialogTime" class="dialog">
    <v-container fluid grid-list-xl>
      <v-layout align-center justify-space-around row>
        <v-flex xs12 md4>
          <v-card class="elevation-0 transparent">
            <v-card-text class="text-xs-center">
              <v-icon x-large color="indigo darken-1">add_circle</v-icon>
            </v-card-text>
            <v-card-text>
               <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="dataStart"
                lazy
                transition="scale-transition"
                offset-y
                required
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dataStart"
                  readonly
                  label="Data start"
                ></v-text-field>
                <v-date-picker v-model="dataStart" no-title scrollable>
                  <v-btn flat color="primary" @click="$refs.menu.save(dataStart)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-menu
                ref="menu1"
                :close-on-content-click="false"
                v-model="menu1"
                :nudge-right="40"
                :return-value.sync="dataFinal"
                lazy
                transition="scale-transition"
                offset-y
                required
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dataFinal"
                  readonly
                  label="Data final"
                ></v-text-field>
                <v-date-picker v-model="dataFinal" no-title scrollable>
                  <v-btn flat color="primary" @click="$refs.menu1.save(dataFinal)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" @click="trimiteCerere()" color="white--text" class="gradient"> Trimite cerere
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-dialog>
    <v-dialog v-model="dialogLogIn" class="dialog">
      <v-container fluid grid-list-xl>
        <v-layout align-center justify-space-around row>
          <v-flex xs12 md3>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon x-large color="indigo darken-1">account_circle</v-icon>
              </v-card-text>
              <v-card-text>
                <v-text-field
                  v-model="formSignIn.email"
                  required
                  :rules="rules.emailRules"
                  label="Adresa de email">
                </v-text-field>
                <v-text-field
                  v-model="formSignIn.password"
                  label="Parola"
                  required
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show">
                </v-text-field>
                <v-switch
                  :v-model="true"
                  :label="'Sunt fotograf'"
                  :disabled="true"
                ></v-switch>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="indigo darken-1" type="submit" @click="forgotPassword()"> Am uitat parola
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" @click="userSign" color="white--text" class="gradient" :disabled="!verifyFormErrorsSignIn"> Intra in cont
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-alert
              :value="true"
              type="error"
              v-if="errorLogin !== null"
            >
              {{errorLogin}}
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import rules from '@/components/formRules'
import router from '@/router'
  export default {
    data () {
      return {
      dataStart: null,
      dataFinal: null,
      selectedTag: null,
      menu: false,
      menu1: false,
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
      ],
      formSignIn: {
        email: '',
        password: '',
        switch: false
      },
      id: null,
      cereriTrimise: [],
      dialogLogIn: false,
      errorLogin: null,
      dialogTime: false,
      show: false
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
    },
    user() {
      return this.$store.getters.user
    },
    verifyFormErrorsSignIn () {
      return this.formSignIn.password.length > 3 && /.+@.+/.test(this.formSignIn.email)
    }
  },
  created () {
    this.rules = rules
  },
  methods: {
    seteazaDate(idFotograf) {
      this.trimiteCerere(idFotograf)
    },
    userSign () {
      if (this.formSignIn.email === 'admin@rau.ro' && this.formSignIn.password === 'admin') {
        this.$store.dispatch('loginUser', {type: 'admin', id: 'admin'})
        this.dialogLogIn = false
        router.push('/Statistici')
      } else if (this.formSignIn.switch === true) {
        let details = this.$store.getters.photographersDetails
        details.forEach(element => {
          if (element.email === this.formSignIn.email && element.parola === this.formSignIn.password) {
            this.$store.dispatch('loginUser', {type: 'photo', id: element.idFotograf })
            this.dialogLogIn = false
            this.dialogTime = true
          } else {
            this.errorLogin = 'Date invalide'
          }
        });
      } else {
        let details = this.$store.getters.usersDetails
        details.forEach(element => {
          if (element.email === this.formSignIn.email && element.parola === this.formSignIn.password) {
            this.$store.dispatch('loginUser', {type: 'client', id: element.idClient})
            this.dialogLogIn = false
            this.dialogTime = true
          } else {
            this.errorLogin = 'Date invalide'
          }
        });
      }
    },
    verificaUser(idFotograf) {
      if (this.user && this.user.id) {
        this.dialogTime = true
        this.id = idFotograf
      } else {
        this.dialogLogIn = true
      }
    },
    trimiteCerere() {
      firebase.database().ref('rezervari/')
          .push({
            dataInregistrare: new Date(),
            dataStart: this.dataStart,
            dataEnd: this.dataFinal,
            idClient: this.user.id,
            idFotograf: this.id,
            status: 'pending',
            idCerere: true
          }).then((snap) => {
            firebase.database().ref('rezervari/'+ snap.key).update({
              idCerere: snap.key
            })
            this.dialogTime = false
            this.cereriTrimise.push(this.id)
        })
    },
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
