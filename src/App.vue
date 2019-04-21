<template>
  <v-app>
    <!-- continut ce se afiseaza pe toate paginile, indiferent de continut (valabil doar in fisierul App.vue) -->
    <v-toolbar app class="primary" flat>
      <v-toolbar-title class="headline">
        <router-link :to="'/Home'">
        <v-toolbar-title class="white--text">
          <span class="text-uppercase">rau</span>
          <span class="font-weight-light">DevHack - PPM</span>
        </v-toolbar-title>
      </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="dialogLogIn = !dialogLogIn" flat v-if="!logout" class="white--text">
        Login
      </v-btn>
      <v-btn @click="dialogSignUp = !dialogSignUp" flat v-if="!logout" class="white--text">
        Sign up
      </v-btn>
      <v-btn flat class="white--text"  router to = "/Test">
        Test
      </v-btn>
      <v-menu offset-y v-if="userType === 'admin'">
        <v-btn
          flat
          slot="activator">
        <v-badge color="red"  class="white--text">
          <v-icon left >pie_chart</v-icon>Dashboard
        </v-badge>
        </v-btn>
        <v-list>
          <v-list-tile>
            <router-link to="/Requests" tag="li" style="cursor:pointer">
              <v-list-tile-title>Requests </v-list-tile-title>
            </router-link>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y v-if="logout">
        <v-btn
          flat
          slot="activator">
          <v-icon left  class="white--text">account_circle</v-icon><div  class="white--text">Cont</div>
        </v-btn>
        <v-list>
          <v-list-tile v-if="user.type === 'client'">
            <router-link to="/ProfilClient" tag="li" style="cursor:pointer">
              <v-list-tile-title>Detalii cont</v-list-tile-title>
            </router-link>
          </v-list-tile>
          <v-list-tile v-if="user.type === 'photo'">
            <router-link to="/ProfilFotograf" tag="li" style="cursor:pointer">
              <v-list-tile-title>Detalii cont</v-list-tile-title>
            </router-link>
          </v-list-tile>
          <v-list-tile v-if="user.type === 'client'">
            <router-link to="/Favoriti" tag="li" style="cursor:pointer">
              <v-list-tile-title>Fotografi favoriti</v-list-tile-title>
            </router-link>
          </v-list-tile>
          <v-list-tile v-if="user.type === 'client'">
            <router-link to="/CereriTrimise" tag="li" style="cursor:pointer">
              <v-list-tile-title>Cereri trimise</v-list-tile-title>
            </router-link>
          </v-list-tile>
          <v-list-tile v-if="user.type === 'photo'">
            <router-link to="/CalendarAcceptate" tag="li" style="cursor:pointer">
              <v-list-tile-title>Calendar</v-list-tile-title>
            </router-link>
          </v-list-tile>
          <v-list-tile v-if="user.type === 'photo'">
            <router-link to="/CereriAcceptateDecline" tag="li" style="cursor:pointer">
              <v-list-tile-title>Cereri</v-list-tile-title>
            </router-link>
          </v-list-tile>
          <v-list-tile v-if="user.type === 'photo'">
            <router-link to="/Istoric" tag="li" style="cursor:pointer">
              <v-list-tile-title>Istoric</v-list-tile-title>
            </router-link>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn @click="signOut()" flat v-if="logout" class="white--text">
        Logout
      </v-btn>
    </v-toolbar>

    <!-- continutul paginii  -->
    <v-content>
      <!-- componenta se va modifica de fiecare data cand se intra pe alta ruta din 'router' -->
      <router-view></router-view>
    </v-content>

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
                  v-model="formSignIn.switch"
                  :label="formSignIn.switch ? 'Sunt fotograf' : 'Sunt client'"
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

    <v-dialog v-model="dialogSignUp" class="dialog">
      <v-container fluid grid-list-xl>
        <v-layout align-center justify-space-around row>
          <v-flex xs12 md4>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon x-large color="indigo darken-1">add_circle</v-icon>
              </v-card-text>
              <v-card-text>
                <v-text-field
                  v-model="formSignUp.name"
                  required
                  :rules="rules.nameRules"
                  label="Nume">
                  Nume
                </v-text-field>
                <v-text-field
                  v-model="formSignUp.surname"
                  :rules="rules.nameRules"
                  required
                  label="Prenume">
                  Prenume
                </v-text-field>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="formSignUp.birthday"
                  lazy
                  transition="scale-transition"
                  offset-y
                  required
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="formSignUp.birthday"
                    readonly
                    label="Data nasterii"
                  ></v-text-field>
                  <v-date-picker v-model="formSignUp.birthday" no-title scrollable>
                    <v-btn flat color="primary" @click="$refs.menu.save(formSignUp.birthday)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                 <v-select
                  :items="gender"
                  label="Sex"
                  required
                  v-model="formSignUp.sex"
                ></v-select>
                <v-text-field
                  v-model="formSignUp.email2"
                  required
                  :rules="rules.emailRules"
                  label="Adresa de email">
                  Email
                </v-text-field>
                <v-text-field
                  v-model="formSignUp.phone"
                  required
                  label="Telefon">
                  Telefon
                </v-text-field>
                <v-switch
                  v-model="formSignUp.switch"
                  :label="formSignUp.switch ? 'Ma inregistrez ca fotograf' : 'Doresc sa caut fotograf'"
                ></v-switch>
                <v-text-field
                  v-model="formSignUp.password2"
                  required
                  :append-icon="show1 ? 'visibility_off' : 'visibility'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  label="Parola">
                  Parola
                </v-text-field>
                <v-text-field
                  v-model="formSignUp.passwordConfirm"
                  required
                  :append-icon="show2 ? 'visibility_off' : 'visibility'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  :rules="[comparePasswords]"
                  label="Repeta parola">
                  Repeta parola
                </v-text-field>
                <v-checkbox
                label="Accept prelucrarea datelor cu caracter personal"
                v-model="formSignUp.gdpr"
                required>
                </v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" @click="newAccount()" color="white--text" class="gradient" :disabled="!verifyFormErrorsSignUp"> Creeaza cont nou
                </v-btn>
              </v-card-actions>
              <v-alert
              :value="true"
              type="error"
              v-if="errorSignUp !== null">
              {{errorSignUp}}
            </v-alert>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-app>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable */
