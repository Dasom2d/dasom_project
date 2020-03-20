<template>
    <div id="storeDetailApp">
        <div class="wrap" v-if="isDetailShow">
            <div class="info">
                <div class="title"> {{store.place_name}}
                    <div class="close" title="닫기" @click="close()"></div>
                </div>
                <div class="body">
                    <div class="btnSpace">
                        <ul>
                            <li class="icon info" @click="view='info'"></li>
                            <li class="icon menu" @click="view='menu'"></li>
                            <li class="icon comment" @click="view='comment'">></li>
                            <li class="icon photo" @click="view='photo'">></li>
                        </ul>
                    </div>
                    <div class="contentSpace">
                        <table v-if="view==='info'">
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
                        <table v-if="view==='menu'">
                            <tbody>
                                <tr>
                                    <th style="padding-bottom: 5px;">메뉴</th>
                                </tr>
                                <tr v-for="(menuInfo, idx) in store.menu">
                                    <td>{{menuInfo.menu_name}}</td>
                                    <td>{{menuInfo.price}}원</td>
                                    <td class="icon plus" v-if="!isMenuEdit && idx===store.menu.length-1" @click="isMenuEdit = true"></td>
                                </tr>
                                <tr v-if="isMenuEdit">
                                    <td><input v-model="menu" placeholder="메뉴입력"><input v-model="price" placeholder="가격입력"></td>
                                    <td class="icon check" @click="saveStoreMenu"></td>
                                </tr>
                                <tr>
                                    <th>특이사항</th>
                                </tr>
                                <tr v-for="(spNote, idx) in store.special_note">
                                    <td>{{spNote.note}}</td>
                                    <td class="icon plus" v-if="!isSpecialNoteEdit && idx===store.special_note.length-1" @click="isSpecialNoteEdit = true"></td>
                                </tr>
                                <tr v-if="isSpecialNoteEdit">
                                    <th></th>
                                    <td><input v-model="specialNote"></td>
                                    <td class="icon check" @click="saveStoreSpecialNotes"></td>
                                </tr>
                            </tbody>
                        </table>
                        <table v-if="view==='comment'">
                            <tr> 
                                <th>한줄평</th>
                            </tr>
                        </table>
                    </div>
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
    filters: {
        dateFormat(date) {
            return this.$moment(date).format('yyyy.MM.dd')
        }
    },
    methods: {
        close() {
            this.$emit('close-detail');
        },
        saveStore() {
            if (this.type === 'register') {
                // 최초 가게 등록

            }
        },
        saveStoreMenu() {
            if (this.isNull(this.ment) && this.isNull(this.price)) {
                alert('입력해줭');
                return;
            }
            this.saveStore();
            this.isMenuEdit = false;

            let url = '/api/storeInfo/insertMenu';

            let params = {
                storeId: this.store.store_id,
                categoryGroupCode: this.store.category_group_code,
                menuName: this.menu,
                price: this.price
            };

            this.postApiData(url, params).then((that) => {
                if (that.returnData.protocol41) {
                    console.log('성공');
                    this.getStoreMenu();
                }
            });
        },
        getStoreMenu() {
            let url = '/api/storeInfo/getStoreMenuInfo';

            let params = {
                storeId: this.store.store_id
            };
            this.getApiData(url, params).then((that) => {
                this.$set(this.store, 'menu', that.returnData);
                this.$forceUpdate();
            });
        },
        saveStoreSpecialNotes() {
            if (this.isNull(this.specialNote)) {
                alert('입력해줭');
                return;
            }
            this.saveStore();
            this.isSpecialNoteEdit = false;

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
            price: '',
            isMenuEdit: false,
            specialNote: '',
            isSpecialNoteEdit: false,
            emptyStarArr: new Array(5).fill(true),
            fullStarArr: new Array(5).fill(false),
            category: [],
            // 3/20 추가
            view: 'info'
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

.info .title {
    padding: 5px 0 0 10px;
    height: 30px;
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
}

#storeDetailApp .wrap .info .body {
    width: 100%;
    height: 100%;
}

#storeDetailApp .wrap .info .body .btnSpace {
    width: 15%;
    height: 465px;
    float: left;
}

#storeDetailApp .wrap .info .body .btnSpace .icon.info {
    background-image: url('../../assets/icon/info.png');
    background-repeat: no-repeat;
    cursor: pointer;
    height: 24px;
    width: 24px;
}

#storeDetailApp .wrap .info .body .btnSpace .icon.menu {
    background-image: url('../../assets/icon/menu.png');
    background-repeat: no-repeat;
    cursor: pointer;
    height: 24px;
    width: 24px;
}

#storeDetailApp .wrap .info .body .btnSpace .icon.comment {
    background-image: url('../../assets/icon/comment.png');
    background-repeat: no-repeat;
    cursor: pointer;
    height: 24px;
    width: 24px;
}

#storeDetailApp .wrap .info .body .btnSpace .icon.photo {
    background-image: url('../../assets/icon/photo.png');
    background-repeat: no-repeat;
    cursor: pointer;
    height: 24px;
    width: 24px;
}

.info .body .contentSpace {
    width: 85%;
    height: 465px;
    float: left;
}

#storeDetailApp .wrap .info .body .contentSpace .icon.plus {
    background-image: url('../../assets/icon/plus.png');
    background-repeat: no-repeat;
    cursor: pointer;
    height: 24px;
    width: 24px;
}

#storeDetailApp .wrap .info .body .contentSpace .icon.check {
    background-image: url('../../assets/icon/check.png');
    background-repeat: no-repeat;
    cursor: pointer;
    height: 24px;
    width: 24px;
}
</style>
