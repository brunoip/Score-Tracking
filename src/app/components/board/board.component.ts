import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ CommonModule, MatIconModule, FormsModule ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})

export class BoardComponent implements OnInit {
  results = {};
  newPlayer : Player;
  list : Player[];
  modalTitle: string = "";
  modalEdit: boolean = false;
  modifyScore: number = 0;
  optionColors: string[] = ["#0061FE", "#32CD32", "#FF0000","#FFD700","#000000", "#FF69B4", "#BA55D3", "#FF6A00", "#A0522D", "#FAF0E6"];

  constructor() { 
    this.newPlayer = {
      name: '',
      color: '#0061FE',
      id: 0,
      score: 0
    };

    var arr: Player[] = [];

  this.list = arr;

  }
  
  ngOnInit() {
  }

  addPlayer(player: Player) {
    this.list.push({
      name: player.name,
      color: player.color,
      id: player.id,
      score: player.score
    });
  }

  increaseScore( player:Player, value: number ){
    this.list = this.list.map(e => {
      if (e.id === player.id){
        player.score=player.score+value;
        return player;
       } 
      return e;
     })
  }

  decreaseScore( player:Player, value: number ){
    this.list = this.list.map(e => {
      if (e.id === player.id){
        player.score=player.score-value;
        return player;
       } 
      return e;
     })
  }

  openEditPlayerModal(player: Player)
  {
    this.modalTitle = "Edit Player";
    this.modalEdit = true;
    if(player != null)
    {
      this.newPlayer = Object.create(player);
    }
    this.showNewPlayerModal();
  }

  openNewPlayerModal()
  {
    this.modalTitle = "Create new Player";
    this.modalEdit = false;
    this.newPlayer = {
      name: 'Player',
      color: this.optionColors[this.colorOrder(this.list.length)],
      score: 0,
      id: Math.floor((Math.random() * 100000) + 1)
    };
    this.showNewPlayerModal();
  }

  showNewPlayerModal()
  {
    this.modifyScore = 0;
    const modalButton = document.getElementById('modalButton');
    if(modalButton != null)
    {
      modalButton.click();
    }
  }

  saveNewPlayerModal()
  {
    const newPlayerModal = document.getElementById('modalWindow');
    if(newPlayerModal != null){
      if(!this.list.find(x => x.id === this.newPlayer.id))
        this.addPlayer(this.newPlayer);
      newPlayerModal.style.display = 'none';
    }
    this.increaseScore(this.newPlayer, this.modifyScore);
  }

  deletePlayer()
  {
    this.list = this.list.filter(item => item.id !== this.newPlayer.id);
    this.closeNewPlayerModal();
  }

  closeNewPlayerModal()
  {
    const newPlayerModal = document.getElementById('modalWindow');
    if(newPlayerModal != null)
      newPlayerModal.style.display = 'none';
  }

  orderList()
  {
    this.list.sort((a, b) => (a.score > b.score ? -1 : 1));
  }

  colorOrder(num: number)
  {
    var out=num-1;
    while(out >= 9) 
      out=out-10;
    return out+1;
  }
}
