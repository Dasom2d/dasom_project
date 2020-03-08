<template>
    <div id="storeDetailApp">
        <div class="wrap" v-if="isDetailShow">
            <div class="info">
                <div class="title"> {{store.place_name}}
                    <div class="edit" title="편집" @click="editStore()" v-if="type==='view'"></div>
                    <div class="save" title="저장" @click="saveStore()" v-if="type==='edit'"></div>
                    <div class="close" title="닫기" @click="close()"></div>
                </div>
                <div class="body">
                    <!-- <div class="desc">
                                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                            </div> -->
                    <table class="w3-table-all w3-margin-top" id="myTable">
                        <tbody>
                            <tr>
                                <th>주소</th>
                                <td>{{store.road_address_name}}</td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>{{store.phone}}</td>
                            </tr>
                            <tr>
                                <th>카테고리</th>
                                <td>{{store.category_name}}</td>
                            </tr>
                            <tr>
                                <th>추천메뉴</th>
                                <td v-if="type==='view'">불러올거야</td>
                                <em v-if="type==='edit'"><input v-model="menu"></em>
                            </tr>
                            <tr>
                                <th>한줄평</th>
                                <td v-if="type==='view'">불러올거야</td>
                                <em v-if="type==='edit'"><input v-model="comment"></em>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "@/js/eventBus";
export default {
    name: 'storeDetailInfo',
    props: ['store', 'isDetailShow'],
    components: {},
    methods: {
        close() {
            this.$emit('close-detail');
        },
        editStore() {
            this.type = 'edit';
        },
        saveStore() {
            this.type = 'view';
            console.log(this.store.store_id);
            // this.store.store_id == undefined ? insert : update
        }
    },
    data() {
        return {
            type: 'view',
            menu: '',
            comment: '',
            emptyStarArr: new Array(5).fill(true),
            fullStarArr: new Array(5).fill(false),
            category: []
        }
    }
}
</script>

<style lang="css">
#storeDetailApp {
    position: fixed;
    z-index: 101;
    top: 146px;
    left: 400px;
}

.wrap {
    padding: 0;
    margin: 0;
}

#storeDetailApp .wrap .info {
    width: 286px;
    height: 500px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
}

.wrap .info:nth-child(1) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}

.info .title {
    padding: 5px 0 0 10px;
    height: 30px;
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
}

#storeDetailApp .info .edit {
    position: absolute;
    top: 6px;
    right: 44px;
    color: #888;
    height: 24px;
    width: 24px;
    cursor: pointer;
    background-image: url('../../assets/icon/edit.png')
}

#storeDetailApp .info .save {
    position: absolute;
    top: 6px;
    right: 44px;
    color: #888;
    height: 24px;
    width: 24px;
    cursor: pointer;
    background-image: url('../../assets/icon/save.png')
}

#storeDetailApp .info .close {
    position: absolute;
    top: 6px;
    right: 10px;
    color: #888;
    height: 24px;
    width: 24px;
    background-image: url('../../assets/icon/close.png')
}

.info .close:hover {
    cursor: pointer;
}

.info .body {
    position: relative;
    overflow: hidden;
}

#storeDetailApp .info .desc {
    position: relative;
    margin: 13px 0 0 0px;
    height: 75px;
}

.desc .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.desc .jibun {
    font-size: 11px;
    color: #888;
    margin-top: -2px;
}

.info .img {
    position: absolute;
    top: 6px;
    left: 5px;
    width: 73px;
    height: 71px;
    border: 1px solid #ddd;
    color: #888;
    overflow: hidden;
}

.info:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABH0lEQVR4nO3aQQ6DIBQE0EmTHslzsOrpPEJXXk+btBt+0hi1aOErzLyErZ9BaRUAREREREREZJcOQB9bx1a/AzACeMc2AgiO9cNCfddB6L+Kew/CPLy1/sjFbvn6hTuAJ8oOQog17gVrJJlPAY8nYe3OnzIFUjqUcxA8a12uY5cNb0p28PLhTYmOVhPe5OxwdeFNjo5XG978E6D68OZIkGbCmz2BmgtvUoI1G95sBXzF1mx4szUIzYc3qYPQZHgTsP7I25RwDZ9zPUB+oJ4C1D+C1H+D1C9C1K/C1B9D1J/D1Asi1Eti1Iui1Mvi1Bsj1Ftj9JujS+cDPO7G1iCcfj5gAvAAMGS85twQa0wFayShPyIDkB+SEhERERERqdoHEwTXdJJTrPQAAAAASUVORK5CYII=');
}

.info .link {
    color: #5085BB;
}

table.w3-table-all {
    margin: 20px 0;
}

.w3-margin-top {
    margin-top: 16px !important;
}

.w3-table-all {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    display: table;
}

.w3-table th:first-child,
.w3-table td:first-child,
.w3-table-all th:first-child,
.w3-table-all td:first-child {
    padding-left: 16px;
}

.w3-table td,
.w3-table th,
.w3-table-all td,
.w3-table-all th {
    padding: 8px 8px;
    display: table-cell;
    text-align: left;
    vertical-align: top;
    width: 0px;
}

.empty_star {
    position: absolute;
    color: #888;
    height: 24px;
    width: 24px;
    background-image: url('../../assets/icon/empty_star.png');
    background-repeat: no-repeat;
}
</style>
