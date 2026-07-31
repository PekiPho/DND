import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RoomService } from "../services/room";
import { RoomActions } from "./room.actions";
import { catchError, from, map, of, switchMap } from "rxjs";


@Injectable()
export class RoomEffects{
    private actions$ = inject(Actions);
    private roomService = inject(RoomService);

    loadRooms$ = createEffect(()=>
        this.actions$.pipe(
            ofType(RoomActions.loadRooms),
            switchMap(()=>
                from(this.roomService.getAll()).pipe(
                    map((rooms)=> RoomActions.loadRoomsSuccess({rooms})),
                    catchError((err)=> of(RoomActions.loadRoomsFailure({error: err.error?.message || 'Failed to load rooms'})))
                )
            )
        )
    );

    createRoom$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoomActions.createRoom),
            switchMap(({ name, description, password, maxPlayers }) =>
                from(this.roomService.create(name, description || '', password, maxPlayers)).pipe(
                    map((room) => RoomActions.createRoomSuccess({ room })),
                    catchError((err) =>
                        of(RoomActions.createRoomFailure({ error: err.error?.message || 'Failed to create room' }))
                    )
                )
            )
        )
    );

    joinRoom$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoomActions.joinRoom),
            switchMap(({ roomId, password }) =>
                from(this.roomService.join(roomId, password)).pipe(
                    map((room) => RoomActions.joinRoomSuccess({ room })),
                    catchError((err) =>
                        of(RoomActions.joinRoomFailure({ error: err.error?.message || 'Failed to join room' }))
                    )
                )
            )
        )
    );


    leaveRoom$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RoomActions.leaveRoom),
            switchMap(({ roomId }) =>
                from(this.roomService.leave(roomId)).pipe(
                    map(() => RoomActions.leaveRoomSuccess({ roomId })),
                    catchError((err) =>
                        of(RoomActions.leaveRoomFailure({ error: err.error?.message || 'Failed to leave room' }))
                    )
                )
            )
        )
    );

    reloadAfterChange$ = createEffect(() =>
        this.actions$.pipe(
        ofType(RoomActions.createRoomSuccess, RoomActions.joinRoomSuccess, RoomActions.leaveRoomSuccess),
        map(() => RoomActions.loadRooms())
        )
    );
}