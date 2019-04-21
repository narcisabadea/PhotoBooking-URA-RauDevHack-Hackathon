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
          <td class="text-xs-left">{{ props.item.userId }}</td>
          <td class="text-xs-left">{{ props.item.nameUniversity }}</td>
          <td class="text-xs-left">
            <a v-on:click="(universityId = props.item.id) && (detailsDialog = true) && uploadDetails()">Vezi detalii</a>
          </td>
          <td v-bind:class="{'red--text': props.item.status === 'pending', 
                             'green--text': props.item.status === 'approved', 
                             'orange--text': props.item.status === 'declined'
                            }">{{ props.item.status}}</td>
          <td v-if="props.item.status === 'pending'">
            <v-btn flat small color="green" @click="aprove(props.item.id)">
              Aproba cerere
            </v-btn>
            <v-btn flat small color="orange" @click="decline(props.item.id)">
              Respinge cerere
            </v-btn>
          </td>
          <td></td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
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
      // console.log(detalii)
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
      this.$store.dispatch('approveRequest', {
        idRezervare: value,
        idClient: this.$store.getters.rezervari[value].idClient,
        details: {
          nameUniversity: this.$store.getters.requests[value].nameUniversity,
          descriptionUniversity: this.$store.getters.requests[value].descriptionUniversity,
          websiteUniversity: this.$store.getters.requests[value].websiteUniversity,
          locationUniversity: this.$store.getters.requests[value].locationUniversity,
          photosUniversity: this.$store.getters.requests[value].photosUniversity,
          logoUniversity: this.$store.getters.requests[value].logoUniversity,
          typeUniversity: this.$store.getters.requests[value].typeUniversity,
          facilitiesUniversity: this.$store.getters.requests[value].facilitiesUniversity,
          nameFaculty: this.$store.getters.requests[value].nameFaculty,
          descriptionFaculty: this.$store.getters.requests[value].descriptionFaculty,
          logoFaculty: this.$store.getters.requests[value].logoFaculty,
          typeFaculty: this.$store.getters.requests[value].typeFaculty,
          contact: this.$store.getters.requests[value].contact,
          email: this.$store.getters.requests[value].email,
          adress: this.$store.getters.requests[value].adress,
          phone: this.$store.getters.requests[value].phone
        }
      })
    },
    decline (value) {
      this.id = value
      this.declineDialog = true
    },
    declineSend () {
      this.declineDialog = false
      this.$store.dispatch('declineRequest', {id: this.id, text: this.declineText})
    },
    uploadDetails () {
      var indexes
      this.requests.forEach(request => {
        var keys = Object.keys(this.$store.getters.requests)
        if (request.id === this.universityId) {
          indexes = keys.indexOf(request.id)
        }
      })
      return this.requests[indexes]
    }
  }
}
</script>