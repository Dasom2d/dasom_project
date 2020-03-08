export const toggle= {
    data() {
        return {
            isShowing: false
        }
    },
    mounted(){ 
        console.log('toggle등장');
    },
    methods:{
        toggleShow(){
            this.isShowing = !this.isShowing
        }
    }
}