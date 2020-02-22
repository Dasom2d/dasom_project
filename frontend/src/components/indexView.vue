<template>
    <div id="indexApp">
        <headerApp></headerApp>
        <mapApp></mapApp>
    </div>
</template>

<script>
import headerApp from '@/components/header/header.vue';
import mapApp from '@/components/map/map.vue';
export default {
    name: 'Index',
    components: {
        headerApp,
        mapApp
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js A1p2p3'
        }
    }
}
</script>
