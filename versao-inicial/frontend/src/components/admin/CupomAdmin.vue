<template>
  <div class="cupom-admin">
    <b-form>
      <input id="cupom-id" type="hidden" v-model="cupom.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="cupom-name">
            <b-form-input
              id="cupom-name"
              type="text"
              v-model="cupom.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome da Cupom..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Valor:" label-for="cupom-valor">
            <b-form-input
              id="cupom-valor"
              type="text"
              name="numbers"
              pattern="[0-9]+$"
              v-model="cupom.valor"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Valor da Cupom..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <b-table hover striped :items="cupons" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadCupom(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCupom(data.item, 'remove')">
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
  name: "cupomAdmin",
  data: function() {
    return {
      mode: "save",
      cupom: {},
      cupons: [],
      fields: [
        { key: "id", label: "Id", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "valor", label: "Valor", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadCupons() {
      const url = `${baseApiUrl}/cupomdesconto`;
      axios.get(url).then(res => {
        this.cupons = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.cupom = {};
      this.loadCupons();
    },
    save() {
      const method = this.cupom.id ? "put" : "post";
      const id = this.cupom.id ? `/${this.cupom.id}` : "";
      axios[method](`${baseApiUrl}/cupomdesconto${id}`, this.cupom)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.cupom.id;
      axios
        .delete(`${baseApiUrl}/cupomdesconto/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCupom(cupom, mode = "save") {
      this.mode = mode;
      this.cupom = { ...cupom };
    }
  },
  mounted() {
    this.loadCupons();
  }
};
</script>

<style >
</style>