export interface Category {
  _id: string;
  name: string;
}

export interface Size {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  images: {
    url: string;
    publicId: string;
  }[];
  stock: {
    size_id: string;
    size_name: string;
    quantity: number;
  }[];
}
