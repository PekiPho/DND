import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../core/services/room';
import { AuthService } from '../core/services/auth';
import { Store } from '@ngrx/store';
import { roomFeature } from '../core/room/room.reducer';
import { map } from 'rxjs';
import { RoomActions } from '../core/room/room.actions';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
  
  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);


  currentUser: any = null;

  allRooms$ = this.store.select(roomFeature.selectRooms);
  isLoading$ = this.store.select(roomFeature.selectIsLoading);
  error$ = this.store.select(roomFeature.selectError);

  isMyRoomsOpen= true;
  isJoinedRoomsOpen= true;

  showCreateModal = false;

  createForm!: FormGroup;
  joinForm!: FormGroup;


  myRooms$ = this.allRooms$.pipe(
    map(rooms => rooms.filter(r => r.host && r.host.id === this.currentUser?.userId))
  );
  joinedRooms$ = this.allRooms$.pipe(
    map(rooms => rooms.filter(r => r.players && r.players.some((p: any) => p.id === this.currentUser?.userId)))
  );

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if(!this.currentUser){
      this.router.navigate(['/login']);
      return;
    }

    this.initForms();
    
    this.store.dispatch(RoomActions.loadRooms());
  }

  private initForms(){
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(250)]],
      password: ['', [Validators.required]],
      maxPlayers: [5, [Validators.required, Validators.min(1), Validators.max(20)]]
    });

    this.joinForm = this.fb.group({
      roomId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onCreateRoom(){
    if(this.createForm.invalid) return;

    const {name, description, password, maxPlayers} = this.createForm.value;

    this.store.dispatch(RoomActions.createRoom({ name, description, password, maxPlayers }));
    this.createForm.reset({ maxPlayers: 5 });
    this.showCreateModal = false;
  }

  onJoinRoom(){
    if (this.joinForm.invalid) return;

    const { roomId, password } = this.joinForm.value;

    this.store.dispatch(RoomActions.joinRoom({ roomId: Number(roomId), password }));
    this.joinForm.reset();
  }

  onLeaveRoom(roomId: number) {
    if (confirm('Are you sure you want to leave this campaign?')) {
      this.store.dispatch(RoomActions.leaveRoom({ roomId }));
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
