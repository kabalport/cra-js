import axios from "axios";

const instance = axios.create({
  baseURL:
    //"http://kakao-app-env.eba-kfsgeb74.ap-northeast-2.elasticbeanstalk.com/"
    "http://localhost:8080/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        alert("로그인이 필요합니다.");
        window.location.href = "/login";
        break;
      case 400:
        return Promise.resolve(error.response);
    }
  }
);

export { instance };

/**
    전체 상품 조회
**/
const getProducts = async (props) => {
  return await instance.get(`/products?page=${props}`);
};

const getProductDetails = async (props) => {
  return await instance.get(`/products/${props}`);
};

const getOptions = async (props) => {
  return await instance.get(`/products/${props}/option`);
};

const getOptionName = async (props) => {
  return await instance.get(`/options/${props}/name`);
};

const getCartList = async () => {
  return await instance.get("/carts");
};

const getOrderList = async (props) => {
  return await instance.get(`/orders/${props}`);
};

const deleteCart = async () => {
  return await instance.delete("/cart/clear");
};

export {
  getProducts,
  getProductDetails,
  getOptions,
  getCartList,
  getOrderList,
  getOptionName,
  deleteCart,
};
