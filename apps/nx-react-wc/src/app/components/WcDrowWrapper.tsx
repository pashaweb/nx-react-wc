import 'dist/apps/shapes-canvas/main.js';

import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

import { TpictureAnlytics } from "@react-canvas/models";
import { usePictureAnaliticsStore } from "../stores/userePicturesList";

type TWcDrowWrapper = {data: TpictureAnlytics}

type CustomElement = {
  pictureAnlytics: TpictureAnlytics;
  uid: string;
} & HTMLElement 


const WcDrowWrapper = (props:TWcDrowWrapper ) => {  
    const updateListItem = usePictureAnaliticsStore(state => state.updateListItem);
    const uid = uuidv4();
    const {data} = props;
    const elementRef = useRef<CustomElement | null>(null);

    const setData = (data:TpictureAnlytics) => {
      if (elementRef.current) {
      elementRef.current.pictureAnlytics = data;
      }
    };

  
    
    useEffect(() => {
      function updateData() {
        if (elementRef.current) {
          setData(data);
          elementRef.current.addEventListener('update-picture-anlytics', ((event: CustomEvent) => {
            console.log('update-picture-anlytics', event.detail);
            updateListItem(event.detail);
  
          }) as EventListener);
        }
        return () => {
          if (elementRef.current) {
            elementRef.current.removeEventListener('update-picture-anlytics', ((event: CustomEvent) => {
              console.log('update-picture-anlytics', event.detail);
              updateListItem(event.detail);
    
            }) as EventListener);
          }
        }
      }
      updateData()
    } , [elementRef, data, updateListItem]);

  return (
    <>
        <div>WcDrowWrapper</div>

        <my-element ref={elementRef} data-uid={uid} ></my-element>
    </>
    
  )
}






export default WcDrowWrapper;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'my-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
}