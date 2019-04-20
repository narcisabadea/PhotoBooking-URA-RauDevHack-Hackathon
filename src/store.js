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
    rezervari: 'pending'
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
  },
   
    // example: payload => data that come from actions
    //   setUserDetails(state, payload) {
    //     state.userDetails = payload
    //   }
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
          console.log(users[0])
        commit('setUsersDetails',  users)
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
      firebase.database().ref('rezervari').on('value', snapshot => {
        commit('setBookingsDetails', snapshot.val())
      })
    },
    readRequests ({commit}) {
      commit('setRequests', [])
      var altArray = []
      var bookingsDetails = {}
      return firebase.database().ref('rezervari')
        .onSnapshot(snapshot => {
          snapshot.forEach(obj => {
            bookingsDetails[obj.id] = {
              dataStart: obj.data().dataStart,
              dataEnd: obj.data().dataEnd,
              status: obj.data().status,
              userId: obj.data().userId
            }
          })
          altArray['rezervari'] = bookingsDetails
          commit('setRequests', bookingsDetails)
        })
      },
      approveRequest (payload) {
        firebase.database().ref('rezervari/' + payload.itemId).update({
          status: 'approved'
        })
      }
  },
// helps you get data from this document wherever you need it
  getters: {
    //   example: 
    usersDetails: state => state.usersDetails,
    photographersDetails: state => state.photographersDetails,
    portofoliosDetails: state => state.portofoliosDetails,
    bookingsDetails: state => state.bookingsDetails,
    rezervari: state => state.rezervari,
  }
})