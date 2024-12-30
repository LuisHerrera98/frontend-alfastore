export async function fetchCategories() {
    const response = await fetch('https://api.alfastoreargentina.com/api/v1/category-stock');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  }