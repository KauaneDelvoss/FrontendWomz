<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="50vw">
      <v-card class="card-container">
        <v-card-title class="h3">Adicionar Gênero</v-card-title>

        <div class="form margin-left-page margin-right-page mt-10">
          <v-text-field
            dense
            dark
            color="#E8E5AE"
            v-model="genre.name_genre"
            label="Nome"
          ></v-text-field>
          <v-textarea
            outlined
            name="input-7-4"
            label="Descrição"
            v-model="genre.description"
            dark
            color="#E8E5AE"
          ></v-textarea>
        </div>
        <v-card-text style="height: 300px" class="mt-5"> </v-card-text>
        <v-divider class="divider"></v-divider>
        <v-card-actions>
          <v-btn class="button" text @click="($emit('closeDialog'), genre={})">
            CANCELAR
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="button" text @click="($emit('addGenre'), addGenre(), genre={})">
            ADICIONAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {
      genre: {},
    };
  },

  methods:{
    addGenre(){
        this.$axios.post("post/addGenre", JSON.stringify(this.genre)).then(response =>
        console.log(response))
    }
  }
};
</script>

<style scoped lang="scss">
.card-container {
  background-color: $bg-color !important;
}

.divider {
  border-color: $primary-color !important;
}

.button {
  color: $primary-color !important;
}
</style>