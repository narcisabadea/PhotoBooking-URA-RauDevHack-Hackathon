/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase";
// import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
// store data here to use anywhere
  state: {
    // example:
    usersDetails: null,
    photographersDetails: null,
    portofoliosDetails: null,
    bookingsDetails: null,
    user: null
  },
// helps you modify 'state' data
  mutations: {
    setUsersDetails(state, payload) {
      state.usersDetails = payload
    },
    setPhotographersDetails(state, payload) {
      state.photographersDetails = payload
    },
    setPortofoliosDetails(state, payload) {
      state.portofoliosDetails = payload
    },
    setBookingsDetails(state, payload) {
      state.bookingsDetails = payload
    },
    setUser(state, payload) {
      state.user = payload
    }
    // example: payload => data that come from actions
    //   setUserDetails(state, payload) {
    //     state.userDetails = payload
    //   }
  },
// functions that are called in other components in order to modify data from state
  actions: {
    readUsers({commit}) {
      firebase.database().ref('clienti/').on('value', snap => {
        const keys = Object.keys(snap.val())
        let myObj = snap.val()
        let users = []
        keys.forEach(key => {
          users.push(myObj[key])
        }
          )
        commit('setUsersDetails',  users)
      })
    },
    readPhotographers({commit}) {
      firebase.database().ref('fotografi/').on('value', snap => {
        const keys = Object.keys(snap.val())
        let myObj = snap.val()
        let photographers = []
        keys.forEach(key => {
          photographers.push(myObj[key])
        }
          )
        commit('setPhotographersDetails', photographers)
      })
    },
    readPortofolios({commit}) {
      firebase.database().ref('portofoliu/').on('value', snap => {
        const keys = Object.keys(snap.val())
        let myObj = snap.val()
        let portofolios = []
        keys.forEach(key => {
          portofolios.push(myObj[key])
        }
          )
        commit('setPortofoliosDetails', portofolios)
      })
    },
    readBookings({commit}) {
      firebase.database().ref('rezervari/').on('value', snap => {
        const keys = Object.keys(snap.val())
        let myObj = snap.val()
        let bookings = []
        keys.forEach(key => {
          bookings.push(myObj[key])
        }
          )
        commit('setBookingsDetails', bookings)
      })
    },
    loginUser({commit}, payload) {
      commit('setUser', {type: payload.type, id: payload.id})
      let user = {
        type: payload.type, 
        id: payload.id
      }
      localStorage.setItem('user', JSON.stringify(user))
    },
    verifyUserLogged ({commit}) {
      if (localStorage.getItem('user')) {
        commit('setUser', {type: JSON.parse(localStorage.getItem('user')).type, id: JSON.parse(localStorage.getItem('user')).id})
      }
    }
    //   example: {commit} => sends data to 'functionName' from mutations in order to modify data in state and send as 2nd parammeter the value
    //   getUserDetails({ commit }) {
    //     commit('setUserDetails', JSON.parse(localStorage.getItem('details')))
    //   }
  },
// helps you get data from this document wherever you need it
  getters: {
    //   example: 
    usersDetails: state => state.usersDetails,
    photographersDetails: state => state.photographersDetails,
    portofoliosDetails: state => state.portofoliosDetails,
    bookingsDetails: state => state.bookingsDetails,
    user: state => state.user
  }
})