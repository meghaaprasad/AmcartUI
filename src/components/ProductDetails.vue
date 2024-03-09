<template>
    <div class="product-details-container">
      <!-- Product Image -->
      <div class="product-image">
        <img :src="`/images/${product.imageUrl}`" :alt="product.name">
      </div>
  
      <!-- Product Info -->
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <div class="product-rating">
          <span class="rating-value">{{ product.rating.value }}</span>
          <span class="rating-count">{{ product.rating.count }} Ratings</span>
        </div>
        <div class="product-pricing">
          <span class="sale-price">{{ product.price.currency }}{{ product.price.final }}</span>
          <span class="original-price">{{ product.price.currency }}{{ product.price.original }}</span>
          <span class="discount">({{ product.price.discountPercentage }}% OFF)</span>
        </div>
        <div class="size-selection">
          <label for="size">Select Size</label>
          <select name="size" id="size">
            <!-- Dynamically generate size options here -->
          </select>
        </div>
        <button class="add-to-bag-btn">ADD TO BAG</button>
        <button class="wishlist-btn">WISHLIST</button>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        product: null,
      };
    },
    methods: {
      fetchProductDetails() {
        const productId = this.$route.params.id;
        console.log('calling fetchProductDetails');
        axios.get(`http://localhost:5001/api/Products/${productId}`) // Update the URL to match your API
          .then(response => {
            console.log(response.data);
            this.product = response.data;
          })
          .catch(error => {
            console.error("There was an error fetching the product details: ", error);
          });
      }
    },
    created() {
      this.fetchProductDetails();
    },
  };
  </script>

<style scoped>
.product-details-container {
  display: flex;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.product-image img {
  width: 100%;
  max-width: 400px; /* Adjust as necessary */
}

.product-info {
  margin-left: 20px;
}

.product-rating .rating-value {
  font-weight: bold;
  color: #333;
}

.product-pricing .sale-price {
  color: #d9534f; /* Adjust color as necessary */
  font-size: 1.5em;
  font-weight: bold;
}

.product-pricing .original-price {
  text-decoration: line-through;
  margin-left: 10px;
}

.product-pricing .discount {
  color: #d9534f; /* Adjust color as necessary */
  font-weight: bold;
  margin-left: 10px;
}

.size-selection {
  margin: 20px 0;
}

.add-to-bag-btn,
.wishlist-btn {
  margin: 10px 0;
  padding: 10px 20px;
  border: none;
  background-color: #d9534f; /* Adjust color as necessary */
  color: white;
  cursor: pointer;
}

.add-to-bag-btn:hover,
.wishlist-btn:hover {
  background-color: #c9302c; /* Darker shade for hover state */
}

.wishlist-btn {
  background-color: transparent;
  color: #d9534f;
  border: 1px solid #d9534f;
}

.wishlist-btn:hover {
  background-color: #d9534f;
  color: white;
}
</style>
  