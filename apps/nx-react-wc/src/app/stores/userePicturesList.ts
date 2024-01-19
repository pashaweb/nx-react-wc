import { TpictureAnlytics, getDemo } from '@react-canvas/models'
import { create } from 'zustand'


const initialState: TpictureAnlytics[] = getDemo();


interface PicturesAnaliticsState {
    list: TpictureAnlytics[];
    selectedPictureId: number | null;
    selectedShapeId: number | null;
    selectedPicture: TpictureAnlytics | null;
    setSelectedPictureId: (id: number) => void;
    setSelectedShapeId: (id: number) => void;
    addPicture: (picture: TpictureAnlytics) => void;
    removePicture: (id: number) => void;
    updatePicture: (picture: TpictureAnlytics) => void;
    setList: (list: TpictureAnlytics[]) => void;    
    updateListItem: (item: TpictureAnlytics) => void;


}

export const usePictureAnaliticsStore  = create<PicturesAnaliticsState>((set, get) => ({
    list: initialState,
    selectedPictureId: null,
    selectedShapeId: null,
    selectedPicture: null,
    setSelectedPictureId: (id: number) => set({  
         selectedPicture: get().list.find(picture => picture.id === id) ,
         selectedPictureId: id,
         selectedShapeId: null,
        }
    ),
    setSelectedShapeId: (id: number) => set({ selectedShapeId: id }),
    addPicture: (picture: TpictureAnlytics) => set({ list: [...get().list, picture] }),
    removePicture: (id: number) => set({ list: get().list.filter(picture => picture.id !== id) }),
    updatePicture: (picture: TpictureAnlytics) => set({ list: get().list.map(p => p.id === picture.id ? picture : p) }),
    setList: (list: TpictureAnlytics[]) => set({ list }),
    updateListItem: (item: TpictureAnlytics) =>{
        const list = get().list.map(p => p.id === item.id ? item : p);
        console.log('updateListItem', item, list);
        set({ list });
    },
}))