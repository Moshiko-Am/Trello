<template>
  <div class="card-main-item">
    <div class="main-item-header">
      <h3 class="main-item-title">Due Date</h3>
    </div>
    <div class="date-container" :style="{'background-color':isSoon}">
        <label>
            <span class="icon-md icon-v"></span>
        <input type="checkbox" v-model="isCompletedCopy" @change="toggleCompleted">
        </label>
        {{ date }}
    </div>
  </div>
</template>

<script>
export default {
    props:{
        date:String,
        isCompleted:Boolean,
    },
    data(){
        return {
            isCompletedCopy: this.isCompleted
        }
    },
    computed: {
        isSoon() {
            if(this.isCompletedCopy) return '#61BD4F'
            const currDate = Date.parse(new Date)
            const dueDate = Date.parse(this.date)
            const timeLeft = dueDate - currDate
            console.log(timeLeft);
            if(timeLeft < 86400000) return '#eb5a46'
            else if(timeLeft < 172800000) return '#F2D600'
            else return 'rgba(9, 30, 66, 0.04)'
        }
    },
    methods: {
        toggleCompleted(){
            this.$emit('toggleCompleted' , this.isCompletedCopy)
        }
    }
}
</script>