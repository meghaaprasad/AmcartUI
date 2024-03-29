<template>
  <div class="container">
    <aside class="sidebar">
      <h2>FILTERS</h2>
      <section class="filter-section">
        <h3>Brands</h3>
        <div v-for="category in categories" :key="category.name" class="category">
          <input type="checkbox" :id="category.name" v-model="selectedCategories" :value="category.name" @change="applyFilters">
          <label :for="category.name">{{ category.name }}</label>
        </div>
      </section>
      <section class="filter-section">
        <h3>Gender</h3>
        <div v-for="gender in genderFilter" :key="gender.name" class="category">
          <input type="checkbox" :id="gender.name" v-model="selectedGenders" :value="gender.name" @change="applyFilters">
          <label :for="gender.name">{{ gender.name }}</label>
        </div>
      </section>
    </aside>

    <main class="main-content">

      <section class="product-grid">
        <div class="products">
          <article v-for="product in filteredProducts" :key="product.id" class="product-card" @click="selectProduct(product)">
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
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [
        { name: 'Zara' },
        { name: 'H and M' },
        { name: 'Roadster' },
        { name: 'Mothercare' },
      ],
      genderFilter: [
        { name: 'Men' },
        { name: 'Women' },
        { name: 'Kids' },
      ], 
      products: [],
      filteredProducts: [],
      selectedCategories: [],
      selectedGenders: [],
      sortKey: 'recommended',
    };
  },
  methods: {
    applyFilters() {
      let results = this.products;

      // Filter by selected brands if any
      if (this.selectedCategories.length > 0) {
        results = results.filter(product =>
          this.selectedCategories.includes(product.brand)
        );
      }

      // Filter by selected genders /category if any
      if (this.selectedGenders.length > 0) {
        results = results.filter(product =>
          this.selectedGenders.some(gender => product.category === gender)
        );
      }

      this.filteredProducts = results;
    },
    async fetchProducts() {
      try {
        
        const response = await axios.get('https://gfpizy7vp9.execute-api.us-east-1.amazonaws.com/test/api/Products');
        this.products = response.data;
        this.filteredProducts = [...this.products];
      } catch (error) {
        console.error("There was an error fetching the products:", error);
      }
    },
    filterAndSortProducts() {
      let tempProducts = [...this.products];

      if (this.selectedCategories.length) {
        tempProducts = tempProducts.filter(product =>
          this.selectedCategories.includes(product.category));
      }

      if (this.sortKey === 'priceLowHigh') {
        tempProducts.sort((a, b) => a.price.final - b.price.final);
      } else if (this.sortKey === 'priceHighLow') {
        tempProducts.sort((a, b) => b.price.final - a.price.final);
      }

      this.filteredProducts = tempProducts;
    },
    selectProduct(product) {
      this.$router.push({ name: 'ProductDetails', params: { id: product.id } });
    },
    async searchProducts() {
    const searchQuery = this.$route.query.search;
    try {     
      const response = await axios.get(`https://gfpizy7vp9.execute-api.us-east-1.amazonaws.com/test/api/Search?searchTerm=${searchQuery}`);    
      this.filteredProducts = response.data;
    } catch (error) {
      console.error("There was an error fetching the filtered products: ", error);
    }
  },
  },
  watch: {
    selectedCategories: 'filterAndSortProducts',
    sortKey: 'filterAndSortProducts',
  
  '$route.query.search': {
    immediate: true,
    handler() {
      if (this.$route.query.search) {
        this.searchProducts();
      } else {
        this.fetchProducts();
      }
    },
  },
},
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  max-width: 100%;
  margin-top: 60px; 
}

.sidebar {
  flex: 0 0 250px;
  padding: 20px;
  background: #f3f3f3;
  height: 100vh;
  overflow-y: auto; 
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.banner img {
  width: 100%;
  display: block; 
  height: 20%; 
  margin-bottom: 20px; 
}

.product-grid {
margin-top: 20px;
}

.products {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
gap: 20px;
}

.product-card {
border: 1px solid #ddd;
padding: 10px;
background: #fff;
text-align: center;
position: relative;
}

.product-card img {
width: 100%;
height: auto;
margin-bottom: 10px;
}

.product-info {
padding: 5px;
}

.product-info h3, .product-info p {
font-size: 0.9em;
color: #333;
margin: 5px 0;
}

.product-price .original-price {
text-decoration: line-through;
margin-right: 5px;
}

.product-price .final-price {
font-weight: bold;
}

.product-price .discount {
color: #d9534f;
font-weight: bold;
}

.product-rating {
display: flex;
justify-content: center;
align-items: center;
font-size: 0.8em;
}

.product-rating .rating-value {
margin-right: 5px;
}

.new-label {
display: inline-block;
background: #d9534f;
color: #fff;
padding: 2px 5px;
position: absolute;
top: 10px;
right: 10px;
}

.product-card:hover {
box-shadow: 0 4px 8px rgba(0,0,0,0.2);
cursor: pointer;
}
</style>