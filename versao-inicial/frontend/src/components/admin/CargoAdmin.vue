<template>
  <div class="cargo-admin">
    <b-form>
      <input id="cargo-id" type="hidden" v-model="cargo.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="cargo-name">
            <b-form-input
              id="cargo-name"
              type="text"
              v-model="cargo.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome do Cargo..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Salario:" label-for="cargo-salary">
            <b-form-input
              id="cargo-salary"
              type="text"
              v-model="cargo.salary"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o valor do salario..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <b-table hover striped :items="cargos" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadCargo(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCargo(data.item, 'remove')">
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
  name: "cargoAdmin",
  data: function() {
    return {
      mode: "save",
      cargo: {},
      cargos: [],
      fields: [
        { key: "id", label: "Codigo", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "salary", label: "Salario", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadCargos() {
      const url = `${baseApiUrl}/cargos`;
      axios.get(url).then(res => {
        this.cargos = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.cargo = {};
      this.loadCargos();
    },
    save() {
      const method = this.cargo.id ? "put" : "post";
      const id = this.cargo.id ? `/${this.cargo.id}` : "";
      axios[method](`${baseApiUrl}/cargos${id}`, this.cargo )
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.cargo.id;
      axios
        .delete(`${baseApiUrl}/cargos/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCargo(cargo, mode = "save") {
      this.mode = mode;
      this.cargo = { ...cargo };
    }
  },
  mounted() {
    this.loadCargos();
  }
};
</script>

<style >
</style>