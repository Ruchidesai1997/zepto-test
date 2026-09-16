import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
      } catch (e) {
      } 
    };

    getData();
  }, []);

  const categories = ['All', ...new Set(data.map((item) => item.category))];
  const categoryCards = categories.filter((category)=>category!=='All').map((category)=>({
    name:category,image: data.find((item)=> item.category === category)?.image,
  }));
  
  const filteredProducts = selectedCategory === 'All' ? data : data.filter((item)=>item.category === selectedCategory);


  const addToCart = (product) => {
    setCart((currentCart) => {
      const existItem = currentCart.find((item) => item.product.id === product.id);
      if (existItem) {
        return currentCart.map((item) => item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }
      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, add) => {
    setCart((currentCart) => currentCart.map((item) => item.product.id === productId? { ...item, quantity: item.quantity + add }: item));
  };

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
 
  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Shop by category</h1>
        </div>
        <div className="cart_summary" aria-label={`${cartQuantity} items in cart`}>
          <span className="cart_icon" > cart </span>
          <span>{cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}</span>
        </div>
      </header>

      {(
        <main>
          <nav className="category_tabs">
            {categories.map((category) => (
              <button className={selectedCategory === category ? 'tab active' : 'tab'} key={category} onClick={() => setSelectedCategory(category)} type="button">
                {category === 'All' ? 'All products' : category}
              </button>
            ))}
          </nav>
          <section className="category-section" >
            <div className="section-heading">
              <div>
                <h2 id="category-heading">Display categories</h2>
              </div>
              <span className="item-count">{filteredProducts.length} products</span>
            </div>
            <div className="category-cards">
              {categoryCards.map((category) => (
                <button
                  className={selectedCategory === category.name ? 'category-card selected' : 'category-card'} key={category.name} onClick={() => setSelectedCategory(category.name)} type="button">
                  <img src={category.image} alt="" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="products-section">
            <div className="section-heading">
              <div>
                <h2 id="products-heading">
                  {selectedCategory === 'All' ? 'All products' : selectedCategory}
                </h2>
              </div>
            </div>
            <div className="product-grid">
              {filteredProducts.map((item) => (
                <div className="product-card" key={item.id}>
                  <div className="product-image-display">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="product-details">
                    <p className="product-category">{item.category}</p>
                    <h3>{item.title}</h3>
                    <div className="product-footer">
                      <strong>${item.price.toFixed(2)}</strong>
                      <button className="add-button" onClick={() => updateQuantity(item.id, 1)} type="button">
                       +
                      </button>
                      <button className="add-button" onClick={() => addToCart(item)} type="button">
                        ADD
                      </button>
                      <button className="remove-button" onClick={() => updateQuantity(item.id, -1)}type="button">
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
