import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
// store data here to use anywhere
  state: {
    // example:
    // userDetails: null
  },
// helps you modify 'state' data
  mutations: {
    // example: payload => data that come from actions
    //   setUserDetails(state, payload) {
    //     state.userDetails = payload
    //   }
  },
// functions that are called in other components in order to modify data from state
  actions: {
    //   example: {commit} => sends data to 'functionName' from mutations in order to modify data in state and send as 2nd parammeter the value
    //   getUserDetails({ commit }) {
    //     commit('setUserDetails', JSON.parse(localStorage.getItem('details')))
    //   }
  },
// helps you get data from this document wherever you need it
  getters: {
    //   example: 
    //   userDetails: state => state.userDetails
  }
})