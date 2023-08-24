import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Meal, Meals } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  menusItem: Meals[] | undefined
  constructor(private http:HttpClient){}

  ngOnInit(): void {

    this.getMealDate();
   
  }


  postDate(meal:Meals){

    this.http.post('http://localhost:3000/products',meal).subscribe((res)=>{

      console.log(res)
    })

  }

  generateRandomPrice():number{

    const minPrice = 100
    const maxPrice = 1000
    return Math.floor(Math.random()*(maxPrice-minPrice)+1) + minPrice
  }

  refreshPage(): void{
    setTimeout(function() {
      location.reload(); // Reload the page
    }, 1000); // Set the timeout to 1000 milliseconds (1 second)
  }


  deleteDish(id:number){
     this.http.delete(`http://localhost:3000/products/${id}`).subscribe((res)=>{
      
      this.getMealDate()
     })
  }

  getMealDate():void{
    this.http.get<Meals[]>('http://localhost:3000/products?_page=1&_limit=20').subscribe((result)=>{

    this.menusItem = result


  }) 
  }
}
