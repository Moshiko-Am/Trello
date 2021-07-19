<script>
import { doughnut } from "vue-chartjs";
export default {
    extends:doughnut,
    props:{
        board:Object,
    },
    mounted(){
        this.renderChart({
            
        })
    }
};
</script>