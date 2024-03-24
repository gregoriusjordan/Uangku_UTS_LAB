document.addEventListener("DOMContentLoaded", function () {
    function handleSubmit(event) {
        event.preventDefault();

        let transactionName = document.getElementById("transactionName").value;
        let transactionNominal = document.getElementById("transactionNominal").value;
        let transactionType = document.getElementById("transactionType").value;
        let transactionIncome = "income";

        if (!transactionName || isNaN(transactionNominal)) {
            alert("Please enter valid data.");
            return;
        }
        
        let transaction = {
            name: transactionName,
            nominal: transactionNominal,
            type: transactionType,
            income: transactionIncome,
        };

        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        document.getElementById("transactionName").value = "";
        document.getElementById("transactionNominal").value = "";
        document.getElementById("transactionType").value = "";

        parent.postMessage({ type: "refresh" }, "*");
    }

    let submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.removeEventListener("click", handleSubmit);
        submitBtn.addEventListener("click", handleSubmit);
    }
});
