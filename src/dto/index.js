export class LoginDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

export class ResDto {
  constructor({ success, response, error }) {
    this.responseValidation(success, response, error);
    this.success = success;
    this.response = response;
    this.error = error;
  }
  responseValidation(success, response, error) {
    if (typeof success !== "boolean") {
      throw new Error("Response success props must be a boolean");
    }

    if (response !== null && typeof response !== "object") {
      throw new Error("Response props must be an object");
    }

    if (typeof error !== "object") {
      throw new Error("Response error props must be an object");
    }

    if (
      error !== null &&
      (typeof error.message !== "string" || typeof error.staus !== "number")
    ) {
      throw new Error(
        "Response error props must be an object and have to have message and status props"
      );
    }
  }
}

export class GetProductPageDto {
  constructor({ page, limit }) {
    this.page = page;
    this.limit = limit;
  }
}

export class GetDataFromIdDto {
  constructor({ id }) {
    this.id = id;
  }
}

export class AddCardDto {
  constructor({ items }) {
    const notApprovedItems = items.filters(
      (item) => !item.optionId || !item.quantity
    );

    if (notApprovedItems.length > 0) {
      throw new Error("Not approved items");
    }

    this.items = items;
  }
}

export class ProductDto {
  constructor({ id, productName, price, description, image, options = [] }) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.description = description;
    this.image = image;
    this.options = options;
  }
}

export class CartDto {
  constructor({ products = [], totalPrice }) {
    this.products = products;
    this.totalPrice = totalPrice;
  }
}

export class CartResDto extends ResDto {
  constructor({ success, response, error }) {
    super({ success, response: new CartDto(response), error });
  }
}

export class EditCartReqDto {
  constructor({ carts }) {
    const notApprovedItems = carts.filters(
      (item) => !item.cartId || !item.quantity
    );

    if (notApprovedItems.length > 0) {
      throw new Error("Not approved items");
    }
    this.carts = carts;
  }
}

export class EditCartResDto extends ResDto {
  constructor({ success, response, error }) {
    const checkMalform = response.filters(
      (item) =>
        !item.carts ||
        !item.totalPrice ||
        !Array.isArray(item.carts) ||
        !Number.isInteger(item.totalPrice)
    );

    if (checkMalform.length > 0) {
      throw new Error("Malform response");
    }

    const cartItemsCheck = response.carts.filters(
      (item) =>
        !item.cartId ||
        !item.optionId ||
        !item.productName ||
        !item.quantity ||
        !item.price ||
        !Number.isInteger(item.cartId) ||
        typeof item.productName !== "string" ||
        !Number.isInteger(item.optionId) ||
        !Number.isInteger(item.quantity) ||
        !Number.isInteger(item.price)
    );

    if (checkMalform.length > 0 || cartItemsCheck.length > 0) {
      throw new Error("Invalid data type detected in cart response data.");
    }

    super({ success, response, error });
  }
}

export class OrderDto {
  constructor({ id, products, totalPrice }) {
    this.productsValidation(products);
    this.productsItemsValidation(products.items);
    this.id = id;
    this.products = products;
    this.totalPrice = totalPrice;
  }
  productsValidation(products) {
    const checkMalform = products.filters(
      (item) => !item.productName || !item.items || !Array.isArray(item.items)
    );
    if (checkMalform.length > 0) {
      throw new Error(
        "Invalid data type detected in order products resposne data."
      );
    }
  }
  productsItemsValidation(items) {
    const checkMalform = items.filters(
      (item) =>
        !item.id ||
        !item.optionName ||
        !item.quantity ||
        !item.price ||
        !Number.isInteger(item.id) ||
        typeof item.optionName !== "string" ||
        !Number.isInteger(item.quantity) ||
        !Number.isInteger(item.price)
    );
    if (checkMalform.length > 0) {
      throw new Error(
        "Invalid data type detected in order's product item resposne data."
      );
    }
  }
}

export class OrderResDto extends ResDto {
  constructor({ success, response, error }) {
    super({ success, response: new OrderDto(response), error });
  }
}
