export enum Category {
  Food = 'Food',
  Drink = 'Drink',
  Snack = 'Snack'
}

export interface RestaurantInterface {
  id: number;
  name: string;
  isOpen: boolean;
  userId: number;
  cashFlow: number;
  createdAt: Date;
  updatedAt: Date;
  location: string;
}

export interface RestaurantWithMenuInterface extends RestaurantInterface {
  Menu: MenuInterface[]
}

export interface MenuInterface {
  id: number;
  restaurantId: number;
  description: string;
  name: string;
  category: Category;
  price: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}