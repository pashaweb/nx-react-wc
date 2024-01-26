<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStagesStore } from '../app/store';
import type { TpictureAnlytics } from '@react-canvas/models';
import { computed, ref } from 'vue';
import 'dist/wc/svg-stage/main.js';

type CustomHTMLElement = HTMLElement & {
  stageData: TpictureAnlytics;
};

const { stages } = storeToRefs(useStagesStore());

const isSelected = (id: number) => {
  return computed(() => {
    const isSelected = selectedStageId.value === id;
    return isSelected ? 'selected' : '';
  }).value;
};

const handleClick = (stage: TpictureAnlytics) => {
  console.log('stage', stage);
  selectedStage.value = stage;
  selectedStageId.value = stage.id;
  if (stageElement.value !== null) {
    stageElement.value.stageData = selectedStage.value as TpictureAnlytics;
  }
};

const selectedStage = ref<TpictureAnlytics | null>(null);
const selectedStageId = ref<number | null>(null);

const stageElement = ref<CustomHTMLElement | null>(null);
</script>

<template>
  <div class="home">
    <h1>This is a home page</h1>
    <div class="stages">
      <ul>
        <li
          v-for="stage in stages"
          :key="stage.id"
          :class="isSelected(stage.id)"
        >
          <div class="btn-container">
            <img :src="stage.url" alt="random image" />
            <button @click="handleClick(stage)">change {{ stage.name }}</button>
          </div>
          <ul v-if="isSelected(stage.id)">
            <li v-for="shape in stage.shapes" :key="shape.id" class="shape">
              {{ shape.type }} x:{{ Math.floor(shape.x) }} y:{{
                Math.floor(shape.y)
              }}
            </li>
          </ul>
        </li>
      </ul>
      <div>
        <stage-svg ref="stageElement" />
      </div>
    </div>

    <!--    <list />-->
  </div>
</template>

<style>
@import '../vars.css';
.home {
  max-width: 100%;
  padding: 1rem;
}
.stages {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5rem;

  ul {
    li {
      margin-bottom: var(--spacing-sm);
      list-style: none;

      .btn-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;

        img {
          width: 50px;
          height: 50px;
          border: var(--border-color-info) 4px solid;
          border-radius: 50px;
        }

        button {
          padding: 0.5rem;
          border-radius: 1rem;
          border: 1px solid;
          background-color: var(--color-info);
          color: var(--color-light);
          cursor: pointer;
        }
      }
    }
    li.selected .btn-container {
      button {
        background-color: var(--color-primary);
        color: var(--color-light);
      }

      img {
        border: var(--border-color-primary) 4px solid;
      }
    }
  }

  .shape {
    list-style: none;
    border: var(--border-color-info) 1px solid;
    padding: var(--spacing-xs);
  }
}
</style>
