<template>
    <div id="storeDetailApp">
        <div class="wrap" v-if="isDetailShow">
            <div class="info">
                <div class="title"> {{store.place_name}}
                    <div class="close" title="닫기" @click="close()"></div>
                </div>
                <div class="body">
                    <!-- <div class="desc">
                                        <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                                    </div> -->
                    <table class="w3-table-all w3-margin-top tableRow">
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
                        </tbody>
                    </table>
                </div>
                <div class="body">
                    <table class="w3-table-all w3-margin-top tableRow">
                        <tbody>
                            <tr>
                                <th>한줄평</th>
                            </tr>
                            <tr v-for="(spNote, idx) in store.special_note">
                                <td>{{spNote.note}}</td>
                                <td class="plus" v-if="!isOnelineEdit && idx===store.special_note.length-1" @click="isOnelineEdit = true"></td>
                            </tr>
                            <tr v-if="isOnelineEdit">
                                <th></th>
                                <td><input v-model="specialNote"></td>
                                <td class="check" @click="saveStoreSpecialNotes"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="body">
                    <table class="menuPhoto">
                        <tbody>
                            <tr>
                                <th style="padding-bottom: 5px;">메뉴</th>
                            </tr>
                            <tr v-for="menuInfo in store.menu">
                                <td>{{menuInfo.menu_name}}</td>
                                <td>{{menuInfo.price}}원</td>
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
import { apiData } from '@/components/mixins/commonApi';
import { common } from '@/components/mixins/common';

export default {
    mixins: [apiData, common],
    name: 'storeDetailInfo',
    props: ['store', 'isDetailShow', 'type'],
    components: {},
    methods: {
        close() {
            this.$emit('close-detail');
        },
        saveStore() {
            if (this.type === 'register') {
                // 최초 가게 등록

            }
        },
        saveStoreSpecialNotes() {
            if (this.isNull(this.specialNote)) {
                alert('입력해줭');
                return;
            }
            this.saveStore();
            this.isOnelineEdit = false;

            let url = '/api/storeInfo/insertSpecialNote';

            let params = {
                storeId: this.store.store_id,
                note: this.specialNote
            };

            this.postApiData(url, params).then((that) => {
                if (that.returnData.protocol41) {
                    console.log('성공');
                    this.getStoreSpecialNotes();
                }
            });
        },
        getStoreSpecialNotes() {
            let url = '/api/storeInfo/getStoreSpecialNoteInfo';

            let params = {
                storeId: this.store.store_id
            };
            this.getApiData(url, params).then((that) => {
                this.$set(this.store, 'special_note', that.returnData);
                this.$forceUpdate();
            });
        },
    },
    data() {
        return {
            menu: '',
            specialNote: '',
            isOnelineEdit: false,
            emptyStarArr: new Array(5).fill(true),
            fullStarArr: new Array(5).fill(false),
            category: [],
        }
    }
}
</script>

<style lang="css">
#storeDetailApp {
    position: fixed;
    z-index: 101;
    top: 146px;
    left: 55px;
}

.wrap {
    padding: 0;
    margin: 0;
}

#storeDetailApp .wrap .info {
    width: 486px;
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

#storeDetailApp .menuPhoto {
    width: 200px;
    padding: 7px;
    margin-bottom: 4px;
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

#storeDetailApp .info .plus {
    position: relative;
    color: #888;
    height: 24px;
    width: 24px;
    background-image: url('../../assets/icon/plus.png');
    background-repeat: no-repeat;
    cursor: pointer
}

#storeDetailApp .info .check {
    position: relative;
    color: #888;
    height: 24px;
    width: 24px;
    background-image: url('../../assets/icon/check.png');
    background-repeat: no-repeat;
    cursor: pointer
}

.info .close:hover {
    cursor: pointer;
}

.info .body {
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
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
    margin: 5px 0;
}

.w3-margin-top {
    margin-top: 10px !important;
}

.w3-table-all {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    display: table;
}

.w3-table th .w3-table td,
.w3-table-all,
.w3-table-all td {
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
