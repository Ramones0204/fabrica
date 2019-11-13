
<template>
    <aside class="menu" ></aside>
</template>



<script>
import {mapState} from 'vuex'
export default {
    name:'Menu',
    computed:mapState(['isMenuVisible'])
}
</script>


<style >
    .menu{
        grid-area: menu;
        background: linear-gradient(#eeffff);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

</style>