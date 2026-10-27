
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlantService, Plant as ApiPlant } from '../../services/plant';

interface Plant {
  id?: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  photoClass: string;
  bestseller?: boolean;
}

interface CartItem {
  plant: Plant;
  quantity: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  selectedCategory = 'All Plants';
  searchText = '';
  cartItems: CartItem[] = [];
  showCart = false;
  loadingPlants = false;
  plantError = '';

  user: { name: string; email: string } | null = null;

  categories = [
    'All Plants',
    'Indoor',
    'Outdoor',
    'Flowering',
    'Medicinal'
  ];

  plants: Plant[] = [
    {
      name: 'Money Plant',
      price: 199,
      category: 'Indoor',
      description: 'An easy-care favourite that brings a fresh green touch to your home.',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
      imageAlt: 'Green Money Plant',
      photoClass: 'money-photo',
      bestseller: true
    },
    {
      name: 'Snake Plant',
      price: 249,
      category: 'Indoor',
      description: 'A stylish, low-maintenance plant for bedrooms and living spaces.',
      image: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
      imageAlt: 'Snake Plant',
      photoClass: 'snake-photo',
      bestseller: true
    },
    {
      name: 'Aloe Vera',
      price: 179,
      category: 'Medicinal',
      description: 'A useful succulent that enjoys bright light and careful watering.',
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
      imageAlt: 'Aloe Vera Plant',
      photoClass: 'aloe-photo'
    },
    {
      name: 'Rose Plant',
      price: 299,
      category: 'Flowering',
      description: 'Add colour and classic floral beauty to your garden or balcony.',
      image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=600&q=80',
      imageAlt: 'Rose Plant',
      photoClass: 'rose-photo'
    },
    {
      name: 'Hibiscus Plant',
      price: 249,
      category: 'Outdoor',
      description: 'A vibrant flowering plant that brightens outdoor spaces.',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
      imageAlt: 'Hibiscus Plant',
      photoClass: 'hibiscus-photo'
    },
    {
      name: 'Tulsi Plant',
      price: 99,
      category: 'Outdoor',
      description: 'A much-loved aromatic plant for a sunny balcony or garden.',
      image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
      imageAlt: 'Tulsi Plant',
      photoClass: 'tulsi-photo',
      bestseller: true
    }
  ];

  constructor(
    private router: Router,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    const savedUser = localStorage.getItem('loggedInUser');

    if (savedUser) {
      try {
        this.user = JSON.parse(savedUser);
      } catch {
        localStorage.removeItem('loggedInUser');
      }
    }

    this.loadPlants();
  }

  loadPlants(): void {
    this.loadingPlants = true;
    this.plantError = '';

    this.plantService.getPlants().subscribe({
      next: (apiPlants: ApiPlant[]) => {
        this.plants = apiPlants.map(apiPlant => {
          const existingPlant = this.plants.find(
            plant => plant.name === apiPlant.name
          );

          return {
            ...apiPlant,
            imageAlt: existingPlant?.imageAlt ?? apiPlant.name,
            photoClass: existingPlant?.photoClass ?? '',
            bestseller: existingPlant?.bestseller ?? false
          };
        });

        this.loadingPlants = false;
      },
      error: (error) => {
        console.error('Failed to load plants:', error);
        this.plantError = 'Could not connect to the backend. Please check that the server is running.';
        this.loadingPlants = false;
      }
    });
  }

  get filteredPlants(): Plant[] {
    return this.plants.filter(plant => {
      const matchesCategory =
        this.selectedCategory === 'All Plants' ||
        plant.category === this.selectedCategory;

      const query = this.searchText.trim().toLowerCase();

      const matchesSearch =
        plant.name.toLowerCase().includes(query) ||
        plant.category.toLowerCase().includes(query) ||
        plant.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  addToCart(plant: Plant): void {
    const existingItem = this.cartItems.find(
      item => item.plant.name === plant.name
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ plant, quantity: 1 });
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item);
    }
  }

  removeFromCart(item: CartItem): void {
    this.cartItems = this.cartItems.filter(
      cartItem => cartItem !== item
    );
  }

  get cartCount(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.quantity, 0
    );
  }

  get cartTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.plant.price * item.quantity, 0
    );
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.user = null;
    this.router.navigate(['/login']);
  }
}
