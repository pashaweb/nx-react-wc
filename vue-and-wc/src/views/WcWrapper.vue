
<script setup lang="ts">
import type { TpictureAnlytics } from '@react-canvas/models';
import  { onMounted, ref, type PropType, watch, onUnmounted, computed, reactive} from "vue";
import { useStagesStore } from '../app/store';
import { defineProps } from "vue";
import 'dist/wc/svg-stage/main.js';
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

 watch(stages, () => {
    console.log('stages reactive', count++ );
    selectedStage.value = stages.find((stage) => stage.id === props.stage.id) as TpictureAnlytics;
}, {immediate: true});
//watch


const onUpdateEvent=(e: Event) => {
  const updateEvent=e as CustomEvent;
  console.log('e.detail', updateEvent.detail);
  updateStage(updateEvent.detail);
};

onMounted(() => {
    console.log('props.stage', props.stage);
    selectedStage.value = stages.find((stage) => stage.id === props.stage.id) as TpictureAnlytics;
     if(stageElement.value!==null) {
            stageElement.value.stageData = selectedStage.value as TpictureAnlytics;
            const el = stageElement.value  as CustomHTMLElement;
            el.addEventListener('stage-updated', onUpdateEvent);
     };
})

onUnmounted(() => {
    if(stageElement.value!==null) {
        const el = stageElement.value  as CustomHTMLElement;
        el.removeEventListener('stage-updated', onUpdateEvent);
    }
});
</script>

<template>
    <h2>Selected stage</h2>
   <stage-svg  :data-event-update="evName"  v-if="!!props.stage" ref="stageElement"/>
</template>