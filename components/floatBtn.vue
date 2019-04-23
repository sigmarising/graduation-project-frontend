<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" :width="width">
      <template v-slot:activator="{ on }">
        <v-btn color="blue-grey darken-3" dark fixed bottom right fab v-on="on">
          <v-icon>{{ btnIcon }}</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ dialogTitle }}
        </v-card-title>
        <v-card-text>
          {{ dialogContent }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">
            {{ dialogBtn }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 500
    },
    btnIcon: {
      type: String,
      default: 'check'
    },
    dialogTitle: {
      type: String,
      default: 'Privacy Policy'
    },
    dialogContent: {
      type: String,
      default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    dialogBtn: {
      type: String,
      default: 'GOT IT'
    }
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>
