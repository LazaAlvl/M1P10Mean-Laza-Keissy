import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatisticService } from '../../services/statistic.service';
import { LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import 'chartjs-plugin-datalabels';

Chart.register(LinearScale, CategoryScale, Title, Tooltip, Legend);


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

// Reservation Party 

  ReservationInputJour: string = '';
  reservationCount: number | null = null;
  reservartionstatForm!:FormGroup;
  reservartionstatmonthForm!:FormGroup;
  fb = inject(FormBuilder);
  fc = inject(FormBuilder);
  date: string = '';
  ChartreservationMonth: any;

  currentDate: any= new Date();
  statisticService = inject(StatisticService);

// Turnover Party  
TurnoverInputJour: string = '';
TurnoverPrice: number | null = null;
TurnoverstatForm!:FormGroup;
TurnoverstatmonthForm!:FormGroup; 
Yearturnover: string = '';
Monthturnover: string = '';
Dayturnover: string = '';
ChartTurnoverMonth: any;
Monthbenefice!: string[];

// Benefice Party  
BeneficePrice!: number[];
BeneficestatmonthForm!:FormGroup; 

// Benefice Party  
AvaregeForm!:FormGroup;
AvaregeInfos: any[] = []; 



  

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: number[] = [];


  ngOnInit(): void {
    this.reservartionstatForm = this.fb.group({
      date: ['']
     })
     this.TurnoverstatForm = this.fc.group({
      date: ['']
     })

     this.TurnoverstatmonthForm = this.fc.group({
      month: [''],
      year: ['']
     })

     this.reservartionstatmonthForm = this.fb.group({
      month: [''],
      year: ['']
     })

     this.BeneficestatmonthForm = this.fb.group({
      year: ['']
     })

     this.AvaregeForm = this.fb.group({
      month: [''],
      year: ['']
     })



    const currentYear = new Date().getFullYear();
    const startYear = 2000;

    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }

    
  }


  getReservationCount(): void {
    this.statisticService.GetReservationStatDay(this.reservartionstatForm.value).subscribe(data => {
      if (data) {
        this.reservationCount = data.result[0].count;
        
        this.date = data.dateInput;
        
      }
    });
  }
  getTurnoverCount(): void {
    this.statisticService.GetTurnoverStatDay(this.TurnoverstatForm.value).subscribe(data => {
      if (data) {
        this.TurnoverPrice = data.result[0].totalPrice;
        
        this.Yearturnover= data.result[0].year;
        this.Monthturnover= data.result[0].month;
        this.Dayturnover= data.result[0].day;
      }
    });
  }



  getTurnoverMonth(): void {
    this.statisticService.GetTurnoverStatMonth(this.TurnoverstatmonthForm.value).subscribe(data => {
      if (data) {
        this.reservationCount = data.result[0].count;
        
        this.date = data.dateInput;
        
      }
    });
  }
  

  getTurnValidatedMonth(): void {
    // Faites appel à votre service HTTP pour récupérer les données
    this.statisticService.GetTurnoverStatMonth(this.TurnoverstatmonthForm.value).subscribe(data => {
      const services = data.result.map((result: { service: any; }) => result.service);
  
      const totalPrice = data.result.map((result: { totalPrice: any; }) => result.totalPrice);


      this.createBarChartMonth(services, totalPrice);
    });
  }
  createBarChartMonth(services: string[], totalPrice: number[]): void {
    // Vérifiez s'il existe déjà une instance de chart
    if (this.ChartTurnoverMonth) {
        // Détruisez l'instance existante du chart
        this.ChartTurnoverMonth.destroy();
    }

    const ctx = document.getElementById('barChartMonth') as HTMLCanvasElement;
    this.ChartTurnoverMonth = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: services,
            datasets: [{
                label: 'Turnover validated',
                data: totalPrice,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



  getReservationValidatedMonth(): void {
    // Faites appel à votre service HTTP pour récupérer les données
    this.statisticService.GetReservationStatMonth(this.reservartionstatmonthForm.value).subscribe(data => {
      const services = data.result.map((result: { service: any; }) => result.service);
  
      const counts = data.result.map((result: { count: any; }) => result.count);


      this.createBarChart(services, counts);
    });
  }

  createBarChart(services: string[], counts: number[]): void {
    // Vérifiez s'il existe déjà une instance de chart
    if (this.ChartreservationMonth) {
        // Détruisez l'instance existante du chart
        this.ChartreservationMonth.destroy();
    }

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    this.ChartreservationMonth = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: services,
            datasets: [{
                label: 'Reservation validated',
                data: counts,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

getBeneficeMonth(): void {
  this.statisticService.GetBeneficeStatMonth(this.BeneficestatmonthForm.value).subscribe(data => {
    if (data) {
      this.BeneficePrice= data.result.map((result: { benefice: any; }) => result.benefice);
      this.Monthbenefice= data.result.map((result: { month: any; }) => this.months[result.month - 1]);

  
            const monthsWithBenefice: string[] = [];
      const beneficeByMonth: number[] = [];
     this.months.forEach((month, index) => {
        if (this.BeneficePrice[index] !== 0) {
          monthsWithBenefice.push(month);
          beneficeByMonth.push(this.BeneficePrice[index]);
        }
      });

      this.createLinearChartMonth(monthsWithBenefice,beneficeByMonth);
    }
    

  });
}
createLinearChartMonth(Months: string[], BeneficePrice: number[]): void {
// Vérifiez s'il existe déjà une instance de chart
if (this.ChartTurnoverMonth) {
    // Détruisez l'instance existante du chart
    this.ChartTurnoverMonth.destroy();
}

const ctx = document.getElementById('LinearChartMonth') as HTMLCanvasElement;
this.ChartTurnoverMonth = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Months,
        datasets: [{
            label: 'Turnover validated',
            data: BeneficePrice,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}
getAverageWorking(): void {
  // Faites appel à votre service HTTP pour récupérer les données
  this.statisticService.Getaverage_working_time(this.AvaregeForm.value).subscribe(data => {
    this.AvaregeInfos = data.result

    // const counts = data.result.map((result: { count: any; }) => result.count);

  });
}



}  

