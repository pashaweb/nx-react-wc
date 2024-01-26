import { create, type StateCreator } from 'zustand';
import { getDemo, TpictureAnlytics } from '@react-canvas/models';

type State = {
  stages: TpictureAnlytics[];
  selectedStage: TpictureAnlytics | null;
  selectedStageId: number | null;
};

type Action = {
  setSelectedStage: (id: number) => void;
  resetSelectedStage: () => void;
  setStages: (stages: TpictureAnlytics[]) => void;
  updateStage: (stage: TpictureAnlytics) => void;
};

export type StagesStore = State & Action;

const initialState: TpictureAnlytics[] = getDemo();

export const counterStoreCreator: StateCreator<StagesStore> = (set, get) => ({
  stages: initialState,
  selectedStage: null,
  selectedStageId: null,
  setSelectedStage: (id: number) =>
    set((state) => ({
      selectedStage: state.stages.find((stage) => stage.id === id),
      selectedStageId: id,
    })),
  resetSelectedStage: () => set({ selectedStage: null }),
  setStages: (stages: TpictureAnlytics[]) => set({ stages }),
  updateStage: (stage: TpictureAnlytics) => {
    set((state) => ({
      stages: state.stages.map((p) => (p.id === stage.id ? stage : p)),
    }));

    // if(get().selectedStageId !== null){
    //   set((state) => ({
    //     selectedStage: state.stages.find((stage) => stage.id === selectedStageId),
    //   }))
    //   }
    // }
  },
});

export const useStagesStore = create<StagesStore>()(counterStoreCreator);

//export const useCounterStore = create<CounterStore>()(counterStoreCreator)
