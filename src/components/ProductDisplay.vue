<template>
    <div class="product-page">
      <!-- Sidebar for Filters -->
      <aside class="sidebar">
        <h2>FILTERS</h2>
        <section class="filter-section">
          <h3>CATEGORIES</h3>
          <!-- Generate categories dynamically -->
          <div v-for="category in categories" :key="category.name">
            <input type="checkbox" :id="category.name" :value="category.name">
            <label :for="category.name">{{ category.name }}</label>
          </div>
        </section>
  
        <!-- Repeat for other filter types like Brands etc. -->
      </aside>
  
      <!-- Main Content for Products -->
      <section class="product-grid">
        <header>
          <h1>Men T-Shirts - {{ products.length }} items</h1>
          <!-- Sort Dropdown -->
          <select name="sort" id="sort">
            <option value="recommended">Sort by: Recommended</option>
            <!-- Add other sort options -->
          </select>
        </header>
  
        <!-- Products Grid -->
        <div class="products">
          <article v-for="product in products" :key="product.id" class="product-card" @click="selectProduct(product)">
            <img :src="`/images/${product.imageUrl}`" :alt="product.name">
            <div class="product-info">
              <h3>{{ product.brand }}</h3>
              <p>{{ product.name }}</p>
              <div class="product-price">
                <span class="original-price">{{ product.price.currency }}{{ product.price.original }}</span>
                <span class="final-price">{{ product.price.currency }}{{ product.price.final }}</span>
                <span class="discount">{{ product.price.discountPercentage }}% OFF</span>
              </div>
              <div class="product-rating">
                <span class="rating-value">{{ product.rating.value }}</span>
                <span class="rating-count">{{ product.rating.count }} ratings</span>
              </div>
              <span v-if="product.isNew" class="new-label">NEW</span>
            </div>
          </article>
        </div>
      </section>
    </div>
  </template>
  
  <script>

import axios from 'axios';

export default {
  data() {
    return {
      categories: [
        // ... your categories if needed
      ],
      products: [], // Initialize products array to be filled by API data
    };
  },
  methods: {
    fetchProductsStatic() {
    //   axios.get('http://localhost:5001/products')
    //     .then(response => {
    //       // Handle the response data from the API
    //       this.products = response.data;
    //     })
    //     .catch(error => {
    //       // Handle errors here, such as displaying a message to the user
    //       console.error("There was an error fetching the products: ", error);
    //     });
    this.products = [
  {
    "id": 1,
    "name": "Roadster Pure Cotton T-shirt",
    "brand": "Roadster",
    "price": {
      "original": 499,
      "final": 289,
      "discountPercentage": 42,
      "currency": "Rs."
    },
    "rating": {
      "value": 4.2,
      "count": 51800
    },
    "imageUrl": "2.jpg",
    "isNew": false
  },
  {
    "id": 2,
    "name": "H&M Cotton Pure Cotton T-shirt",
    "brand": "H&M",
    "price": {
      "original": 599,
      "final": 399,
      "discountPercentage": 33,
      "currency": "Rs."
    },
    "rating": {
      "value": 4.4,
      "count": 11200
    },
    "imageUrl": "1.jpg",
    "isNew": false
  },
  {
    "id": 3,
    "name": "Nautica Men Pure Cotton T-shirt",
    "brand": "Nautica",
    "price": {
      "original": 1299,
      "final": 454,
      "discountPercentage": 65,
      "currency": "Rs."
    },
    "rating": {
      "value": 4.5,
      "count": 319
    },
    "imageUrl": "3.jpg",
    "isNew": true
  },
  {
    "id": 4,
    "name": "Roadster Printed Round Neck Pure Cotton T-shirt",
    "brand": "Roadster",
    "price": {
      "original": 999,
      "final": 332,
      "discountPercentage": 63,
      "currency": "Rs."
    },
    "rating": {
      "value": 4.2,
      "count": 6900
    },
    "imageUrl": "4.jpg",
    "isNew": true
  },
  {
    "id": 1,
    "name": "Roadster Pure Cotton T-shirt",
    "brand": "Roadster",
    "price": {
      "original": 499,
      "final": 289,
      "discountPercentage": 42,
      "currency": "Rs."
    },
    "rating": {
      "value": 4.2,
      "count": 51800
    },
    "imageUrl": "2.jpg",
    "isNew": false
  },
  {
    "id": 2,
    "name": "H&M Cotton Pure Cotton T-shirt",
    "brand": "H&M",
    "price": {
      "original": 599,
      "final": 399,
      "discountPercentage": 33,
      "currency": "Rs."
    },
    "rating": {
      "value": 4.4,
      "count": 11200
    },
    "imageUrl": "1.jpg",
    "isNew": false
  },
  {
    "id": 3,
    "name": "Nautica Men Pure Cotton T-shirt",
    "brand": "Nautica",
    "price": {
      "original": 1299,
      "final": 454,
      "discountPercentage": 65,
      "currency": "Rs."
    },
    "rating": {
      "value": 4.5,
      "count": 319
    },
    "imageUrl": "3.jpg",
    "isNew": true
  },
  {
    "id": 4,
    "name": "Roadster Printed Round Neck Pure Cotton T-shirt",
    "brand": "Roadster",
    "price": {
      "original": 999,
      "final": 332,
      "discountPercentage": 63,
      "currency": "Rs."
    },
    "rating": {
      "value": 4.2,
      "count": 6900
    },
    "imageUrl": "4.jpg",
    "isNew": true
  }
  // ... add more products as needed
];
    },    
    fetchProducts() {
      axios.get('http://localhost:5001/api/Products') // Update the URL to match your API endpoint
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the products: ", error);
        });
    },
    selectProduct(product) {
      this.selectedProduct = product;
      // Navigate to a details page or open a details modal
      // For simplicity, we'll use the router to navigate to a details page if you have one
      this.$router.push({ name: 'ProductDetails', params: { id: product.id } });
    }
  },
  mounted() {
    // When the component is mounted, fetch the products
    this.fetchProducts();
  },
};
</script>

  
  <style scoped>
.product-page {
  display: flex;
  max-width: 1200px; /* Adjust based on your layout */
  margin: auto; /* Center the page */
}

.sidebar {
  flex: 0 0 250px; /* Sidebar width */
  padding: 20px;
  background: #f3f3f3; /* Sidebar background color */
}

.product-grid {
  flex-grow: 1; /* Take the remaining space */
  padding: 20px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Responsive grid layout */
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  background: #fff;
  text-align: center; /* Center text and content */
}

.product-card img {
  width: 100%;
  height: auto;
  margin-bottom: 10px; /* Space between image and product info */
}

.product-info {
  padding: 5px;
}

.product-info h3 {
  font-size: 0.9em;
  color: #333;
  margin-bottom: 5px;
}

.product-price {
  margin: 10px 0;
  font-size: 0.9em;
}

.product-price .original-price {
  text-decoration: line-through;
  margin-right: 5px;
}

.product-price .final-price {
  font-weight: bold;
}

.product-price .discount {
  color: #d9534f; /* Discount color */
  font-weight: bold;
}

.product-rating {
  display: flex;
  justify-content: center;
  font-size: 0.8em;
}

.product-rating .rating-value {
  margin-right: 5px;
}

.new-label {
  display: inline-block;
  background: #d9534f; /* New label background color */
  color: #fff;
  padding: 2px 5px;
  position: absolute;
  top: 10px;
  right: 10px;
}

  </style>
  