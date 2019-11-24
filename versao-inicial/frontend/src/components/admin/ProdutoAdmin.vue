<template>
  <div class="produto-admin">
    <b-form>
      <input id="produto-idProduto" type="hidden" v-model="produto.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="produto-nameProduto">
            <b-form-input
              id="produto-nameProduto"
              type="text"
              v-model="produto.nameProduto"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome do Produto.."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Descrição:" label-for="produto-desc">
            <b-form-input
              id="produto-desc"
              type="text"
              v-model="produto.desc"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a Descrição do Produto.."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Preço:" label-for="produto-preco">
            <b-form-input
              id="produto-preco"
              type="text"
              name="numbers"
              pattern="[0-9]+$"
              v-model="produto.preco"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o preço..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Tipo de Gola:" label-for="produto-tipoGola">
            <b-form-select id="produto-tipoGola" v-model="produto.tipoGola">
              <option>Gola Redonda</option>
              <option>V</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Tipo de Manga:" label-for="produto-tipoManga">
            <b-form-select id="produto-tipoManga" v-model="produto.tipoManga">
              <option>Curta</option>
              <option>Longa</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Tamanho:" label-for="produto-tamanho">
            <b-form-select id="produto-tamanho" v-model="produto.tamanho">
              <option>P</option>
              <option>M</option>
              <option>G</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Times:" label-for="produto-idTime">
            <b-form-select id="produto-idTime" :options="times" v-model="produto.idTime" />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group
            v-if="mode === 'save'"
            label="Tipo Produto:"
            label-for="produto-idTipoProduto"
          >
            <b-form-select
              id="produto-idTipoProduto"
              :options="tiposProdutos"
              v-model="produto.idTipoProduto"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Marca:" label-for="produto-idMarca">
            <b-form-select id="produto-idMarca" :options="marcas" v-model="produto.idMarca" />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Imagem:" label-for="produto-imagem" label-cols-sm="2" label-size="sm">
            <b-form-file id="produto-imagem" v-model="produto.imagem" size="sm"></b-form-file>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
       <b-button variant="primary" v-if="mode === 'save'" @click="converter">Converter</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>

      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="produtos" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadProduto(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadProduto(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
var fs = require("fs");
export default {
  name: "produtoAdmin",
  data: function() {
    return {
      mode: "save",
      produto: {},
      produtos: [],
      times: [],
      tiposProdutos: [],
      marcas: [],
      fields: [
        { key: "idProduto", label: "Id", sortable: true },
        { key: "nameProduto", label: "Nome", sortable: true },
        { key: "preco", label: "Preço", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },

  methods: {
    loadProdutos() {
      const url = `${baseApiUrl}/produto`;
      axios.get(url).then(res => {
        this.produtos = res.data;
      });
    },
    loadProduto(produto, mode = "save") {
      this.mode = mode;
      this.produto = { ...produto };
    },
    remove() {
      const idProduto = this.produto.idProduto;
      axios
        .delete(`${baseApiUrl}/produto/${idProduto}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = "save";
      this.produto = {};
      this.loadProdutos();
    },
    save() {
      const method = this.produto.idProduto ? "put" : "post";
      const idProduto = this.produto.idProduto
        ? `/${this.produto.idProduto}`
        : "";
      axios[method](`${baseApiUrl}/produto${idProduto}`, this.produto)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadTime() {
      const url = `${baseApiUrl}/time`;
      axios.get(url).then(res => {
        this.times = res.data.map(time => {
          return { value: time.idTime, text: time.nameTime };
        });
      });
    },
    loadTipoProduto() {
      const url = `${baseApiUrl}/tiposprodutos`;
      axios.get(url).then(res => {
        this.tiposProdutos = res.data.map(tipo => {
          return { value: tipo.id, text: tipo.name };
        });
      });
    },
    loadMarca() {
      const url = `${baseApiUrl}/marcas`;
      axios.get(url).then(res => {
        this.marcas = res.data.map(marca => {
          return { value: marca.id, text: marca.name };
        });
      });
    },
    
    converter() {
        const fs = require('fs')
        const caminho = __dirname + 'versao-inicial\frontend\src\assets\acg.jpg'
        const conteudo = fs.readFileSync(caminho,'base64')
        console.log(conteudo)
    }
  },
  mounted() {
    this.loadProdutos();
    this.loadTime();
    this.loadTipoProduto();
    this.loadMarca();
  }
};
</script>


<style >
</style>
