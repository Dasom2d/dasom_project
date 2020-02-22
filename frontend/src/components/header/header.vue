<template>
    <div class="headerApp">
        <div class="header" style="height: 55px;">
            <input id="searchBox" v-model="searchWord">
            <button style="cursor: pointer;" @click=goSearch()>조회</button>
            <searchList ref="search"></searchList>
        </div>
    </div>
</template>

<script>
import searchList from '@/components/search/searchList';
import eventBus from "@/js/eventBus";

export default {
    components: {
        searchList
    },
    methods: {
        goSearch() {
          this.showSearchList = true;
          this.$refs.search.getSearchWord(this.searchWord);
        }
    },
    data() {
        return {
            searchWord: '',
            showSearchList: false
        }
    }
}
</script>
