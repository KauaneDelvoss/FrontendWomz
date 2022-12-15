<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="50vw">
      <v-card class="card-container">
        <v-card-title class="h3">Adicionar Autor</v-card-title>

        <div class="form margin-left-page margin-right-page mt-10">
          <v-text-field
            dense
            dark
            color="#E8E5AE"
            v-model="author.name_author"
            label="Nome"
          ></v-text-field>
          <v-textarea
            outlined
            name="input-7-4"
            label="Biografia"
            v-model="author.author_biography"
            dark
            color="#E8E5AE"
          ></v-textarea>
        </div>
        <v-card-text style="height: 300px" class="mt-5"> </v-card-text>
        <v-divider class="divider"></v-divider>
        <v-card-actions>
          <v-btn class="button" text @click="($emit('closeDialog'), author={})">
            CANCELAR
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="button" text @click="($emit('addAuthor'), addAuthor(), author={})">
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
      author: {},
    };
  },

  methods:{
    addAuthor(){
        this.$axios.post("post/addAuthor", JSON.stringify(this.author)).then(response =>
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