<template>
    <div class="user-admin">
        <b-table hover striped :items="users" :fields="fields"></b-table>
    </div>
</template>

<script>
import {baseApiUrl} from '@/global'
import axios from 'axios'
export default {
    name:'userAdmin',
    data: function(){
        return{
            mode: 'save',
            user:{},
            users:[],
            fields: [
                {key: 'id',label:'Codigo',sortable:true},
                {key: 'name',label:'Nome',sortable:true},
                {key: 'email',label:'Email',sortable:true},
                {key: 'admin', label:'Administrador',sortable:true,
                    formatter:value => value?'sim' : 'Não'},
                 {key: 'acoes',label:'ações'},

            ]
        }
    },
    methods:{
       loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        }
    },
    mounted(){
        this.loadUsers()
    }  

}
</script>

<style >

</style>