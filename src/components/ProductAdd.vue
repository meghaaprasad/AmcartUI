<template>
  <div class="product-add-container">
    <h1>Add a New Product</h1>
    <form @submit.prevent="submitProduct" class="product-form">
      <div class="form-row">
        <div class="form-group">
          <label for="productName">Product Name:</label>
          <input type="text" id="productName" v-model="newProduct.name" required>
        </div>

        <div class="form-group">
          <label for="brand">Brand:</label>
          <input type="text" id="brand" v-model="newProduct.brand" required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" v-model="newProduct.category" required>
            <option value="">Select a category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div class="form-group">
          <label for="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" v-model="newProduct.imageUrl" required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group checkbox-group">
          <input type="checkbox" id="isNew" v-model="newProduct.isNew">
          <label for="isNew">Is New</label>
        </div>

        <div class="form-group small-input">
          <label for="priceOriginal">Original Price:</label>
          <input type="number" id="priceOriginal" v-model.number="newProduct.price.original" required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group small-input">
          <label for="priceFinal">Final Price:</label>
          <input type="number" id="priceFinal" v-model.number="newProduct.price.final" required>
        </div>

        <div class="form-group small-input">
          <label for="discountPercentage">Discount Percentage:</label>
          <input type="number" id="discountPercentage" v-model.number="newProduct.price.discountPercentage" required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group small-input">
          <label for="ratingValue">Rating Value:</label>
          <input type="number" step="0.1" id="ratingValue" v-model.number="newProduct.rating.value" required>
        </div>

        <div class="form-group small-input">
          <label for="ratingCount">Rating Count:</label>
          <input type="number" id="ratingCount" v-model.number="newProduct.rating.count" required>
        </div>
      </div>

      <div class="buttons-container">
        <button type="submit" class="btn add-btn" @click="submitProduct">Add Product</button>
        <button type="button" class="btn cancel-btn" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newProduct: {
          name: '',
          brand: '',
          category: '',
          imageUrl: '',
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
          }
        }
      };
    },
    methods: {
      async submitProduct() {
        try {
          await axios.post('https://gfpizy7vp9.execute-api.us-east-1.amazonaws.com/test/api/Products', this.newProduct);
          this.newProduct = {}; 
        } catch (error) {
          console.error('There was an error adding the product:', error);
          alert('Failed to add the product');
        }
        this.$router.push({ name: 'home' });
      },
      cancel() {
        this.$router.push({ name: 'home' });
    },
  },
};
  </script>
  
  <style scoped>
.product-add-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.product-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}

.form-row {
display: flex;
}

.form-group {
display: flex;
flex-direction: column;
flex-grow: 1;
}

.form-group:nth-child(odd) {
padding-right: 0.5rem;
}

.form-group:nth-child(even) {
padding-left: 0.5rem;
}

.form-group label {
margin-bottom: 0.5rem;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
padding: 0.5rem;
border: 1px solid #ccc;
border-radius: 4px;
}

.form-group.checkbox-group {
display: flex;
align-items: center;
margin-bottom: 0;
}

.form-group.checkbox-group label {
margin-left: 0.5rem;
}

.small-input input[type="number"] {
max-width: 150px; /* Reduces the width for amount inputs */
}

.buttons-container {
  display: flex;
  justify-content: start; /* Align buttons to the start of the container */
  gap: 10px; /* Add some space between buttons */
  padding-top: 1rem; /* Space above the buttons */
}

.btn {
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.add-btn {
  background-color: #5cb85c;
}

.add-btn:hover {
  background-color: #4cae4c;
}

.cancel-btn {
  background-color: #d9534f;
}

.cancel-btn:hover {
  background-color: #c9302c;
}

@media (max-width: 768px) {
.product-form {
grid-template-columns: 1fr;
}

.form-group:nth-child(odd),
.form-group:nth-child(even) {
padding-right: 0;
padding-left: 0;
}

.buttons-container {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .btn:last-child {
    margin-bottom: 0;
  }
}
</style>
  
  