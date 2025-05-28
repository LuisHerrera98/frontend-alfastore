import { LOCAL, PRODUCTION } from "./constants";

export async function fetchCategories() {
    const response = await fetch(`${PRODUCTION}/category-stock`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }