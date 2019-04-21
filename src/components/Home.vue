<template>
  <v-container grid-list-xl align-content-center>
      <v-layout align-center row wrap v-bind="binding">
        <v-flex xs12 d-flex>
          <v-chip color="orange" text-color="white">
            <v-icon left>star</v-icon>
                <h3>Prezentare</h3>
            <v-icon right>star</v-icon>
        </v-chip>
        </v-flex>
        <v-flex>
          <h2>
            <p>Alegerea unui fotograf reprezinta o provocare pentru multi, datorita numarului foarte mare de persoane ce pot presta astfel de servicii.
            Aplicatia PhotoPreferencesMapper (PPM) are ca rol simplificarea acestui proces, prin alegerea celor mai potriviti artisti, in functie de criteriile de selectie ale clientului.
            </p>
          </h2>
        </v-flex>
        <v-flex>
          <v-chip color="orange" text-color="white">
           <h3> Despre noi </h3>
          </v-chip>
        </v-flex>
        <v-flex>
          <h2>
            <p>Echipa samURAi</p>
            </h2>
        </v-flex>
            <v-container fluid grid-list-xl align-content-center>
              <v-layout align-items-center>
                <v-flex xs6 sm4>
                  <v-img src="https://avatars0.githubusercontent.com/u/28501996" width="150px" height="200px"></v-img>
                  <strong><p>Gheorghe Madalina Eleonora</p></strong>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 sm4>
                  <v-img src="https://avatars3.githubusercontent.com/u/36141252" width="150px" height="200px"></v-img>
                  <strong><p>Stalinescu Adrian</p></strong>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 sm4>
                  <v-img src="https://avatars3.githubusercontent.com/u/16782460" width="150px" height="200px"></v-img>
                  <strong><p>Jora Stefan Danut</p></strong>
                </v-flex>
              </v-layout>
            </v-container>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      //
    }),
    computed:{
    binding () {
      const binding = {}

      if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

      return binding
    }
  }
  }
</script>

<style>

</style>
