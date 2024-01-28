import { useStagesStore } from '../stores/stagesStoreCreator';
import styles from './Page.module.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TpictureAnlytics, TshapeItem } from '@react-canvas/models';
//import 'dist/wc/svg-stage/main.js';
import { ShapesList } from '../components/ShapesList';
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

  const isSelected = (id: number) => {
    let result = false;
    if (!selectedStage) return result;
    if (selectedStage.id === id) {
      result = true;
    }
    return result;
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
    <main className={styles.container}>
      <div>
          <ul className={styles.list}>
            {stages.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => _setSelectedStage(item)}
                  className={
                    isSelected(item.id)
                      ? `${styles['list-item']} ${styles['list-item-selected']}`
                      : `${styles['list-item']}`
                  }
                >
                  <div className={styles['list-item-link']}>
                    <img src={item.url} width="50px" alt='sds' />
                    {item.name} {item.selected ? 'selected' : 'ddd'}
                  </div>
                  {isSelected(item.id)
                 ? <ShapesList item={item} onSelected={setSelectedShape} />
                  : null}
                </li>
              );
            })}
          </ul>
        </div>
      <div>
      {selectedStage !== null ? (
        <div>
          <h1>{selectedStage.name}</h1>
          <div>
            <button onClick={() => resetSelectedStage()}>resetActive</button>
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
      
    </main>
  );
};
