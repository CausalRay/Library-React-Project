import Nav from "./components/Nav";
import React, {useState, useEffect} from "react";
import "./index.css"
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Page/Home";
import Books from "./Page/Books";
import { books } from "./data";
import BookInfo from "./Page/BookInfo";
import Cart from "./Page/Cart";


function App() {
  const [cart, setCart] = useState([])

  function addToCart(book) {
    setCart ([...cart, {...book, quantity:1}])
  }
 
  function changeQuantity(book ,quantity){
     setCart(cart.map (item => {
      return item.id === book.id ?
        {...item, quantity: +quantity, } : item 
     })
     )
  }

  function numberOfItems() {
    let counter = 0
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter
  }

  function removeItem(item){
    setCart(cart.filter(book => book.id !== item.id))
  }

  useEffect(() => {
    console.log(cart)
  }, [cart]);

  return (
    <Router >

  <div className="App">
  
    <Nav numberOfItems={numberOfItems()}/>
    <Routes>

    <Route path="/" element={<Home />}/>
    <Route path="/books" element={<Books books={books}/>} />
    <Route path="/books/:id" element={<BookInfo books={books} cart={cart} addToCart={addToCart}/>}  />
    <Route path="/cart" 
    element={<Cart 
    books={books} 
    cart={cart} 
    changeQuantity={changeQuantity} 
    removeItem={removeItem} />} />
   

    </Routes>
    <Footer />
  </div>
    </Router >
  );
}

export default App;
