import { useStagesStore } from '../stores/stagesStoreCreator';
import styles from './Page.module.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TpictureAnlytics, TshapeItem } from '@react-canvas/models';
//import 'dist/wc/svg-stage/main.js';
import { ShapesList } from './ShapesList';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SvgStageReact } from '@react-svg';
//
type CustomElement = {
  stageData: TpictureAnlytics;
  uid: string;
} & HTMLElement;
export const AppNew = () => {
  const [selectedStage, _setSelectedStage] = useState<TpictureAnlytics | null>(
    null
  );
  const elementRef = useRef<CustomElement | null>(null);
  //const [counter, setCounter] = useState(1);

  const {
    stages,
    setSelectedStage,
    resetSelectedStage,
    selectedStageId,
    updateStage,
  } = useStagesStore((state) => state);

  const elementEvent = useCallback(
    (event: CustomEvent) => {
      resetSelectedStage();

      // const nC = counter + 1;
      // setCounter(nC);
      updateStage(event.detail);
      setSelectedStage(event.detail.id);
    },
    [updateStage, resetSelectedStage, setSelectedStage]
  );

  useEffect(() => {
    //console.log('AppNew UseEffect', selectedStage, elementRef);
    const element = elementRef.current;

    if (element && selectedStage !== null) {
      element.stageData = selectedStage;
      element.addEventListener(
        'stage-svg-update',
        elementEvent as EventListener
      );
    }
    return () => {
      if (element) {
        element.removeEventListener(
          'stage-svg-update',
          elementEvent as EventListener
        );
      }
    };
  }, [selectedStage, elementRef, elementEvent]);

  const setSelectedShape = (id: number) => {
    if (!selectedStage) return;
    const newItem: TpictureAnlytics = { ...selectedStage };
    newItem.shapes.forEach((shape) => {
      shape.selected = false;
      if (shape.id === id) {
        shape.selected = !shape.selected;
      }
    });
    updateStage(newItem);
    _setSelectedStage(newItem);
  };

  const onDrugEventHandler = (shape: TshapeItem) => {
    const { x, y, id } = shape;

    if (!selectedStage) return;
    const shapes = selectedStage.shapes.map((item) => {
      if (item.id === shape.id) {
        return shape;
      }
      return item;
    });
    if (!shapes) return;
    console.log('onDrugEventHandler', id, x, y);
    const newItem: TpictureAnlytics = { ...selectedStage, shapes };
    updateStage(newItem);
    _setSelectedStage(newItem);
  };

  return (
    <div className={styles.container}>
      <ul>
        {stages.map((stage) => {
          return (
            <li key={stage.id}>
              <div>
                <h1>{stage.name}</h1>
                <div>
                  <button onClick={() => _setSelectedStage(stage)}>
                    setActive
                  </button>
                </div>
                {stage.id === selectedStageId && selectedStage !== null ? (
                  <ShapesList
                    item={selectedStage}
                    onSelected={setSelectedShape}
                  />
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      {selectedStage !== null ? (
        <div>
          <h1>{selectedStage.name}</h1>
          <div>
            <button onClick={() => resetSelectedStage()}>resetActive</button>
            <div></div>
            {/*<stage-svg*/}
            {/*  data-event-update="stage-svg-update"*/}
            {/*  ref={elementRef}*/}
            {/*></stage-svg>*/}

            <SvgStageReact
              stageData={selectedStage}
              onUpdated={updateStage}
              onDrugged={onDrugEventHandler}
            />
          </div>
        </div>
      ) : (
        <div>no selected stage</div>
      )}
    </div>
  );
};
