<template>
  <div class="add-book my-10">
    <div class="h3 mt-10 margin-left-page">Adicionar livro</div>
    <div class="form margin-left-page margin-right-page mt-10">
      <v-text-field
        dense
        style="width: 70%"
        dark
        color="#E8E5AE"
        v-model="book.name_book"
        label="Título"
      ></v-text-field>
      <v-textarea
        outlined
        name="input-7-4"
        label="Sinopse"
        v-model="book.resume"
        dark
        color="#E8E5AE"
        style="width: 70%"
      ></v-textarea>
      <div class="d-flex flex-row" style="max-width: 50%">
        <v-text-field
          dark
          color="#E8E5AE"
          v-model="book.pages"
          label="Páginas"
          class="me-5"
        ></v-text-field>
        <v-text-field
          dark
          color="#E8E5AE"
          v-model="book.price"
          label="Preço"
        ></v-text-field>
      </div>
      <v-text-field
        style="width: 70%"
        dark
        color="#E8E5AE"
        v-model="book.link"
        label="Link"
      ></v-text-field>
      <v-file-input
        dark
        style="width: 70%"
        accept="image/*"
        label="Capa"
        color="#E8E5AE"
        v-model="capa"
      ></v-file-input>

      <div class="d-flex flex-row" style="max-width: 50%">
        <v-autocomplete
          v-model="book.author"
          :items="authors"
          item-text="name_author"
          item-value="id"
          outlined
          dense
          chips
          small-chips
          label="Autores"
          multiple
          color="#E8E5AE"
          dark
        ></v-autocomplete>
        <v-icon class="v-icon-item ms-5" @click="openAuthors = true">mdi-plus</v-icon>
      </div>
      <div class="d-flex flex-row align-center" style="max-width: 50%">
        <v-autocomplete
          v-model="book.genre"
          :items="genres"
          item-text="name_genre"
          item-value="cod_genre"
          outlined
          dense
          chips
          small-chips
          label="Gênero"
          multiple
          color="#E8E5AE"
          dark
        ></v-autocomplete>
        <v-icon class="v-icon-item ms-5" @click="openGenres = true">mdi-plus</v-icon>
      </div>
    </div>
    <button
      class="btnWormz margin-left-page"
      type="button"
      @click="createBook()"
    >
      ADICIONAR LIVRO
    </button>

    <OpenAuthors @closeDialog="openAuthors = false" @addAuthor="getAuthors(), openAuthors=false" :dialog="openAuthors"/>
    <OpenGenres @closeDialog="openGenres = false" @addAuthor="getGenres(), openGenres=false" :dialog="openGenres"/>
  </div>
</template>

<script>
import OpenGenres from "~/components/admin/OpenGenres"
import OpenAuthors from "~/components/admin/OpenAuthors"

export default {
  middleware: "admin",
  layout: "admin",
  components: { OpenAuthors, OpenGenres },
  data() {
    return {
      book: {},
      authors: {},
      genres: {},
      capa: "",
      openAuthors: false,
      openGenres: false
    };
  },
  mounted() {
    this.getAuthors();
    this.getGenres();
  },
  methods: {
    async getAuthors() {
      const authors = await this.$axios.$get("get/authors");
      console.log(authors);
      this.authors = authors;
    },
    async getGenres() {
      const genres = await this.$axios.$get("get/genres");
      console.log(genres);
      this.genres = genres;
    },
    async createBook() {
      const formData = new FormData();
      formData.append("file", this.capa);

      const { data } = await this.$axios.post("/api/media/images/", formData, {
        "Content-Type": "multipart/form-data",
      });

      this.book.capa = data.attachment_key;
      console.log(this.book);
      this.$axios
        .post("post/addBook", JSON.stringify(this.book))
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>