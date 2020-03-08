export const getApiData= {
    data() {
        return {
            returnData: {}
        }
    },
    methods:{
        getApiData(url, params){
            let that = this;
            return new Promise((resolve, reject)=>{
                this.$http.get('http://localhost:3000'+url, {
                        params: params
                    }).then((response) => {
                        if(response.statusText === 'OK'){
                            that.returnData = response.data;
                            resolve(that);
                        }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
            })
        }
    }
}