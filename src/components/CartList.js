import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "../styles/cartList.css";

import { instance } from "../api";

function CartList({ items, getCartItems }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(items);

  useEffect(() => {
    if (cartItems.length === 0) {
      alert("장바구니에 담긴 상품이 없습니다.");
      navigate("/");
    }
    console.log(cartItems);
  }, [cartItems.length, navigate]);

  const handleOnClick = async () => {
    let payload = [];
    cartItems.map((v) => {
      v.carts.map((op) => {
        payload.push({ cartId: op.id, quantity: op.quantity });
      });
    });

    await instance.post("/carts/update", payload).then((response) => {
      console.log(response.data);
    });

    navigate("/order");
  };

  /* Counter 에 있던 함수 */
  const handleIncrease = (productIndex, optionId) => {
    const addItem = cartItems.map((item, index) => {
      if (index !== productIndex) return item;
      return {
        ...item,
        carts: item.carts.map((cart) => {
          if (cart.option.id !== optionId) return cart;
          return {
            ...cart,
            quantity: cart.quantity + 1,
          };
        }),
      };
    });
    setCartItems(addItem);
    getCartItems(addItem);
  };

  const handleDecrease = (productIndex, optionId) => {
    const subtractItem = cartItems.map((item, index) => {
      if (index !== productIndex) return item;
      return {
        ...item,
        carts: item.carts.map((cart) => {
          if (cart.option.id !== optionId) return cart;
          return {
            ...cart,
            quantity: cart.quantity - 1,
          };
        }),
      };
    });
    setCartItems(subtractItem);
    getCartItems(subtractItem);
  };

  const handleChange = (itemId) => {
    setCartItems(itemId);
    getCartItems(itemId);
  };
  /* * * * * */

  /** 전체 주문 예상 금액 **/
  const pricesForCart = cartItems.map((item) => {
    let totalPrice = 0;
    item.carts.map((option) => {
      totalPrice += option.option.price * option.quantity;
    });
    return totalPrice;
  });

  const TotalPriceForCart = pricesForCart.reduce((a, b) => a + b, 0);
  /* * * * * * * * * * */
  return (
    <>
      <div className="cart-box">
        <div id="content-title"> 장바구니 </div>
        <div>
          {cartItems?.map((item, i) => (
            <div key={i}>
              <div id="cart-title"> {item?.productName} </div>
              {item.carts.map((option) => (
                <div className="cart-item" key={`option-${option.id}`}>
                  <li id="cart-item-title"> {option?.option?.optionName} </li>
                  <li>
                    <div id="cart-item-count">
                      <InputGroup className="mb-3" id="cart-item-count-btn">
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            handleDecrease(i, option?.option?.id);
                          }}
                          disabled={option.quantity == 1 ? true : false}
                        >
                          -
                        </Button>
                        <Form.Control
                          id="cart-item-box"
                          value={option.quantity}
                          onChange={handleChange}
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => {
                            handleIncrease(i, option?.option?.id);
                          }}
                        >
                          +
                        </Button>
                      </InputGroup>
                      <div id="cart-item-price">
                        {option.quantity * option.option.price}원
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="cart-box">
        <label id="cart-price-label"> 주문 예상 금액</label>
        <span id="cart-price">{TotalPriceForCart}원</span>
        <button className="bottom-btn" type="submit" onClick={handleOnClick}>
          {" "}
          주문하기{" "}
        </button>
      </div>
    </>
  );
}

export default CartList;
