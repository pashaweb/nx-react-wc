<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStagesStore } from '../app/store';
import type { TpictureAnlytics } from '@react-canvas/models';
import { ref } from 'vue';
import WcWrapper from './WcWrapper.vue';
import List from './List.vue';
import 'dist/wc/svg-stage/main.js';
const {stages} = storeToRefs(useStagesStore());
const handleClick = (stage:TpictureAnlytics) => {
  console.log('stage', stage)
  selectedStage.value = stage;
  selectedStageId.value = stage.id;
}

const selectedStage = ref<TpictureAnlytics | null>(null);
const selectedStageId = ref<number | null>(null);

</script>

<template>
  <div class="home">
    <h1>This is a home page</h1>
    <div class="stages">
      <ul>
        <li v-for="stage in stages" :key="stage.id">
          <button @click="handleClick(stage)">change  {{stage.name}}</button>

        </li>
      </ul>
      <div>
        <WcWrapper v-if="!!selectedStage" :stage="selectedStage" :stage-id="selectedStageId" />
      </div>

    </div>

    <list />


  </div>
</template>

<style>
@media (min-width: 768px) {
  .home {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    padding:  1rem;
  }

}
</style>
