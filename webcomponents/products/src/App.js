import React from 'react';

const Product = (product) =>
  <li style={{ padding: "30px", listStyle: "none", border: "1px solid #CCC", margin: "5px" }}>
    <div><b>{ product }</b></div>
    <div>$ {(Math.random() * 100).toFixed(2)}</div>
    <button>Buy</button>
  </li>

export const App = () =>
  <section>
    <h2>Products</h2>
    <ul style={{ display: 'flex', padding: 0 }}>
      { ['Coca-Cola', 'Lays', 'Bread', 'Pizza'].map(Product) }
    </ul>
  </section>;
