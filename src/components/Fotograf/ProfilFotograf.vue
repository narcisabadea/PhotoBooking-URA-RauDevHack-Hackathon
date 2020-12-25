<template>
  <v-container>
    <v-layout align-center justify-space-around row fill-height>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-text-field
              prepend-icon="account_circle"
              name="nume"
              label="Nume"
              id="nume"
              :v-model = "name"
              :value = "thisUserDetails.nume"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              prepend-icon="account_circle"
              name="prenume"
              label="Prenume"
              id="prenume"
              :value = "thisUserDetails.prenume"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-text-field
              prepend-icon="account_circle"
              name="telefon"
              label="Telefon"
              id="telefon"
              :value = "thisUserDetails.telefon"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-autocomplete
              prepend-icon="account_circle"
              name="sex"
              id="sex"
              label="Sex"
              :value = "thisUserDetails.sex"
              :disabled="disabledDetails"
              :items="gender"
            ></v-autocomplete>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="thisUserDetails.dataNastere"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              :disabled="disabledDetails"
            >
              <v-text-field
                slot="activator"
                v-model="thisUserDetails.dataNastere"
                label="Data nasterii"
                prepend-icon="event"
                :value = "thisUserDetails.dataNastere"
                id="birthday"
                readonly
                :disabled="disabledDetails"
              ></v-text-field>
              <v-date-picker v-model="birthday" @input="$refs.menu.save(birthday)"></v-date-picker>
            </v-menu>
            <v-layout align-center justify-space-around row fill-height>
              <div v-if="changeDetails === false" @click="(changeDetails = true) && (disabledDetails = false)">
                <v-tooltip bottom>
                  <v-icon text slot="activator" dark color="primary">edit</v-icon>
                  <span>Editeaza detaliile</span>
                </v-tooltip>
              </div>

              <div v-if="changeDetails === true" @click="saveDetails()">
              <v-tooltip bottom>
                <v-icon text slot="activator" dark color="primary">check_circle</v-icon>
                <span>Salveaza detaliile</span>
              </v-tooltip>
              </div>

              <v-tooltip bottom>
                <v-icon @click="dialogEmail = true" text slot="activator" dark color="primary">email</v-icon>
                <span>Schimba adresa de email</span>
              </v-tooltip>

              <v-tooltip bottom>
                <v-icon @click="dialog = true" text slot="activator" dark color="primary">lock</v-icon>
                <span>Schimba parola</span>
              </v-tooltip>

              <v-btn text color="primary" router to = "/home">Inapoi</v-btn>
            </v-layout>

            <v-dialog v-model="dialogEmail" width="400">
              <v-card>
                <v-card-title class="headline grey lighten-2">
                  Schimba adresa de email
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    prepend-icon="email"
                    name="oldEmail"
                    id="oldEmail"
                    :value = "thisUserDetails.email"
                    :disabled="disabledDetails"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="email"
                    v-model="email2"
                    label="Adresa noua de email">
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="updateEmail()"
                  >
                    Salveaza
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
            <v-dialog v-model="dialog" width="400">
              <v-card>
                <v-card-title class="headline grey lighten-2">
                  Schimba parola
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password4"
                    :rules="[comparePasswordsActual]"
                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    label="Parola actuala">
                      Parola
                  </v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password2"
                    id="pass"
                    :append-icon="show2 ? 'visibility_off' : 'visibility'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    label="Parola noua">
                      Parola
                  </v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="passwordConfirm"
                    :append-icon="show2 ? 'visibility_off' : 'visibility'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    :rules="[comparePasswords]"
                    label="Repeta parola">
                    Repeta parola
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="updatePassword()"
                  >
                    Salveaza
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable */
import firebase from "firebase";
  export default {
    name: 'Profile',
    data () {
      return {
        birthday: null,
        menu: false,
        loading: false,
        disabledDetails: true,
        changeDetails: false,
        name: '',
        dialog: false,
        dialogEmail: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        email2: '',
        oldEmail: '',
        password2: '',
        password3: '',
        password4: '',
        passwordConfirm: '',
        univType: ['Stat', 'Privat'],
        gender: ['F', 'M'],
        numeUniv: '',
        nameUniversity: '',
        descriptionUniv: '',
        siteUniv: '',
        locationUniv: '',
        photosUniv: '',
        logoUniv: '',
        typeUniv: '',
        facilitiesUniv: '',
        numeFac: '',
        descriptionFac: '',
        logoFac: '',
        typeFac: '',
        downloadURL: '',
        sendEmail: false
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      usersDetails () {
        return this.$store.getters.photographersDetails
      },
      thisUserDetails () {
        let detalii = null
        this.usersDetails.forEach(element => {
          if (element.idFotograf === this.user.id) {
            detalii = element
          }
        });
        return detalii
      },
      comparePasswords () {
        return this.password2 !== this.passwordConfirm ? 'Parolele nu coincid' : false
      },
      comparePasswordsActual () {
        return this.password4 !== this.thisUserDetails.parola ? 'Parola actuala este incorecta' : false
      }
    },
    methods: {
      saveDetails () {
        var name = document.getElementById('nume').value
        var surname = document.getElementById('prenume').value
        var birthday = document.getElementById('birthday').value
        var phone = document.getElementById('telefon').value
        var sex = document.getElementById('sex').value
        this.disabledDetails = true
        this.changeDetails = false
        firebase.database().ref('fotografi/'+ this.user.id).update({
          nume: name,
          prenume: surname,
          dataNastere: birthday,
          sex: sex,
          telefon: phone
        })
      },
      updateEmail () {
        firebase.database().ref('fotografi/'+ this.user.id).update({
          email: this.email2
        })
      },
      updatePassword () {
        this.dialog = true
        if (this.thisUserDetails.parola === this.password4) {
          firebase.database().ref('fotografi/' + this.user.id).update({
            parola: this.password2
          })
        } else {
          this.sendPsw = true
        }
      }
    } 
  }
</script>

<style>
  #centru {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
</style>
