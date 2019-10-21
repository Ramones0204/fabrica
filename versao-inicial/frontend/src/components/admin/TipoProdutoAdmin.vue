<template>
  <div class="tipoproduto-admin">
    <b-form>
      <input id="tipoproduto-id" type="hidden" v-model="tipoProduto.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="tipoproduto-name">
            <b-form-input
              id="tipoproduto-name"
              type="text"
              v-model="tipoProduto.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome do tipo produto..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>

    <b-table hover striped :items="tipoProdutos" :fields="fields">
         <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadTipoProduto(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadTipoProduto(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl,showError } from "@/global";
import axios from "axios";
export default {
  name: "tipoprodutoAdmin",
  data: function() {
    return {
      mode: "save",
      tipoProduto: {},
      tipoProdutos: [],
      fields: [
        { key: "id", label: "Id", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "actions", label: "Ações" }

      ]
    };
  },
  methods: {
    loadTiposProdutos() {
      const url = `${baseApiUrl}/tiposprodutos`;
      axios.get(url).then(res => {
        this.tipoProdutos = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.tipoProduto = {};
      this.loadTiposProdutos();
    },
    save() {
      const method = this.tipoProduto.id ? "put" : "post";
      const id = this.tipoProduto.id ? `/${this.tipoProduto.id}` : "";
      axios[method](`${baseApiUrl}/tiposprodutos${id}`, this.tipoProduto)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.tipoProduto.id;
      axios
        .delete(`${baseApiUrl}/tiposprodutos/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadTipoProduto(tipoProduto, mode = "save") {
      this.mode = mode;
      this.tipoProduto = { ...tipoProduto };
    }
  },
  mounted() {
    this.loadTiposProdutos();
  }
};
</script>

<style >
</style>