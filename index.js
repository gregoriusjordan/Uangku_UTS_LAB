document.addEventListener("DOMContentLoaded", function () {
  var username = localStorage.getItem("username");
  $("#welcome").append("<h2>Hello, " + "<b>"+ username +".</b>" + "</h2>");

  function displayTransactions() {
      let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      let totalIncome = 0;
      let totalOutcome = 0;

      let selectedType = document.getElementById("transactionType").value;

      let transactionCardBody = document.getElementById("transactionCardBody");
      if (transactions.length > 0) {
          transactionCardBody.innerHTML = "";
          transactions.forEach(function (transaction) {
              if (selectedType === "all" || transaction.income === selectedType || transaction.outcome === selectedType) {
                  let transactionElement = document.createElement("div");
                  if (transaction.income === "income") {
                      transactionElement.className =
                          "row border rounded-2 my-2 mx-2 px-2 py-3 bg-success text-white";
                      totalIncome += parseFloat(transaction.nominal); 
                  } else {
                      transactionElement.className =
                          "row border rounded-2 my-2 mx-2 px-2 py-3 bg-danger text-white";
                      totalOutcome += parseFloat(transaction.nominal); 
                  }
                  let nameType = document.createElement("div");
                  nameType.className = "col-md-4";
                  let nameElement = document.createElement("div");
                  nameElement.textContent = transaction.name;
                  nameElement.className = "fw-bold fs-4";
                  let typeElement = document.createElement("div");
                  typeElement.textContent = transaction.type;
                  typeElement.className = "";
                  let nominalElement = document.createElement("div");
                  nominalElement.textContent = transaction.nominal;
                  nominalElement.className =
                      "col d-flex justify-content-end text-lg fw-bold fs-2 mt-2";

                  transactionElement.appendChild(nameType);
                  nameType.appendChild(nameElement);
                  nameType.appendChild(typeElement);
                  transactionElement.appendChild(nominalElement);

                  transactionCardBody.appendChild(transactionElement);
              }
          });
      } else {
          transactionCardBody.innerHTML =
              "<p class='card-text'>Belum ada transaksi sejauh ini.</p>";
      }

      let balance = totalIncome - totalOutcome; 
      let balanceElement = document.getElementById("balance");
      balanceElement.textContent = balance;
      balanceElement.className = "fw-bold text-center";
  }

  displayTransactions();

  document.getElementById("resetButton").addEventListener("click", function () {
      localStorage.removeItem("transactions");

      document.getElementById("balance").textContent = "0";
      document.getElementById("transactionCardBody").innerHTML =
          "<p class='card-text'>Belum ada transaksi sejauh ini.</p>";
  });

  document.getElementById("transactionType").addEventListener("change", function () {
      displayTransactions(); 
});

})
