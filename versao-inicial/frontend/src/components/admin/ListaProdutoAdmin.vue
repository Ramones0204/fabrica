<template>
  <div>
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
        <p class="card-text">
                {{produto.preco}}
          </p>
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
    }
  },
  mounted() {
    this.loadProdutos();
  }
};
</script>

<style >
</style>