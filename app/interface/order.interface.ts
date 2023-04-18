export interface ItemInterface {
  id: number;
  name: string;
  amount: number;
  price: number;
  message: string | null;
}

export interface OrderListInterface {
  restaurantId: number;
  amount: number;
  total_price: number;
  items: ItemInterface[];
}