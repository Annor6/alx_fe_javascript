// Quotes array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "JavaScript powers the web.", category: "Programming" },
  { text: "Success comes from consistency.", category: "Motivation" }
];
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}


// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Show random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);

  quoteDisplay.innerHTML = `
    <p>"${quotes[randomIndex].text}"</p>
    <small>Category: ${quotes[randomIndex].category}</small>
  `;

  sessionStorage.setItem(
    "lastQuote",
    JSON.stringify(quotes[randomIndex])
  );
}



// Create Add Quote Form dynamically (advanced DOM)
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.placeholder = "Enter a new quote";
  quoteInput.id = "dynamicQuoteText";

  const categoryInput = document.createElement("input");
  categoryInput.placeholder = "Enter quote category";
  categoryInput.id = "dynamicQuoteCategory";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";

  addBtn.addEventListener("click", function () {
    const text = quoteInput.value.trim();
    const category = categoryInput.value.trim();

    if (text === "" || category === "") {
      alert("Please fill in all fields");
      return;
    }

    quotes.push({ text, category });
    quoteInput.value = "";
    categoryInput.value = "";
    displayRandomQuote();

  });

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addBtn);

  document.body.appendChild(formDiv);
}

// Add quote using static form
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text === "" || category === "") {
    alert("Please fill in all fields");
    return;
  }

  quotes.push({ text, category });
saveQuotes();
displayRandomQuote();


}

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize
displayRandomQuote();

createAddQuoteForm();
function exportToJson() {
  const blob = new Blob(
    [JSON.stringify(quotes, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}
document
  .getElementById("exportQuotes")
  .addEventListener("click", exportToJson);
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
    displayRandomQuote();
  };

  fileReader.readAsText(event.target.files[0]);
}
displayRandomQuote();
