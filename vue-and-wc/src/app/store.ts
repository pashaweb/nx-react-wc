import {defineStore } from 'pinia';
import { reactive, ref } from 'vue';

import { getDemo, type TpictureAnlytics } from '@react-canvas/models';
export const useStagesStore = defineStore('stages', () => {

    const iniData: TpictureAnlytics[] = getDemo();
    const stages = reactive<TpictureAnlytics[]>(iniData);


    
    const updateStage = (stage: TpictureAnlytics) => {
        const index = stages.findIndex((s) => s.id === stage.id);
        if(index > -1) {
            stages[index] = stage;
        }
    }

    return {
        stages,
        updateStage,
    }
})