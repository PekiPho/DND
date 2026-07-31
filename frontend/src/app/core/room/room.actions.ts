import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { empty } from "rxjs";

export const RoomActions = createActionGroup({
    source: 'Room',
    events:{
        'Load Rooms': emptyProps(),
        'Load Rooms Success': props<{rooms: any[]}>(),
        'Load Rooms Failure': props<{error: string}>(),

        'Create Room': props<{name:string, description?:string, password?:string, maxPlayers?:number}>(),
        'Create Room Success': props<{room:any}>(),
        'Create Room Failure': props<{error:string}>(),

        'Join Room': props<{ roomId: number; password?: string }>(),
        'Join Room Success': props<{ room: any }>(),
        'Join Room Failure': props<{ error: string }>(),
        'Leave Room': props<{ roomId: number }>(),
        'Leave Room Success': props<{ roomId: number }>(),
        'Leave Room Failure': props<{ error: string }>(),
    }
})