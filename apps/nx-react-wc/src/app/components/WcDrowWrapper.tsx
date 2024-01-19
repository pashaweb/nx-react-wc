import 'dist/apps/shapes-canvas/main.js';
import 'dist/wc/svg-stage/main.js';

import { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

import { TpictureAnlytics } from "@react-canvas/models";
import { usePictureAnaliticsStore } from "../stores/userePicturesList";
import React from 'react';

type TWcDrowWrapper = {data: TpictureAnlytics}

type CustomElement = {
  stageData: TpictureAnlytics;
  uid: string;
} & HTMLElement 

// don't forget to include all dependencies here

const WcDrowWrapper = (props:TWcDrowWrapper ) => {  
    const updateListItem = usePictureAnaliticsStore(state => state.updateListItem);
    const {data} = props;
    const elementRef = useRef<CustomElement | null>(null);
    const [uid, setUid] = React.useState<string>(uuidv4());

    const setData = useCallback((data:TpictureAnlytics) => {
      console.log("WcDrowWrapper setData", uid)
      if (elementRef.current) {
        elementRef.current.stageData = data;
      }
    }, [uid, elementRef]); 

    const elementEvent = useCallback((event: CustomEvent) => {
      console.log("WcDrowWrapper elementEvent", event.detail)
      updateListItem(event.detail);
      setUid(uuidv4());
    }, [updateListItem]); 
  

  
    
    useEffect(() => {
      console.log("WcDrowWrapper useEffect")
      function updateData() {
        if (elementRef.current) {
          setData(data);
          elementRef.current.addEventListener('update-picture-anlytics', elementEvent as EventListener);
        }
        return () => {
          if (elementRef.current) {
            elementRef.current.removeEventListener('update-picture-anlytics', elementEvent as EventListener);
          }
        }
      }
      updateData()
    } , [elementRef, data, updateListItem, setData, elementEvent]);

  return (
    <>
        <div>WcDrowWrapper</div>
        <stage-svg data-event-update="update-picture-anlytics" ref={elementRef} ></stage-svg>
    </>
    
  )
}






export default WcDrowWrapper;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'stage-svg': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
}