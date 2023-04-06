import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories :any
  index = 0;
 
  readonly items = [
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
      'https://www.cloudways.com/blog/wp-content/uploads/Smart-Watch.jpg',
  ];
  index2 = 2;
 
  readonly items2 = [
      'John Cleese',
      'Eric Idle',
      'Michael Palin',
      'Graham Chapman',
      'Terry Gilliam',
      'Terry Jones',
  ];

  constructor(private productsServices:ProductsService) { }

  ngOnInit(): void {
    this.productsServices.getCategories().subscribe((data)=>{
      this.categories = data
      console.log(this.categories)
     })
  }

}
