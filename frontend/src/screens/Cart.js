import React from 'react'
//import Delete from '@material-ui/icons/Delete'
import { FaTrashAlt } from "react-icons/fa";
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>Your Cart is Empty!!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
     console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
       <div className="container justify-content-center"><h2>My Cart</h2></div>
      {console.log(data)}
      <div className='container m-auto table-responsive  table-responsive-sm table-responsive-md' >

      <div className="row" >
  {data.map((food, index) => (
    <div key={index} className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">

          <h5 className="card-title">{food.name}</h5>
          <img
                                      src={food.img}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
          <p className="card-text">Quantity: {food.qty}</p>
          <p className="card-text">Option: {food.size}</p>
          <p className="card-text">Amount: ₹{food.price}/-</p>
          <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><FaTrashAlt /></button>
        </div>
      </div>
    </div>
  ))}
</div>

        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}