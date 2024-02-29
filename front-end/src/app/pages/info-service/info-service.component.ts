
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StarRatingService } from '../../services/star-rating.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

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
  router = inject(Router);
  

  constructor(private route: ActivatedRoute,public starRatingService: StarRatingService) {}
  
 

  setRating(rating: number): void {
    if (!this.isRated) {
      this.currentRating = rating;
      this.isRated = true;
      // Désactiver les étoiles après la sélection
      this.disableStars();
    }
  }
  
  disableStars(): void {
    this.isRated = true;
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
        this.getServiceDetails(serviceId);
        const userId = localStorage.getItem("user_id");
       if(userId) {
        this.getPreference(serviceId, userId);
       }
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
    if (!this.isRated) {
      this.setRating(start);
      this.preferenceform.patchValue({
        id_service: this.preferenceform.value.id_service,
        id_client: this.preferenceform.value.id_client, 
        etoile: this.currentRating
      });
      console.log(this.preferenceform.value);
      this.preferenceService.InsertPreference(this.preferenceform.value).subscribe({
        next:(res)=>{
          alert("Preference inserted!") 
        },
        error:(err)=>
        console.log(err)
      });
    } else {
      alert("You have already rated this service."); // Afficher un message si l'utilisateur a déjà noté le service
    }
  }

  getPreference(id_service: string,id_user: string): boolean {
    if(id_user){
    this.preferenceService.GetPreferencealreadyhere(id_service, id_user).subscribe((data) => {
      if (data) {
        // Si l'utilisateur a déjà une préférence pour ce service, afficher la note et la désactiver les étoiles
        this.currentRating = data.etoile;
        this.isRated = true;
        
      }
    })
    return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
    
  }


  getServiceDetails(id: string): void {
    this.Service_service.getServiceDetails(id)
      .subscribe((data) => {
        this.serviceDetails = data;
        
      });
  }
  isClient(): boolean {
    const user_role = localStorage.getItem("role");
    if( user_role === "Client")
    { 
      return true;
    }else{
      return false;
    }
  }


}
  


 

