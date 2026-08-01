import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { InitiativeTracker } from "./initiative-tracker/initiative-tracker";
import { Chat } from "./chat/chat";
import { Map } from "./map/map";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "../core/services/auth";
import { roomFeature } from "../core/room/room.reducer";

@Component({
    selector: 'app-room',
    imports: [CommonModule,Chat,Map,InitiativeTracker],
    templateUrl: './room.component.html',
    styleUrl:'./room.component.scss'
})
export class RoomComponent implements OnInit{
    private route= inject(ActivatedRoute);
    private store = inject(Store);
    private authService = inject(AuthService);

    roomId!:string;
    isCombatActive = false;
    isHost= false;

    ngOnInit(){
        this.roomId = this.route.snapshot.paramMap.get('id') || '';
        const currentUser = this.authService.getCurrentUser();

        this.store.select(roomFeature.selectRooms).subscribe(rooms => {
            const room = rooms.find(r=> r.id == Number(this.roomId));

            if(room && currentUser){
                this.isHost = room.host?.id === currentUser.userId;
            }
        });

        
    }

    toggleCombat(){
        if(this.isHost)
            this.isCombatActive = !this.isCombatActive;
    }
}