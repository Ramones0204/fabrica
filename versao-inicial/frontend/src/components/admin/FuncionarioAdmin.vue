<template>
  <div class="funcionario-admin">
    <input id="funcionario-id" type="hidden" v-model="funcionario.matricula" />
    <b-row>
      <b-col md="6" sm="12">
        <b-form-group label="Nome:" label-for="funcionario-nameFuncionario">
          <b-form-input
            id="nameFuncionario"
            type="text"
            v-model="funcionario.nameFuncionario"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o Nome do Funcionario..."
          />
        </b-form-group>
      </b-col>
      <b-col md="6" sm="12">
        <b-form-group label="CPF:" label-for="funcionario-cpf">
          <b-form-input
            id="funcionario-cpf"
            type="text"
            v-model="funcionario.cpf"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o cpf..."
          />
        </b-form-group>
      </b-col>
      <b-col md="6" sm="12">
        <b-form-group label="Email:" label-for="funcionario-email">
          <b-form-input
            id="funcionario-email"
            type="text"
            v-model="funcionario.email"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o Email..."
          />
        </b-form-group>
      </b-col>
      <b-col md="6" sm="12">
        <b-form-group label="Sexo:" label-for="funcionario-sexo">
          <b-form-input
            id="funcionario-sexo"
            type="text"
            v-model="funcionario.sexo"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o Sexo..."
          />
        </b-form-group>
      </b-col>
      <b-col md="6" sm="12">
        <b-form-group label="Telefone:" label-for="funcionario-telefone">
          <b-form-input
            id="funcionario-telefone"
            type="text"
            v-model="funcionario.telefone"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o Telefone..."
          />
        </b-form-group>
      </b-col>
      <b-col md="6" sm="12">
        <b-form-group label="Celular:" label-for="funcionario-celular">
          <b-form-input
            id="funcionario-celular"
            type="text"
            v-model="funcionario.celular"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o celular..."
          />
        </b-form-group>
      </b-col>

      <b-col md="6" sm="12" v-show="mode === 'save'">
        <b-form-group label="Senha:" label-for="funcionario-senha">
          <b-form-input
            id="funcionario-senha"
            type="password"
            v-model="funcionario.senha"
            required
            placeholder="Informe a Senha do Funcionario..."
          />
        </b-form-group>
      </b-col>
      <b-col md="6" sm="12">
        <b-form-group label="Confirmação de Senha:" label-for="funcionario-confirmar-senha">
          <b-form-input
            id="funcionario-confirmar-senha"
            type="password"
            v-model="funcionario.confirmarSenha"
            required
            placeholder="Confirme a Senha do Funcionario..."
          />
        </b-form-group>
      </b-col>
        <b-col md="6" sm="12">
        <b-form-group label="Data de Nascimento:" label-for="funcionario-dataNascimento">
          <b-form-input
            id="funcionario-dataNascimento"
            type="text"
            v-model="funcionario.dataNascimento"
            required
            placeholder="Confirme a Data de Nascimento..."
          />
        </b-form-group>
      </b-col>
      <b-col md="6" sm="12">
           <b-form-group v-if="mode === 'save'" 
                label="Cargos:" label-for="funcionario-cargoId">
                <b-form-select id="funcionario-cargoId"
                    :options="cargos" v-model="funcionario.cargoId" />
            </b-form-group>
      </b-col>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-row>
    <hr />
    <b-table hover striped :items="funcionarios" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadFuncionario(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadFuncionario(data.item, 'remove')">
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
  name: "funcionarioAdmin",
  data: function() {
    return {
      mode: "save",
      funcionario: {},
      funcionarios: [],
      cargos:[],
      fields: [
        { key: "matricula", label: "Matrícula", sortable: true },
        { key: "nameFuncionario", label: "Nome", sortable: true },
        { key: "name", label: "Cargo", sortable: true },
        { key: "actions", label: "Ações" }
      ]
     
     
    };
  },
  methods: {
    loadFuncionarios() {
      const url = `${baseApiUrl}/funcionario`;
      axios.get(url).then(res => {
        this.funcionarios = res.data;
        // this.funcionarios = res.data.map(cargos=>{
        //  return{...cargos,value:cargos.id,text:cargos.name}
        //  })
      });
    },
    reset() {
      this.mode = "save";
      this.funcionario = {};
      this.loadFuncionarios();
    },
     save() {
      const method = this.funcionario.matricula ? "put" : "post";
      const matricula = this.funcionario.matricula ? `/${this.funcionario.matricula}` : "";
      axios[method](`${baseApiUrl}/funcionario${matricula}`, this.funcionario)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const matricula = this.funcionario.matricula;
      axios
        .delete(`${baseApiUrl}/funcionario/${matricula}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadFuncionario(funcionario, mode = "save") {
      this.mode = mode;
      this.funcionario = { ...funcionario };
    },
    loadCargos(){
      const url = `${baseApiUrl}/cargos`
      axios.get(url).then(res =>{
          this.cargos = res.data.map(cargo=>{
            return {value: cargo.id,text:cargo.name}
          })
      })
    }
  },
  mounted() {
   this.loadFuncionarios();
    this.loadCargos();
    
  }
  
};


</script>

<style >
</style>