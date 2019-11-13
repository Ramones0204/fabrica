<template>

<div class="pedido-admin">
    <b-table hover striped :items="pedidos" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadPedidos(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
      
      </template>
    </b-table>
</div>


</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
export default {
  name: "pedidoadmin",
  data: function() {
    return {
      mode: "save",
      pedido: {},
      pedidos: [],
      
      fields: [
        { key: "num_pedido", label: "Numero Pedido", sortable: true },
        { key: "name_cliente", label: "Nome Cliente", sortable: true },
       
      ]
    };
  },
  methods:{
      loadPedidos() {
      const url = `${baseApiUrl}/pedido`;
      axios.get(url).then(res => {
        this.pedidos = res.data;
      });
    },
    mounted(){
        this.loadPedidos()
    }  
  }
}
</script>

<style >
</style>