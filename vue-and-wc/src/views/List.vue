
<template>
    <div class="list">
        <h1>This is a list page</h1>
        <div class="stages">
            <ul v-if="stagesLenth> 0" >
                <li >
                <WcWrapper  :stage="stages[0]" />

                    
                </li>
            </ul>
            <div>
            </div>
        </div>
       
    </div>
</template>

<script setup lang="ts" >
import { computed } from "vue";
import { useStagesStore } from "../app/store";
import { storeToRefs } from "pinia";
import WcWrapper from "./WcWrapper.vue";

const {stages} = storeToRefs(useStagesStore());
const stagesLenth  = computed(() => stages.value.length);

</script>

<style>

</style>