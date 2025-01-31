document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "iPhone 13",
      price: 999,
      description:
        "The latest iPhone with A15 Bionic chip, 5G speed, and improved camera system.",
      images: [
        "media/iphone13/iphone13_1.webp",
        "media/iphone13/iphone13_2.webp",
        "media/iphone13/iphone13_3.webp",
      ],
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      price: 799,
      description:
        "Experience the new Samsung Galaxy S21 with its stunning display and powerful performance.",
      images: [
        "media/galaxy_s21/galaxy_s21_1.jpg",
        "media/galaxy_s21/galaxy_s21_2.jpg",
        "media/galaxy_s21/galaxy_s21_3.jpg",
      ],
    },
    {
      id: 3,
      name: "Google Pixel 6",
      price: 599,
      description:
        "Google's newest Pixel with Tensor chip, advanced camera features, and pure Android experience.",
      images: [
        "media/pixel6/pixel6_1.webp",
        "media/pixel6/pixel6_2.webp",
        "media/pixel6/pixel6_3.webp",
      ],
    },
  ];

  const storeContainer = document.querySelector(".store");
  const productDetails = document.querySelector(".product-details");
  const backToStoreButton = document.querySelector(".back-to-store");
  const productDescription = document.querySelector(".product-description");

  function createStore() {
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productName = document.createElement("h3");
      productName.textContent = product.name;

      const productPrice = document.createElement("p");
      productPrice.textContent = `$${product.price}`;

      const viewDetailsButton = document.createElement("button");
      viewDetailsButton.textContent = "View Details";
      viewDetailsButton.addEventListener("click", () =>
        viewProductDetails(product),
      );

      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(viewDetailsButton);

      storeContainer.appendChild(productDiv);
    });
  }

  function viewProductDetails(product) {
    storeContainer.classList.add("hidden");
    productDetails.classList.remove("hidden");
    productDescription.textContent = product.description;
    initSlider(product.images);
  }

  function backToStore() {
    storeContainer.classList.remove("hidden");
    productDetails.classList.add("hidden");
  }

  backToStoreButton.addEventListener("click", backToStore);

  createStore();
});
