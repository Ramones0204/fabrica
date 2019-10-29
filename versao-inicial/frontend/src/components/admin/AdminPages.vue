<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                   
                   
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                     <b-tab title="Cargos">
                        <CargoAdmin />
                    </b-tab>
                    <b-tab title="Ligas">
                        <LigaAdmin />
                    </b-tab>
                     <b-tab title="Marcas">
                        <MarcaAdmin />
                    </b-tab>
                    <b-tab title="Tipo Produto">
                        <TipoProdutoAdmin />
                    </b-tab>
                     <b-tab title="Cupom Desconto">
                        <CupomAdmin />
                    </b-tab>
                     <b-tab title="Time">
                        <TimeAdmin />
                    </b-tab>
                     <b-tab title="Funcionarios">
                        <FuncionarioAdmin />
                    </b-tab>
                      <b-tab title="Produtos">
                        <ProdutoAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import UserAdmin from './UserAdmin'
import CategoryAdmin from './CategoryAdmin'
import CargoAdmin from './CargoAdmin'
import LigaAdmin from './LigaAdmin'
import MarcaAdmin from './MarcaAdmin'
import TipoProdutoAdmin from './TipoProdutoAdmin'
import CupomAdmin from './CupomAdmin'
import TimeAdmin from './TimeAdmin'
import FuncionarioAdmin from './FuncionarioAdmin'
import ProdutoAdmin from './ProdutoAdmin'

export default {
    name:'AdminPages',
    components:{PageTitle,CategoryAdmin,ArticleAdmin,UserAdmin,CargoAdmin,LigaAdmin,MarcaAdmin,TipoProdutoAdmin,CupomAdmin,TimeAdmin,FuncionarioAdmin,ProdutoAdmin}
}
</script>

<style >

</style>