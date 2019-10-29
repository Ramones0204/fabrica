<template>
  <div class="time-admin">
    <b-form>
      <input id="time-idTime" type="hidden" v-model="time.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="time-nameTime">
            <b-form-input
              id="time-nameTime"
              type="text"
              v-model="time.nameTime"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome do Time.."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Estado:" label-for="time-estado">
            <b-form-select id="time-estado" v-model="time.estado">
              <option>AC</option>
              <option>AL</option>
              <option>AP</option>
              <option>AM</option>
              <option>BA</option>
              <option>CE</option>
              <option>DF</option>
              <option>ES</option>
              <option>GO</option>
              <option>MA</option>
              <option>MT</option>
              <option>MS</option>
              <option>MG</option>
              <option>PA</option>
              <option>PB</option>
              <option>PE</option>
              <option>PI</option>
              <option>RJ</option>
              <option>RN</option>
              <option>RS</option>
              <option>RO</option>
              <option>RR</option>
              <option>SC</option>
              <option>SP</option>
              <option>SE</option>
              <option>TO</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Região:" label-for="time-regiao">
            <b-form-select id="time-regiao" v-model="time.regiao">
              <option>Norte</option>
              <option>Nordeste</option>
              <option>Centro-Oeste</option>
              <option>Sudeste</option>
              <option>Sul</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Pais:" label-for="time-pais">
            <b-form-input
              id="time-pais"
              type="text"
              v-model="time.pais"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Pais do Time.."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Tipo do Time:" label-for="time-tipoTime">
            <b-form-select id="time-tipoTime" v-model="time.tipoTime">
              <option>Nacional</option>
              <option>Seleção</option>
              <option>Internacional</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group v-if="mode === 'save'" label="Ligas:" label-for="time-ligaId">
            <b-form-select id="time-ligaId" :options="ligas" v-model="time.ligaId" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="times" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadTime(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadTime(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
export default {
  name: "timeAdmin",
  data: function() {
    return {
      mode: "save",
      time: {},
      times: [],
      ligas: [],
      fields: [
        { key: "idTime", label: "Id", sortable: true },
        { key: "nameTime", label: "Nome", sortable: true },
        { key: "regiao", label: "Região", sortable: true },
        { key: "estado", label: "Estado", sortable: true },
        { key: "pais", label: "Pais", sortable: true },
        { key: "tipoTime", label: "Tipo Time", sortable: true },
        { key: "ligaId", label: "Liga Id", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadTimes() {
      const url = `${baseApiUrl}/time`;
      axios.get(url).then(res => {
        this.times = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.time = {};
      this.loadTimes();
      
    },
    save() {
      const method = this.time.idTime ? "put" : "post";
      const idTime = this.time.idTime ? `/${this.time.idTime}` : "";
      axios[method](`${baseApiUrl}/time${idTime}`, this.time)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
       // .catch(showError);
    },
    remove() {
      const idTime = this.time.idTime;
      axios
        .delete(`${baseApiUrl}/time/${idTime}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadTime(time, mode = "save") {
      this.mode = mode;
      this.time = { ...time };
    },
    loadLigas() {
      const url = `${baseApiUrl}/ligas`;
      axios.get(url).then(res => {
        this.ligas = res.data.map(liga => {
          return { value: liga.ligaId, text: liga.name };
        });
      });
    }
  },
  mounted() {
    this.loadTimes();
    this.loadLigas();
  }
};
</script>

<style >
</style>