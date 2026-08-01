import { createFeature, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { RoomActions } from "./room.actions";
import { Room } from "../models/room.model";

export interface RoomState extends EntityState<Room>{
    isLoading:boolean;
    error:string | null;
}

export const adapter: EntityAdapter<Room> = createEntityAdapter<Room>();


export const initialRoomState: RoomState = adapter.getInitialState({
    isLoading: false,
    error: null,
});

export const roomFeature = createFeature({
    name: 'room',
    reducer: createReducer(
        initialRoomState,
        on(RoomActions.loadRooms, RoomActions.createRoom, RoomActions.joinRoom, RoomActions.leaveRoom, (state) => ({
            ...state,
            isLoading: true,
            error: null,
        })),
        on(RoomActions.loadRoomsSuccess, (state, { rooms }) => 
            adapter.setAll(rooms, { ...state, isLoading: false, error: null })
        ),
        
        on(RoomActions.createRoomSuccess, (state, { room }) => 
            adapter.addOne(room, { ...state, isLoading: false, error: null })
        ),
        on(RoomActions.joinRoomSuccess, (state, { room }) => 
            adapter.upsertOne(room, { ...state, isLoading: false, error: null })
        ),
        on(RoomActions.leaveRoomSuccess, (state, { roomId }) => 
            adapter.removeOne(roomId, { ...state, isLoading: false, error: null })
        ),
        on(RoomActions.loadRoomsFailure, RoomActions.createRoomFailure, RoomActions.joinRoomFailure, RoomActions.leaveRoomFailure, (state, { error }) => ({
            ...state,
            isLoading: false,
            error,
        })),
    ),
    extraSelectors: ({ selectRoomState }) => {
        const { selectAll } = adapter.getSelectors(selectRoomState);
        return {
            selectRooms: selectAll
        };
    }
});