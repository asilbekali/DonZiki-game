// uzur domla stil berishga ulrgurmadim vazifa kopayib ketgani uchun

let main = document.querySelector(".box");
let karzinka = document.querySelector(".bag");



function to_html(products) {
    products.forEach((product) => {
        main.insertAdjacentHTML(
            "beforeend",
            `<div class="card">
                <h1>${product.title}</h1>
                <p>Price: ${product.price} $</p>
                <p>${product.description}</p>
                <button data-price="${product.price}">Buy</button>
            </div>
            <a href="./trashbin.html">Karzinka</a>`
        );
    });
}

fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((res) => to_html(res));

let purchaseCounts = JSON.parse(localStorage.getItem("purchaseCounts")) || {};
let totalCosts = JSON.parse(localStorage.getItem("totalCosts")) || {};

main?.addEventListener("click", (e) => {
    if(e.target.textContent == "clear"){
        localStorage.clear()
    }



    if (e.target.textContent === "Buy") {
        let productName = e.target.closest(".card").querySelector("h1").textContent;
        let productPrice = parseFloat(e.target.dataset.price);

        if (!purchaseCounts[productName]) {
            purchaseCounts[productName] = 0;
            totalCosts[productName] = 0;
        }
        purchaseCounts[productName] += 1;
        totalCosts[productName] += productPrice;

        localStorage.setItem("purchaseCounts", JSON.stringify(purchaseCounts));
        localStorage.setItem("totalCosts", JSON.stringify(totalCosts));

        console.log(
            `${productName} xarid qilindi. Jami: ${purchaseCounts[productName]} marta. Umumiy summa: ${totalCosts[productName]} $`
        );
    }
});

function karzin(data, costs) {
    let totalSum = 0;

    Object.entries(data).forEach(([productName, count]) => {
        let productTotal = costs[productName] || 0;
        totalSum += productTotal;

        karzinka?.insertAdjacentHTML(
            "beforeend",
            `<div class="card">
                <h1>${productName}</h1>
                <p>Jami: ${count} dona</p>
                <p>Umumiy summa: ${productTotal.toFixed(2)} $</p>
            </div>`
        );
    });

    let totalHeading = document.createElement("h1");
    totalHeading.textContent = `Jami xarajat: ${totalSum.toFixed(2)} $`;
    karzinka?.insertAdjacentElement("afterbegin", totalHeading);
}

if (karzinka) {
    karzin(purchaseCounts, totalCosts);
}
