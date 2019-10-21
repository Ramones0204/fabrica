<template>
    <div class="marca-admin">
         <b-form>
              <input id="marca-id" type="hidden" v-model="marca.id" />
                <b-row>
                     <b-col md="6" sm="12">
                         <b-form-group label="Nome:" label-for="marca-name">
                        <b-form-input id="marca-name" type="text"
                            v-model="marca.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome da Marca..." />
                         </b-form-group>
                     </b-col>
                 </b-row>
               <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
               <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
               <b-button class="ml-2" @click="reset">Cancelar</b-button>
         </b-form>
        <b-table hover striped :items="marcas" :fields="fields">
               <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadMarca(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadMarca(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>   
        </b-table>
    </div>
</template>

<script>
import {baseApiUrl,showError} from '@/global'
import axios from 'axios'
export default {
    name:'MarcaAdmin',
    data: function(){
        return{
            mode: 'save',
            marca:{},
            marcas:[],
            fields: [
                {key: 'id',label:'Id',sortable:true},
                {key: 'name',label:'Nome',sortable:true},
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods:{
       loadMarcas() {
            const url = `${baseApiUrl}/marcas`
            axios.get(url).then(res => {
                this.marcas = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.marca = {}
            this.loadMarcas()
        },
        
        save() {
            const method = this.marca.id ? 'put' : 'post'
            const id = this.marca.id ? `/${this.marca.id}` : ''
            axios[method](`${baseApiUrl}/marcas${id}`, this.marca)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.marca.id
            axios.delete(`${baseApiUrl}/marcas/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadMarca(marca,mode = 'save'){
            this.mode = mode
            this.marca = {...marca}
        }
    },
    mounted(){
        this.loadMarcas()
    }  

}
</script>

<style >

</style>