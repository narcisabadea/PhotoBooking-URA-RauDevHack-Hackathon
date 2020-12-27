<template>
  <div fill-height>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Choose a category to start
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Select up to 3 favourites
          <small v-if="e1 > 1">{{ count }} left</small>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          See your favourites photographers
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="icons-list">
            <div
              v-for="tag in availableTags"
              :key="tag"
              class="icons"
              v-bind:class="{
                selectedIcon: tag === selectedTag,
                unselectedIcon: tag != selectedTag,
              }"
              @click="selectedTag = tag"
            >
            <i :class="tag.icon"></i>

<!-- 
              <v-icon
                x-large
                v-bind:class="{
                  selectedIcon: tag === selectedTag,
                  unselectedIcon: tag != selectedTag,
                }"
                >{{ tag.icon }}</v-icon -->
              
              {{ tag.name }}
            </div>
          </div>

          <div class="button-continue">
            <v-btn @click="e1 = 2" :disabled="!selectedTag">
              Continue
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-layout wrap justify-center>
            <v-flex
              xs3
              v-for="(data, index) in filteredItems"
              :key="index"
              @click="addPhotographerId(data.fotograf, data.denumire)"
            >
              <v-img
                :aspect-ratio="1"
                v-bind:class="{ selected: verifyIfSelected(data.denumire) }"
                :src="data.denumire"
                cover
                class="images"
              />
            </v-flex>
          </v-layout>
          <div class="button-continue">
            <v-btn @click="e1 = 3" :disabled="count !== 0">
              See results
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          We recommend you:
          <v-data-table
            :headers="headers"
            :items="selectedPhotographers"
            item-key="name"
            class="elevation-1"
          >
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
              <td class="text-xs-left">
                {{ props.item.nume }} {{ props.item.prenume }}
              </td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.telefon }}</td>
              <td class="text-xs-left">
                <v-btn
                  text
                  small
                  class="primary"
                  v-if="cereriTrimise.indexOf(props.item.idFotograf) === -1"
                  @click="verificaUser(props.item.idFotograf)"
                >
                  Contacteaza fotograful
                </v-btn>
              </td>
              <td></td>
            </template>
          </v-data-table>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog v-model="dialogTime" class="dialog">
      <v-container fluid grid-list-xl>
        <v-layout align-center justify-space-around row>
          <v-flex xs12 md4>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon x-large color="indigo darken-1">add_circle</v-icon>
              </v-card-text>
              <v-card-text>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="dataStart"
                  transition="scale-transition"
                  offset-y
                  required
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="dataStart"
                    readonly
                    label="Data start"
                  ></v-text-field>
                  <v-date-picker v-model="dataStart" no-title scrollable>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(dataStart)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="menu1"
                  :close-on-content-click="false"
                  v-model="menu1"
                  :nudge-right="40"
                  :return-value.sync="dataFinal"
                  transition="scale-transition"
                  offset-y
                  required
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="dataFinal"
                    readonly
                    label="Data final"
                  ></v-text-field>
                  <v-date-picker v-model="dataFinal" no-title scrollable>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(dataFinal)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  @click="trimiteCerere()"
                  color="white--text"
                  class="gradient"
                >
                  Trimite cerere
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase";
import rules from "@/components/formRules";
export default {
  data() {
    return {
      dataStart: null,
      dataFinal: null,
      e1: 1,
      selectedTag: null,
      menu: false,
      menu1: false,
      availableTags: [
        {
          name: "Wedding",
          icon: "x",
        },
        {
          name: "Showers",
          icon: "fas fa-baby",
        },
        {
          name: "Events",
          icon: "groups",
        },
        {
          name: "Products",
          icon: "x",
        },
        {
          name: "Locations",
          icon: "x",
        },
      ],
      count: 3,
      photographers: [],
      showResult: false,
      selectedPhotographers: [],
      headers: [
        {
          text: "Nume",
          align: "left",
          value: "user",
        },
        {
          text: "Email",
          value: "university",
        },
        {
          text: "Telefon",
          value: "details",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      formSignIn: {
        email: "",
        password: "",
        switch: false,
      },
      id: null,
      cereriTrimise: [],
      errorLogin: null,
      dialogTime: false,
      show: false,
    };
  },
  computed: {
    dataPortofolio() {
      return this.$store.getters.arrayPortofolios;
    },
    filteredItems() {
      return this.dataPortofolio.filter((item) => {
        if (this.selectedTag === "") {
          return true;
        } else {
          return item.tag === this.selectedTag;
        }
      });
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
  },
  created() {
    this.rules = rules;
  },
  methods: {
    verificaUser(idFotograf) {
      this.dialogTime = true;
      this.id = idFotograf;
    },
    trimiteCerere() {
      firebase
        .database()
        .ref("rezervari/")
        .push({
          dataInregistrare: new Date(),
          dataStart: this.dataStart,
          dataEnd: this.dataFinal,
          idClient: this.user.id,
          idFotograf: this.id,
          status: "pending",
          idCerere: true,
        })
        .then((snap) => {
          firebase
            .database()
            .ref("rezervari/" + snap.key)
            .update({
              idCerere: snap.key,
            });
          this.dialogTime = false;
          this.cereriTrimise.push(this.id);
        });
    },
    verifyIfSelected(denumire) {
      return this.photographers.map((e) => e.denumire).indexOf(denumire) !== -1;
    },
    addPhotographerId(idFotograf, denumire) {
      if (this.count === 0) {
        this.showResult = true;
        this.getPhotographersData();
      } else {
        this.photographers.push({ idFotograf, denumire });
        this.count = this.count - 1;
        if (this.count === 0) {
          this.getPhotographersData();
        }
      }
    },
    getPhotographersData() {
      let x = [];
      this.$store.getters.photographersDetails.filter((item) => {
        this.photographers.forEach((photographer) => {
          if (photographer.idFotograf === item.idFotograf) {
            x.push(item);
          }
        });
      });
      this.selectedPhotographers = x.filter((obj, pos, arr) => {
        return (
          arr
            .map((mapObj) => mapObj["idFotograf"])
            .indexOf(obj["idFotograf"]) === pos
        );
      });
    },
  },
};
</script>

<style>
.unselectedIcon {
  color: var(--blue-grotto) !important;
}
.icons:hover {
  color: var(--yellow) !important;
}
.icons {
  display: flex;
  cursor:pointer;
  flex-flow: column;
  margin: 10px;
}
.selectedIcon {
  color: var(--yellow) !important;
}
.selected {
  border: 5px solid var(--yellow);
}
.images {
  border-radius: var(--border-radius);
  margin: 5px;
  cursor: pointer;
  box-shadow: var(--box-shadow);
}
.button-continue {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.v-stepper {
  box-shadow: none !important;
  background: var(--white) !important;
}
.v-data-table {
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin: 10px;
}
.icons-list {
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
}
</style>
