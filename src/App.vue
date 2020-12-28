<template>
  <v-app>
    <!-- continut ce se afiseaza pe toate paginile, indiferent de continut (valabil doar in fisierul App.vue) -->
    <v-app-bar app>
      <div class="headline">
        <router-link :to="'/Home'">
          <div class="white--text">
            <span class="text-uppercase yellow-text">Photo</span>
            <span class="font-weight-light">Booking</span>
          </div>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        @click="dialogLogIn = !dialogLogIn"
        text
        v-if="!logout"
        class="white--text"
      >
        Login
      </v-btn>
      <v-btn
        @click="dialogSignUp = !dialogSignUp"
        v-if="!logout"
      >
        Sign up
      </v-btn>
      <v-btn router to="/Test" v-if="user">
        Test
      </v-btn>
      <v-menu offset-y v-if="user">
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" v-on="on">
            <div>Cont</div>
          </v-btn>
        </template>

        <v-list>
          <div v-if="user && user.type === 'client'">
            <router-link to="/ProfilClient" style="cursor:pointer">
              <div>Detalii cont</div>
            </router-link>
          </div>
          <div v-if="user && user.type === 'photo'">
            <router-link to="/ProfilFotograf" style="cursor:pointer">
              <div>Detalii cont</div>
            </router-link>
          </div>
          <div v-if="user && user.type === 'client'">
            <router-link to="/CereriTrimise" style="cursor:pointer">
              <div>Cereri trimise</div>
            </router-link>
          </div>
          <div v-if="user && user.type === 'photo'">
            <router-link to="/CereriAcceptDecline" style="cursor:pointer">
              <div>Cereri</div>
            </router-link>
          </div>
        </v-list>
      </v-menu>

      <v-btn @click="signOut()" v-if="logout" text>
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-dialog v-model="dialogLogIn" class="dialog">
      <v-container fluid grid-list-xl>
        <v-layout align-center justify-space-around row>
          <v-flex xs12 md3>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon x-large color="indigo darken-1">account_circle</v-icon>
              </v-card-text>
              <v-card-text>
                <!-- :rules="rules.emailRules" -->
                <v-text-field
                  v-model="formSignIn.email"
                  required
                  label="Adresa de email"
                >
                </v-text-field>
                <v-text-field
                  v-model="formSignIn.password"
                  label="Parola"
                  required
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                >
                </v-text-field>
                <v-switch
                  v-model="formSignIn.switch"
                  :label="formSignIn.switch ? 'Sunt fotograf' : 'Sunt client'"
                ></v-switch>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="indigo darken-1"
                  type="submit"
                  @click="forgotPassword()"
                >
                  Am uitat parola
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  @click="userSign"
                  color="white--text"
                  :disabled="!verifyFormErrorsSignIn"
                >
                  Intra in cont
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-alert :value="true" type="error" v-if="errorLogin !== null">
              {{ errorLogin }}
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>

    <v-dialog v-model="dialogSignUp" class="dialog">
      <v-container fluid grid-list-xl>
        <v-layout align-center justify-space-around row>
          <v-flex xs12 md4>
            <v-card class="elevation-0 transparent" style="width:320px;">
              <v-card-text class="text-xs-center">
                <v-icon x-large color="indigo darken-1">add_circle</v-icon>
              </v-card-text>
              <v-card-text>
                <!-- :rules="rules.nameRules" -->
                <v-text-field v-model="formSignUp.name" required label="Nume">
                  Nume
                  <!-- :rules="rules.nameRules" -->
                </v-text-field>
                <v-text-field
                  v-model="formSignUp.surname"
                  required
                  label="Prenume"
                >
                  Prenume
                </v-text-field>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="formSignUp.birthday"
                  transition="scale-transition"
                  offset-y
                  required
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    v-model="formSignUp.birthday"
                    readonly
                    label="Data nasterii"
                  ></v-text-field>
                  <v-date-picker
                    v-model="formSignUp.birthday"
                    no-title
                    scrollable
                  >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(formSignUp.birthday)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
                <v-select
                  :items="gender"
                  label="Sex"
                  required
                  v-model="formSignUp.sex"
                ></v-select>
                <!-- :rules="rules.emailRules" -->
                <v-text-field
                  v-model="formSignUp.email2"
                  required
                  label="Adresa de email"
                >
                  Email
                </v-text-field>
                <v-text-field
                  v-model="formSignUp.phone"
                  required
                  label="Telefon"
                >
                  Telefon
                </v-text-field>
                <v-switch
                  v-model="formSignUp.switch"
                  :label="
                    formSignUp.switch
                      ? 'Ma inregistrez ca fotograf'
                      : 'Doresc sa caut fotograf'
                  "
                ></v-switch>
                <v-text-field
                  v-model="formSignUp.password2"
                  required
                  :append-icon="show1 ? 'visibility_off' : 'visibility'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  label="Parola"
                >
                  Parola
                </v-text-field>
                <v-text-field
                  v-model="formSignUp.passwordConfirm"
                  required
                  :append-icon="show2 ? 'visibility_off' : 'visibility'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  :rules="[comparePasswords]"
                  label="Repeta parola"
                >
                  Repeta parola
                </v-text-field>
                <v-checkbox
                  label="Accept prelucrarea datelor cu caracter personal"
                  v-model="formSignUp.gdpr"
                  required
                >
                </v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  @click="newAccount()"
                  color="white--text"
                  :disabled="!verifyFormErrorsSignUp"
                >
                  Creeaza cont nou
                </v-btn>
              </v-card-actions>
              <v-alert :value="true" type="error" v-if="errorSignUp !== null">
                {{ errorSignUp }}
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
import rules from "./components/formRules";
import router from "@/router";
import firebase from "firebase";
export default {
  name: "App",
  data() {
    return {
      // example:
      formSignUp: {
        name: "",
        password2: "",
        passwordConfirm: "",
        email2: "",
        surname: "",
        birthday: null,
        phone: null,
        gdpr: false,
        switch: false,
      },
      formSignIn: {
        email: "",
        password: "",
        switch: false,
      },
      userType: null,
      userLogged: false,
      menu: false,
      show: false,
      show1: false,
      show2: false,
      gender: ["F", "M"],
      sex: null,
      dialogLogIn: false,
      dialogSignUp: false,
      errorLogin: null,
      errorSignUp: null,
      rules: null,
      errorLogin: null,
    };
  },
  // functii ce se apeleaza de fiecare data cand o valoare din interior se modifica. Numele functiei se poate utiliza si pe post de variabila daca aceasta 'return'-eaza
  computed: {
    logout() {
      if (!this.user) {
        return false;
      } else if (!this.user.type) {
        return false;
      } else {
        return true;
      }
    },
    user() {
      return this.$store.getters.user;
    },
    verifyFormErrorsSignIn() {
      return (
        this.formSignIn.password.length > 3 &&
        /.+@.+/.test(this.formSignIn.email)
      );
    },
    verifyFormErrorsSignUp() {
      return (
        this.formSignUp.password2.length > 3 &&
        /.+@.+/.test(this.formSignUp.email2) &&
        this.formSignUp.name.length > 3 &&
        this.formSignUp.surname.length > 3 &&
        this.formSignUp.sex !== null &&
        this.formSignUp.birthday !== null &&
        this.formSignUp.password2.length > 3 &&
        this.comparePasswords !== "Parolele nu coincid"
      );
    },
    error() {
      return this.$store.getters.error;
    },
    comparePasswords() {
      return this.formSignUp.password2 !== this.formSignUp.passwordConfirm
        ? "Parolele nu coincid"
        : false;
    },
  },
  // functii ce se apeleaza la cerere
  methods: {
    userSign(email, password) {
      if (this.formSignIn.switch === true) {
        let details = this.$store.getters.photographersDetails;
        details.forEach((element) => {
          if (
            element.email === this.formSignIn.email &&
            element.parola === this.formSignIn.password
          ) {
            this.$store.dispatch("loginUser", {
              type: "photo",
              id: element.idFotograf,
            });
            this.dialogLogIn = false;
          } else {
            this.errorLogin = "Date invalide";
          }
        });
      } else {
        let details = this.$store.getters.usersDetails;
        details.forEach((element) => {
          if (
            element.email === this.formSignIn.email &&
            element.parola === this.formSignIn.password
          ) {
            this.$store.dispatch("loginUser", {
              type: "client",
              id: element.idClient,
            });
            this.dialogLogIn = false;
          } else {
            this.errorLogin = "Date invalide";
          }
        });
      }
    },
    newAccount() {
      if (this.formSignUp.switch === true) {
        firebase
          .database()
          .ref("fotografi/")
          .push({
            dataInregistrare: new Date(),
            nume: this.formSignUp.name,
            parola: this.formSignUp.passwordConfirm,
            email: this.formSignUp.email2,
            prenume: this.formSignUp.surname,
            telefon: this.formSignUp.phone,
            dataNastere: this.formSignUp.birthday,
            sex: this.sex,
            idFotograf: "test",
          })
          .then((ceva) => {
            this.dialogSignUp = false;
            this.dialogLogIn = true;
          })
          .then((snap) => {
            firebase
              .database()
              .ref("fotografi/" + snap.key)
              .update({
                idFotograf: snap.key,
              });
          });
      } else {
        firebase
          .database()
          .ref("clienti/")
          .push({
            dataInregistrare: new Date(),
            nume: this.formSignUp.name,
            parola: this.formSignUp.passwordConfirm,
            email: this.formSignUp.email2,
            prenume: this.formSignUp.surname,
            telefon: this.formSignUp.phone,
            dataNastere: this.formSignUp.birthday,
            sex: this.sex,
            idClient: "test",
          })
          .then((snap) => {
            firebase
              .database()
              .ref("clienti/" + snap.key)
              .update({
                idClient: snap.key,
              });
          });
        this.dialogSignUp = false;
        this.dialogLogIn = true;
      }
    },
    forgotPassword() {
      const adresaEmail = prompt("Introduceti adresa de email", "");
      if (adresaEmail) {
        firebase
          .auth()
          .sendPasswordResetEmail(adresaEmail)
          .then(function() {
            window.alert(
              "Un email de recuperare a parolei a fost trimis pe adresa: " +
                adresaEmail
            );
          })
          .catch((error) => {
            window.alert(error.message);
          });
      }
    },
    signOut() {
      this.$store.dispatch("loginUser", { type: null });
      localStorage.clear();
      router.push("/Home");
    },
  },
  // LIFECYCLE: functie ce se apeleaza inainte de construirea DOM-ului
  created() {
    var altArray = [];
    var bookingsDetails = {};
    this.rules = rules;
    this.$store.dispatch("readUsers");
    this.$store.dispatch("readPhotographers");
    this.$store.dispatch("readPortofolios");
    this.$store.dispatch("readBookings");
    this.$store.dispatch("verifyUserLogged");
    this.$store.dispatch("getArrayOfPortofoloos");
  },
  // LIFECYCLE: functie ce se apeleaza in timpul construirii DOM-ului
  mounted() {},
};
</script>

<style>
:root {
  --yellow: #ffd53d;
  --aquamarine: #40b0df;
  --blue-grotto: #0067b3;
  --blue: #0000a3;
  --white: #f8f9f9;
  --box-shadow: 0 0px 9px 0px lightgrey;;
  --gray-text: rgba(17, 23, 29, 0.6);
  --black-text: #0e1318;
  --border-radius: 8px;
}
.v-application--wrap {
  background-color: var(--white);
  color: var(--black-text);
}
.v-btn {
  background-color: var(--yellow) !important;
  margin: 3px;
}
.v-btn--text {
  background-color: transparent !important;
}
.v-btn--text .v-btn__content {
  color: var(--white) !important;
}
.v-btn .v-btn__content {
  color: var(--blue-grotto);
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: var(--blue-grotto) !important;
}
.v-application a {
  text-decoration: none;
}
.yellow-text {
  color: var(--yellow);
}
.v-btn--disabled {
  background-color: transparent !important;
  cursor: not-allowed !important;
}
</style>
