<template>
  
  <div  class="carrinho-admin">
    <b-card-group columns>
      
      <b-card
        v-for="produto in produtos"
        :key="produto.idProduto"
        v-bind:title="produto.nameProduto"
        img-alt="Img"
        v-bind:img-src="'data:image/jpeg;base64,'+produto.imagem"
        tag="article"
        style="max-width: 100em;"
        class="mb-2"
      >
        <p class="card-text">{{produto.preco}}</p>
        <b-row>
          <b-col lg="4" class="pb-2">
            <b-button variant="success">Comprar</b-button>
          </b-col>
          <b-col lg="4" class="pb-2">
            <b-button variant="success" @click="save">Adicionar ao Carrinho</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "produtoAdmin",
  data: function() {
    return {
      produto: {},
      produtos: []
    };
  },

  methods: {
    loadProdutos() {
      const url = `${baseApiUrl}/produto`;
      axios.get(url).then(res => {
        this.produtos = res.data;
      });
    },
    save() {
     // const method = this.carrinho.id_carrinho ? "put" : "post";
     // const id_carrinho = this.carrinho.id_carrinho ? `/${this.carrinho.id_carrinho}` : "";
      axios[method](`${baseApiUrl}/carrinho`, this.carrinho)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
  },
  mounted() {
    this.loadProdutos();
  }
};
</script>

<style >
</style>