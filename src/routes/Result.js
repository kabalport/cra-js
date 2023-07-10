import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/result.css";

import { getOrderList } from "../api";

function Result() {
  let [orderItems, setOrderItems] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const { orderId } = useParams();

  useEffect(() => {
    console.log(orderId);
    getOrderList(orderId).then((res) => {
      const order = res.data.response.products;

      setOrderItems(() => order);
      setTotalPrice(res.data.response.totalPrice);
    });
  }, []);

  /* * * * * * * * */

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <>
      <div id="result-title">
        <h3> 구매완료! </h3>
        <p>구매가 정상적으로 완료되었습니다. </p>
      </div>
      <div id="result-content">
        <div id="content-title"> 주문상품 정보 </div>
        <ul id="item-list">
          {orderItems?.map((item) => {
            return (
              <li key={`${item.id}-name`}>
                <div className="row"></div>
                <div className="row">
                  <div className="label">상품명</div>
                  <div>{item.productName}</div>
                </div>
                {item.items.map((option, idx) => {
                  return (
                    <>
                      <div className="row break"></div>
                      <div className="row">
                        <div className="label">옵션 {idx + 1}.</div>
                        <div>{option.optionName}</div>
                      </div>
                      <div className="row">
                        <div className="label">구매 수량</div>
                        <div>{option.quantity}</div>
                      </div>
                      <div className="row">
                        <div className="label">총 금액</div>
                        <div>{option.price}</div>
                      </div>
                    </>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="cart-box">
        <label id="cart-price-label"> 일반 결제 금액 </label>
        <span id="cart-price">{totalPrice}원</span>
        <button className="bottom-btn" onClick={handleOnClick}>
          {" "}
          쇼핑 계속하기{" "}
        </button>
      </div>
    </>
  );
}

export default Result;