import formRules from '@/components/formRules'
import router from '@/router'
import * as firebase from "firebase";
export default {
  name: 'App',
  data () {
    return {
      // example:
      formSignUp: {
        name: '',
        password2: '',
        passwordConfirm: '',
        email2: '',
        surname: '',
        birthday: null,
        phone: null,
        gdpr: false,
        switch: false
      },
      formSignIn: {
        email: '',
        password: '',
        switch: false
      },
      userType: null,
      userLogged: false,
      menu: false,
      show: false,
      show1: false,
      show2: false,
      gender: ['F', 'M'],
      sex: null,
      dialogLogIn: false,
      dialogSignUp: false,
      errorLogin: null,
      errorSignUp: null,
      rules: null
    }
  },
// functii ce se apeleaza de fiecare data cand o valoare din interior se modifica. Numele functiei se poate utiliza si pe post de variabila daca aceasta 'return'-eaza
  computed: {
    logout () {
      if (!this.user) {
        return false
      } else if (!this.user.type) {
        return false
      } else {
        return true
      }
    },
    user () {
      return this.$store.getters.user
    },
    verifyFormErrorsSignIn () {
      return this.formSignIn.password.length > 3 && /.+@.+/.test(this.formSignIn.email)
    },
    verifyFormErrorsSignUp () {
     return this.formSignUp.password2.length > 3 && /.+@.+/.test(this.formSignUp.email2) && this.formSignUp.name.length > 3 && this.formSignUp.surname.length > 3 && this.formSignUp.sex !== null && this.formSignUp.birthday !== null && this.formSignUp.password2.length > 3 && this.comparePasswords !== 'Parolele nu coincid'
    },
    error () {
      return this.$store.getters.error
    },
    comparePasswords () {
      return this.formSignUp.password2 !== this.formSignUp.passwordConfirm ? 'Parolele nu coincid' : false
    }
    // example:
    // userDetails () {
    //   return this.$store.getters.userDetails
    // }
  },
// functii ce se apeleaza la cerere
  methods: {
    userSign (email, password) {
      if (this.formSignIn.switch === true) {
        let details = this.$store.getters.photographersDetails
        details.forEach(element => {
          if (element.email === this.formSignIn.email && element.parola === this.formSignIn.password) {
            this.$store.dispatch('loginUser', {type: 'photo', id: element.idFotograf })
            this.dialogLogIn = false
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
          } else {
            this.errorLogin = 'Date invalide'
          }
        });
      }
    },
    newAccount () {
      if (this.formSignUp.switch === true) {
        firebase.database().ref('fotografi/')
          .push({
            dataInregistrare: new Date(),
            nume: this.formSignUp.name,
            parola: this.formSignUp.passwordConfirm,
            email: this.formSignUp.email2,
            prenume: this.formSignUp.surname,
            telefon: this.formSignUp.phone,
            dataNastere: this.formSignUp.birthday,
            sex: this.sex,
            idFotograf: 'test'
          }).then(ceva => {
            this.dialogSignUp = false
            this.dialogLogIn = true
          }).birthday.then((snap) => {
            firebase.database().ref('fotografi/'+ snap.key).update({
          idFotograf: snap.key,
        })})
      } else {
       firebase.database().ref('clienti/')
          .push({
            dataInregistrare: new Date(),
            nume: this.formSignUp.name,
            parola: this.formSignUp.passwordConfirm,
            email: this.formSignUp.email2,
            prenume: this.formSignUp.surname,
            telefon: this.formSignUp.phone,
            dataNastere: this.formSignUp.birthday,
            sex: this.sex,
            idClient: 'test'
          }).then(ceva => {
            this.dialogSignUp = false
            this.dialogLogIn = true
          }).birthday.then((snap) => {
            firebase.database().ref('clienti/'+ snap.key).update({
          idClient: snap.key,
        })})
      }
    },
    forgotPassword () {
      const adresaEmail = prompt('Introduceti adresa de email', '')
      firebase.auth().sendPasswordResetEmail(adresaEmail)
        .then(function () {
          window.alert('Un email de recuperare a parolei a fost trimis pe adresa: ' + adresaEmail)
        }).catch(error => {
          window.alert(error.message)
        })
    },
    signOut () {
      this.$store.dispatch('loginUser', {type: null})
      localStorage.clear()
      router.push('/Home')
    }
  },
// LIFECYCLE: functie ce se apeleaza inainte de construirea DOM-ului
  created() {
    this.rules = formRules
    this.$store.dispatch('readUsers')
    this.$store.dispatch('readPhotographers')
    this.$store.dispatch('readPortofolios')
    this.$store.dispatch('readBookings')
    this.$store.dispatch('verifyUserLogged')
    this.$store.dispatch('getArrayOfPortofoloos')
  },
// LIFECYCLE: functie ce se apeleaza in timpul construirii DOM-ului
  mounted() {
    // - DATABASE

    // read from firebase
    // firebase.database().ref('test').on('value', snapshot => {
    //   console.log(snapshot.val())
    // })

    // get authenticated user ID
    // var userId = firebase.auth().currentUser.uid;

    // add with specific id in database
    // firebase.database().ref('test/' + specificID).set({
    //   username: name
    // })

    // update value in database
    // firebase.database().ref('way to value').update({ variable: 'newValue'})

    // - AUTEHNTICATION

    // create new user withoud any data
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
    //   var errorCode = error.code
    //   var errorMessage = error.message
    // })

    // create user with signUp form who have more data
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     firebase.database().ref('Users/' + firebase.auth().currentUser.uid).set({
    //       Name: 'name',
    //       Phone: 'phone',
    //       Email: 'email'
    //     })
    //     }
    //   )
    //   .catch(
    //     error => {
    //       window.alert(error)
    //     }
    //   )

    // verify if user still logged in
    // firebase.auth().onAuthStateChanged(user => {
    //   doSomethingIfUserStillExist
    // })

    // sign in function
    // firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
    //   var errorCode = error.code
    //   var errorMessage = error.message
    // })

    //sign out function
    // firebase.auth().signOut().then(() => {
    //   }).catch(error => {
    // })

  }
}
</script>

<style>
  a {
    text-decoration: none;
  }
  #toolbar {
    background-color: #8dcff4
  }
  #bottom {
    background-color: #8dcff4;
    color: black
  }
  .v-dialog {
    background-color: white;
  }
    .flex {
    max-width: fit-content !important;
    flex-basis: auto;
  }
  .application {
  background: #f5f6fa !important;
}
.v-dialog {
  max-width: max-content;
}
.gradient {
  background: linear-gradient(to top right, #f7971e 5%, #ffd200 100%);
}
</style>