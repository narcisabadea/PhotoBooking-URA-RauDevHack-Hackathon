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
    bookingsDetails: null
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
    }
    // example: payload => data that come from actions
    //   setUserDetails(state, payload) {
    //     state.userDetails = payload
    //   }
  },
// functions that are called in other components in order to modify data from state
  actions: {
    readUsers({commit}) {
      firebase.database().ref('clienti').on('value', snapshot => {
        commit('setUsersDetails', snapshot.val())
      })
    },
    readPhotographers({commit}) {
      firebase.database().ref('fotografi').on('value', snapshot => {
        commit('setPhotographersDetails', snapshot.val())
      })
    },
    readPortofolios({commit}) {
      firebase.database().ref('portofoliu').on('value', snapshot => {
        commit('setPortofoliosDetails', snapshot.val())
      })
    },
    readBookings({commit}) {
      firebase.database().ref('booking').on('value', snapshot => {
        commit('setBookingsDetails', snapshot.val())
      })
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
    bookingsDetails: state => state.bookingsDetails
  }
})