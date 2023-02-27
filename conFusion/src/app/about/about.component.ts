import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader }  from '../shared/leader';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  leaderall: Leader[];
    
  constructor(private leaderService: LeaderService) { }

  
  ngOnInit() {
    this.leaderService.getLeaderDetail()
      .subscribe(leaderall => this.leaderall=leaderall);
    
  }



}
