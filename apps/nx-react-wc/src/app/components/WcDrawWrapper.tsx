import 'dist/wc/svg-stage/main.js';
import styles from './WcDrawWrapper.module.css';

import { useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TpictureAnlytics } from '@react-canvas/models';
import { usePictureAnaliticsStore } from '../stores/userePicturesList';
import React from 'react';

type TWcDrawWrapper = { data: TpictureAnlytics };

type CustomElement = {
  stageData: TpictureAnlytics;
  uid: string;
} & HTMLElement;

// don't forget to include all dependencies here

const WcDrowWrapper = (props: TWcDrawWrapper) => {
  const updateListItem = usePictureAnaliticsStore(
    (state) => state.updateListItem
  );
  const { data } = props;
  const elementRef = useRef<CustomElement | null>(null);
  const [uid, setUid] = React.useState<string>(uuidv4());

  const setData = useCallback(
    (data: TpictureAnlytics) => {
      console.log('WcDrowWrapper setData', uid);
      if (elementRef.current) {
        elementRef.current.stageData = data;
      }
    },
    [uid]
  );

  const elementEvent = useCallback(
    (event: CustomEvent) => {
      console.log('WcDrawWrapper elementEvent', event.detail);
      updateListItem(event.detail);
      setUid(uuidv4());
    },
    [updateListItem, setUid]
  );

  useEffect(() => {
    console.log('WcDrawWrapper useEffect');

    function updateData() {
      if (elementRef.current) {
        setData(data);
        elementRef.current.addEventListener(
          'update-picture-anlytics',
          elementEvent as EventListener
        );
      }
      return () => {
        if (elementRef.current) {
          elementRef.current.removeEventListener(
            'update-picture-anlytics',
            elementEvent as EventListener
          );
        }
      };
    }

    updateData();
  }, [elementRef, data, updateListItem, setData, elementEvent]);

  return (
    <>
      <div>WcDrawWrapper</div>
      <div className={styles['svg-holder']}>
        <stage-svg
          data-event-update="update-picture-anlytics"
          ref={elementRef}
        ></stage-svg>
      </div>
    </>
  );
};

export default WcDrowWrapper;

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
