<template>
  <div class="product-page">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="loading" class="loading-message">
      Loading product details...
    </div>

    <div v-else class="product-details-container">
      <div class="product-image-container">
        <img :src="`/images/${product.imageUrl}`" :alt="product.name" class="product-image">
      </div>
      <div class="product-info-container">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-brand">{{ product.brand }}</p>
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
          <label for="size" class="size-label">Select Size:</label>
          <select name="size" id="size" class="size-dropdown">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <!-- Add more size options as needed -->
          </select>
        </div>
        <div class="product-description">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="buttons">
          <button class="add-to-bag-btn">ADD TO BAG</button>
          <button class="wishlist-btn">WISHLIST</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        imageUrl: '',
        name: '',
        brand: '',
        category: '',
        isNew: false,
        price: {
          currency: 'Rs.',
          original: 0,
          final: 0,
          discountPercentage: 0
        },
        rating: {
          value: 0,
          count: 0
        },
        sizes: ['S', 'M', 'L', 'XL', 'XXL'], // Example sizes, add more as needed
      },
      loading: true,
    };
  },
  methods: {
    fetchProductDetails() {
      const productId = this.$route.params.id;
      this.loading = true;
      axios.get(`https://gfpizy7vp9.execute-api.us-east-1.amazonaws.com/test/api/Products/${productId}`)
        .then(response => {
          this.product = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
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
  max-width: 70%;
  margin: auto;
  padding: 20px;
  gap: 20px;
  align-items: flex-start;
}

.product-image-container {
  flex: 1;
  max-width: 50%;
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
}

.product-info-container {
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 2em;
  margin-bottom: 0.25em;
}

.product-brand {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 0.5em;
}

.product-rating .rating-value {
  font-weight: bold;
  margin-right: 5px;
}

.product-rating .rating-count {
  font-size: 0.9em;
}

.product-pricing .sale-price {
  color: #d9534f;
  font-size: 1.8em;
  font-weight: bold;
}

.product-pricing .original-price {
  text-decoration: line-through;
  margin-left: 10px;
  font-size: 1.2em;
  color: #666;
}

.product-pricing .discount {
  color: #d9534f;
  font-weight: bold;
  margin-left: 10px;
}

.size-selection .size-label {
  font-size: 1.2em;
  margin-right: 10px;
}

.size-dropdown {
  padding: 10px;
  margin-bottom: 20px;
}

.buttons .add-to-bag-btn,
.buttons .wishlist-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  font-size: 1em;
  cursor: pointer;
}

.add-to-bag-btn {
  background-color: #d9534f;
  color: white;
}

.wishlist-btn {
  background-color: transparent;
  color: #d9534f;
  border: 1px solid #d9534f;
}

.add-to-bag-btn:hover,
.wishlist-btn:hover {
  opacity: 0.9;
}

.product-description p {
  margin-top: 20px; 
  font-size: 1em;
  color: #333;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .product-details-container {
    flex-direction: column;
  }

  .product-image-container,
  .product-info-container {
    max-width: 100%;
  }

  .product-image {
    margin-bottom: 20px;
  }
}
</style>
