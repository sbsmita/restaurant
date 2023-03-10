import { Component, OnInit, Inject, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish : Dish;
  promotion: Promotion;
  leadhome: Leader;
  dishErrMess: string;

  constructor(private dishService : DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe(dish=>this.dish=dish)
      errmess=>this.dishErrMess=<any>errmess;
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion=promotion);
    this.leaderService.getFeaturedLeader()
      .subscribe(leadhome => this.leadhome=leadhome);
  }

}

