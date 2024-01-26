import '@wc/svg-stage';
import styles from './WcDrawWrapper.module.css';

import { useCallback, useEffect, useRef } from 'react';
import { TpictureAnlytics } from '@react-canvas/models';
import React from 'react';
import { useStagesStore } from '../stores/stagesStoreCreator';

type TWcDrawWrapper = { data?: TpictureAnlytics, uid: number | null };

type CustomElement = {
  stageData: TpictureAnlytics;
  uid: string;
} & HTMLElement;

// don't forget to include all dependencies here

const WcDrawWrapper = (props: TWcDrawWrapper) => {
  const { stages, updateStage } = useStagesStore((state) => state);
  const { data, uid } = props;
  const elementRef = useRef<CustomElement | null>(null);

  const setData = useCallback(
    (data: TpictureAnlytics) => {
      console.log('WcDrawWrapper setData');
      if (elementRef.current) {
        elementRef.current.stageData = data;
      }
    },
    [elementRef]
  );

  const elementEvent = useCallback(
    (event: CustomEvent) => {
      console.log('WcDrawWrapper elementEvent', event.detail);
      updateStage(event.detail);
    },
    [updateStage]
  );

  useEffect(() => {
    console.log('WcDrawWrapper useEffect');

    function updateData() {
      if (elementRef.current && uid && stages) {
        const data = stages.find((item) => item.id === uid);
        if (!data) {
          return;
        }
        setData(data);
        elementRef.current.addEventListener(
          'stage-svg-update',
          elementEvent as EventListener
        );
      }
      return () => {
        if (elementRef.current) {
          elementRef.current.removeEventListener(
            'stage-svg-update',
            elementEvent as EventListener
          );
        }
      };
    }

    updateData();
  }, [elementRef, data, updateStage, setData, elementEvent, uid, stages]);

  return (
    <>
      <div>WcDrawWrapper</div>
      <div className={styles['svg-holder']}>
        <stage-svg
          data-event-update="stage-svg-update"
          ref={elementRef}
        ></stage-svg>
      </div>
    </>
  );
};


export default WcDrawWrapper;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stage-svg': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
