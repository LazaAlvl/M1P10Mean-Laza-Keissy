
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StarRatingService } from '../../services/star-rating.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-service',
  standalone: true,
  imports: [RouterModule,CommonModule,FontAwesomeModule,],
  templateUrl: './info-service.component.html', animations: [
    trigger('starAnimation', [
      state('hover', style({
        transform: 'scale(1.2)',
        color: 'orange'
      })),
      state('unhover', style({
        transform: 'scale(1)',
        color: 'inherit'
      })),
      transition('hover => unhover', [
        animate('0.2s')
      ])
    ])
  ],
  styleUrl: './info-service.component.css'
})
export class InfoServiceComponent implements OnInit{

  Service_service = inject(ServiceService);
  serviceDetails: any;
  currentRating: number = 0;
  hoveredStar: number = 0;
  isRated: boolean = false;
  fb = inject(FormBuilder);
  preferenceform!:FormGroup;

  preferenceService = inject(StarRatingService)

  

  constructor(private route: ActivatedRoute,public starRatingService: StarRatingService) {}
  
 

  setRating(rating: number): void {
    if (!this.isRated) {
      this.currentRating = rating;
      this.isRated = true;
    }
  }
  

  isHighlighted(starNumber: number): boolean {
    return starNumber <= this.hoveredStar || starNumber <= this.currentRating;
  }

  highlightStar(starNumber: number): void {
    this.hoveredStar = starNumber;
  }

  resetStars(): void {
    this.hoveredStar = 0;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serviceId = params.get('id');
      if (serviceId) {
        console.log(serviceId)
        this.getServiceDetails(serviceId);
      }
      this.preferenceform = this.fb.group({ // Initialiser rendezvousForm avec FormBuilder
        // Ajouter les champs de votre formulaire ici
        id_service: [serviceId],
        id_client:[localStorage.getItem("user_id")], // Exemple avec un champ service initialisé à une chaîne vide
        etoile:[],
        }); 
    });
  }
  star(start: number): void {
    this.setRating(start);
    this.preferenceform.patchValue({
      etoile: this.currentRating
    });
    console.log(this.preferenceform.value);
    this.preferenceService.InsertPreference(this.preferenceform.value).subscribe({
      next:(res)=>{
        alert("Preference inserted!") 
      },
      error:(err)=>
      console.log(err)
    })
  }


  getServiceDetails(id: string): void {
    this.Service_service.getServiceDetails(id)
      .subscribe((data) => {
        this.serviceDetails = data;
        
      });
  }


}
  


 

