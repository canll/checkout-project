const taxRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener("load", () => {
    localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);
    sessionStorage.setItem("taxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);
    //add after func. coding
    calculateCartTotal()
});

//capturing vs. bubbling
let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (e) => {
    //console.log(event.target);
    //minus buttons
    if (e.target.classList.contains("minus")) {
        // console.log("minusBtn clicked");
        if (e.target.nextElementSibling.innerText > 1) {
               // e.target.parentElement.lastElementChild.innerText;
            e.target.nextElementSibling.innerText--;
            //calculate Product and Cart Total
            //passing selectedProductInfo as parameter 
            calculateProductAndCartTotal(e.target.parentElement.parentElement);
        }
        else {
            if (confirm("Product will be removed!")) {
                e.target.parentElement.parentElement.parentElement.remove();
                //calculateCartTotal
                calculateCartTotal();
            }
        }
    }

    //plus buttons
    else if (e.target.className == "plus") {
        // console.log("plusBtn clicked");
        // e.target.parentElement.firstElementChild.innerText;
        e.target.previousElementSibling.innerText++;
        //calculate Product and Cart Total
        calculateProductAndCartTotal(e.target.parentElement.parentElement);
    }

    //remove buttons
    else if (e.target.className == "remove-product") {
        // console.log("removeBtn clicked");
        if (confirm("Product will be removed")) {
            e.target.parentElement.parentElement.parentElement.remove();
                    //calculateCartTotal
            calculateCartTotal()
        }

    }
    //other elements
    else {
        console.log("other elements clicked");
    }
})

const calculateProductAndCartTotal = (productInfoDiv) => {
    console.log(productInfoDiv);
    let productQuantity = productInfoDiv.querySelector("#product-quantity").innerText;
    let productPrice = productInfoDiv.querySelector("strong").innerText;
    let productTotalPriceDiv = productInfoDiv.querySelector(".product-line-price");
    productTotalPriceDiv.innerText = (productQuantity * productPrice).toFixed(2);

    calculateCartTotal();
}

const calculateCartTotal = () => {
    let productTotalPriceDivs = document.querySelectorAll(".product-line-price");
    // console.log(productTotalPriceDivs);
    let subtotal = 0;
    productTotalPriceDivs.forEach(eachProductTotalPriceDiv => {
        subtotal += parseFloat(eachProductTotalPriceDiv.innerText)
    });
    console.log(subtotal);
    let taxPrice = subtotal * localStorage.getItem("taxRate");
    console.log(taxPrice);
    let shipping = (subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0);
    console.log(shipping);
    let cartTotal = subtotal + taxPrice + shipping;
    console.log(cartTotal);

    document.querySelector("#cart-subtotal p:nth-child(2)").innerText = subtotal.toFixed(2);
    document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);
    document.querySelector("#cart-shipping p:nth-child(2)").innerText = shipping.toFixed(2);
    document.querySelector("#cart-total").lastElementChild.innerText = cartTotal.toFixed(2);
}