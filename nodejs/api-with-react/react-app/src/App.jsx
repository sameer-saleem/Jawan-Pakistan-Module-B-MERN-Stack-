import { useEffect, useState } from "react";

const App = () => {

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => {
        setProductsData(data.products || [] );   // ✅ store data
      })
      .catch(err => console.error(err));
    }, []);
    
    console.log(productsData, 'productsData');

  return (
    <div>
      <h1>Products</h1>
      {productsData.map((item, index) => (
        <div className="card" key={index}>
          <h4>{item.name}</h4>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
