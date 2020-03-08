export const getApiData= {
    data() {
        return {
            returnData: {}
        }
    },
    methods:{
        getApiData(url, params){
            let that = this;
            this.$http.get('http://localhost:3000'+url, {
                    params: params
                }).then((response) => {
                    if(response.statusText === 'OK'){
                        this.returnData = response.data;
                    }
                })
                .catch(function (error) {
                  console.log(error);
                });

        }
    }
}