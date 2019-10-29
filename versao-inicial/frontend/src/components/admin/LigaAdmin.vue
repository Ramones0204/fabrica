<template>
  <div class="liga-admin">
    <b-form>
      <input id="liga-id" type="hidden" v-model="liga.ligaId" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="liga-name">
            <b-form-input
              id="liga-name"
              type="text"
              v-model="liga.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome da Liga..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <b-table hover striped :items="ligas" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadLiga(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadLiga(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
export default {
  name: "ligaAdmin",
  data: function() {
    return {
      mode: "save",
      liga: {},
      ligas: [],
      fields: [
        { key: "ligaId", label: "Id", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadLigas() {
      const url = `${baseApiUrl}/ligas`;
      axios.get(url).then(res => {
        this.ligas = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.liga = {};
      this.loadLigas();
    },
    save() {
      const method = this.liga.ligaId ? "put" : "post";
      const ligaId = this.liga.ligaId ? `/${this.liga.ligaId}` : "";
      axios[method](`${baseApiUrl}/ligas${ligaId}`, this.liga)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const ligaId = this.liga.ligaId;
      axios
        .delete(`${baseApiUrl}/ligas/${ligaId }`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadLiga(liga, mode = "save") {
      this.mode = mode;
      this.liga = { ...liga };
    }
  },
  mounted() {
    this.loadLigas();
  }
};
</script>

<style >
</style>