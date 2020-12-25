<template>
  <v-container fluid grid-list-xl>
    <v-layout align-center justify-space-around row>
      <v-data-table
        :headers="headers"
        :items="getBookingsForPhoto"
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
          <td class="text-xs-left">{{ props.item.idClient }}</td>
          <td class="text-xs-left">{{ props.item.dataStart }}</td>
          <td class="text-xs-left">{{ props.item.dataEnd }}</td>
          <td v-bind:class="{'red--text': props.item.status === 'pending', 
                             'green--text': props.item.status === 'approved', 
                             'orange--text': props.item.status === 'declined'
                            }">{{ props.item.status}}</td>
          <td v-if="props.item.status === 'pending'">
            <v-btn text small color="green" @click="aprove(props.item.idCerere)">
              Aproba cerere
            </v-btn>
            <v-btn text small color="orange" @click="decline(props.item.idCerere)">
              Respinge cerere
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
    data () {
    return {
      send: false,
      status: [],
      statuses: [
        {
          text: 'Aprobate', value: 'approved'
        },
        {
          text: 'Anulate', value: 'declined'
        },
        {
          text: 'In asteptare', value: 'pending'
        }
      ],
      items: [],
      id: null,
      headers: [
        {
          text: 'Client', align: 'left', value: 'user'
        },
        {
          text: 'Perioada solicitata', value: 'university'
        },
        {
          text: 'status', value: 'statuses'
        },
        {
          text: '', value: 'actions'
        }
      ],
      indexes: null,
      data: []
    }
  },
  computed: {
    bookingDetails() {
      return this.$store.getters.bookingsDetails
    },
    user() {
      return this.$store.getters.user
    },
    getBookingsForPhoto() {
      let detalii = []
      this.bookingDetails.forEach(element => {
        if (element.idFotograf === this.user.id) {
          detalii.push(element)
        }
      });
      return detalii
    }
  },
  methods: {
    getPhotographersData() {
      let x = []
      this.$store.getters.photographersDetails.filter(item => { 
        this.getBookingsForPhoto.forEach(photographer => {
          if (photographer.idFotograf === item.idFotograf) {
            x.push(item)
          }
        })
      })
      this.data = x
    },
    aprove (value) {
      firebase.database().ref('rezervari/'+ value).update({
        status: 'approved'
      })
    },
    decline (value) {
      firebase.database().ref('rezervari/'+ value).update({
        status: 'declined'
      })
    }
  }
}
</script>