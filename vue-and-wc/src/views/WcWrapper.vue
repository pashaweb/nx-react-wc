
<script setup lang="ts">
import type { TpictureAnlytics } from '@react-canvas/models';
import  { onMounted, ref, type PropType, watch, onUnmounted, computed, reactive} from "vue";
import { useStagesStore } from '../app/store';
import { defineProps } from "vue";
import 'dist/wc/svg-stage/main.js'
import { storeToRefs } from 'pinia';

type CustomHTMLElement = HTMLElement & {
    stageData: TpictureAnlytics
}

const props = defineProps({
    stage: {
        type: Object as PropType<TpictureAnlytics>,
        required: true
    }
});


const {updateStage} = useStagesStore();
const store = useStagesStore();
const stages = reactive(store.stages)
const selectedStage = ref<TpictureAnlytics | null>(null);
let count = 0;




const stageElement = ref<CustomHTMLElement | null>(null);
const evName:string = 'stage-updated';
watch(() => props.stage, () => {
    selectedStage.value = stages.find((stage) => stage.id === props.stage.id) as TpictureAnlytics;
    if(stageElement.value!==null) {
        stageElement.value.stageData = selectedStage.value as TpictureAnlytics;
    }
}, {immediate: true});

 watch(stages, (newVal) => {
   const pos = newVal[0].shapes.map(
     shape => (`x: ${shape.x} y: ${shape.y}`)
   );
   console.log(pos)
    //console.log('stages reactive', count++ , stages[0].shapes[0].x);
    //selectedStage.value = stages.find((stage) => stage.id === props.stage.id) as TpictureAnlytics;
}, {immediate: false});
//watch



onMounted(() => {
    console.log('props.stage', props.stage);
    selectedStage.value = stages.find((stage) => stage.id === props.stage.id) as TpictureAnlytics;
     if(stageElement.value!==null) {
            stageElement.value.stageData = selectedStage.value as TpictureAnlytics;
     };
})
</script>

<template>
    <h2>Selected stage</h2>
  <stage-svg  :data-event-update="evName"  v-if="!!props.stage" ref="stageElement"/>
</template>
