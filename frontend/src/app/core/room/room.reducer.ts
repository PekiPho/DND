import { createFeature, createReducer, on } from "@ngrx/store";
import { RoomActions } from "./room.actions";

export interface RoomState{
    rooms:any[];
    isLoading:boolean;
    error:string | null;
}

export const initialRoomState: RoomState = {
    rooms:[],
    isLoading:false,
    error:null,
};

export const roomFeature = createFeature({
    name: 'room',
    reducer: createReducer(
        initialRoomState,

        on(RoomActions.loadRooms, RoomActions.createRoom, RoomActions.joinRoom, RoomActions.leaveRoom, (state) => ({
            ...state,
            isLoading: true,
            error: null,
        })),

        on(RoomActions.loadRoomsSuccess, (state, { rooms }) => ({
            ...state,
            rooms,
            isLoading: false,
            error: null,
        })),
        
        on(RoomActions.createRoomSuccess, (state, { room }) => ({
            ...state,
            rooms: [...state.rooms, room],
            isLoading: false,
            error: null,
        })),

        on(RoomActions.joinRoomSuccess, (state, { room }) => ({
            ...state,
            rooms: state.rooms.map(r => r.id === room.id ? room : r),
            isLoading: false,
            error: null,
        })),

        on(RoomActions.leaveRoomSuccess, (state) => ({
            ...state,
            isLoading: false,
            error: null,
        })),

        on(RoomActions.loadRoomsFailure, RoomActions.createRoomFailure, RoomActions.joinRoomFailure, RoomActions.leaveRoomFailure, (state, { error }) => ({
            ...state,
            isLoading: false,
            error,
        })),
    )
})