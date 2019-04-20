<template>
  <v-container>
    <v-layout align-center justify-space-around row fill-height>
      <v-flex xs8>
        <v-card>
          <v-card-text>
            <v-text-field
              prepend-icon="account_circle"
              name="nume"
              label="Nume"
              id="nume"
              :v-model = "name"
              :value = "usersDetails[0].nume"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field
              prepend-icon="account_circle"
              name="prenume"
              label="Prenume"
              id="prenume"
              :value = "usersDetails[0].prenume"
              :disabled="disabledDetails"
            ></v-text-field>
            <v-autocomplete
              prepend-icon="account_circle"
              name="sex"
              id="sex"
              label="Sex"
              :value = "usersDetails[0].sex"
              :disabled="disabledDetails"
              :items="gender"
            ></v-autocomplete>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="usersDetails[0].dataNastere"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              :disabled="disabledDetails"
            >
              <v-text-field
                slot="activator"
                v-model="usersDetails[0].dataNastere"
                label="Data nasterii"
                prepend-icon="event"
                :value = "usersDetails[0].dataNastere"
                id="birthday"
                readonly
                :disabled="disabledDetails"
              ></v-text-field>
              <v-date-picker v-model="birthday" @input="$refs.menu.save(birthday)"></v-date-picker>
            </v-menu>
            <v-layout align-center justify-space-around row fill-height>
              <div v-if="changeDetails === false" @click="(changeDetails = true) && (disabledDetails = false)">
                <v-tooltip bottom>
                  <v-icon flat slot="activator" dark color="primary">edit</v-icon>
                  <span>Editeaza detaliile</span>
                </v-tooltip>
              </div>

              <div v-if="changeDetails === true" @click="saveDetails()">
              <v-tooltip bottom>
                <v-icon flat slot="activator" dark color="primary">check_circle</v-icon>
                <span>Salveaza detaliile</span>
              </v-tooltip>
              </div>

              <v-tooltip bottom>
                <v-icon @click="dialogEmail = true" flat slot="activator" dark color="primary">email</v-icon>
                <span>Schimba adresa de email</span>
              </v-tooltip>

              <v-tooltip bottom>
                <v-icon @click="dialog = true" flat slot="activator" dark color="primary">lock</v-icon>
                <span>Schimba parola</span>
              </v-tooltip>

              <v-btn flat color="primary" router to = "/home">Inapoi</v-btn>
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
                    :value = "usersDetails[0].email"
                    :disabled="disabledDetails"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="email"
                    v-model="email2"
                    label="Adresa noua de email">
                  </v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password3"
                    :append-icon="show3 ? 'visibility_off' : 'visibility'"
                    :type="show3 ? 'text' : 'password'"
                    @click:append="show3 = !show3"
                    label="Introduceti parola">
                      Parola
                  </v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    flat
                    @click="updateEmail()"
                  >
                    Salveaza
                  </v-btn>
                  <v-card v-if="sendEmail === true">
                    <v-alert
                      :value="true"
                      type="success"
                    >
                      Adresa de email a fost salvata cu succes, va rugam sa va logati din nou.
                    </v-alert>
                    <v-btn
                      color="primary"
                      flat
                      @click="relogEmail()"
                    >
                      Ok
                    </v-btn>
                  </v-card>
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
                    :append-icon="show4 ? 'visibility_off' : 'visibility'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show4 = !show4"
                    label="Parola actuala">
                      Parola
                  </v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-model="password2"
                    id="pass"
                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
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
                    flat
                    @click="updatePassword()"
                  >
                    Salveaza
                  </v-btn>
                  <v-card v-if="sendPsw === true">
                    <v-alert
                      :value="true"
                      type="success"
                    >
                    Parola a fost schimbata cu succes, va rugam sa va logati din nou.
                    </v-alert>
                    <v-btn
                      color="primary"
                      flat
                      @click="relogPsw()"
                    >
                      Ok
                    </v-btn>
                  </v-card>
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
        sendEmail: false,
        sendPsw: false
      }
    },
    computed: {
      usersDetails () {
        return this.$store.getters.usersDetails
      },
      comparePasswords () {
        return this.password2 !== this.passwordConfirm ? 'Parolele nu coincid' : ''
      }
    },
  }
</script>

<style>
  #centru {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
</style>
