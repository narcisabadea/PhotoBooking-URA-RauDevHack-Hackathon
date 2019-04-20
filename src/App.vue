<template>
  <v-app>
    <!-- continut ce se afiseaza pe toate paginile, indiferent de continut (valabil doar in fisierul App.vue) -->
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span class="text-uppercase">rau</span>
        <span class="font-weight-light">DevHack</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <!-- continutul paginii  -->
    <v-content>
      <!-- componenta se va modifica de fiecare data cand se intra pe alta ruta din 'router' -->
       <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import Home from './components/Home'
import * as firebase from "firebase";
export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      // example:
      // dialogLogIn: false
    }
  },
// functii ce se apeleaza de fiecare data cand o valoare din interior se modifica. Numele functiei se poate utiliza si pe post de variabila daca aceasta 'return'-eaza
  computed: {
    // example:
    // userDetails () {
    //   return this.$store.getters.userDetails
    // }
  },
// functii ce se apeleaza la cerere
  methods: {
    // example: dispatch => cuvant cheie pentru apelarea unei functii din 'store (actions)' ce pot trimite ca parametru date
    // login () {
    //   this.$store.dispatch('login', {username: this.email, password: this.password})
    //   this.dialogLogIn = false
    // }
  },
// LIFECYCLE: functie ce se apeleaza inainte de construirea DOM-ului
  created() {
    this.$store.dispatch('readUsers')
    this.$store.dispatch('readPhotographers')
    this.$store.dispatch('readPortofolios')
    this.$store.dispatch('readBookings')
    // this.$store.dispatch('getUserDetails')
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
