import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { RestaurantService } from 'app/restaurants/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {


  reviews: Observable<Restaurant>

  constructor(private restauranteService: RestaurantService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restauranteService.reviewsOfRestaurant(
      this.route.parent.snapshot.params['id']
    )
  }

}
