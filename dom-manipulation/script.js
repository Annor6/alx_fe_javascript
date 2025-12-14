// Quotes array
let quotes = [
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "JavaScript powers the web.", category: "Programming" },
  { text: "Success comes from consistency.", category: "Motivation" }
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Show random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = `"${quotes[randomIndex].text}"`;
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
    showRandomQuote();
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
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  showRandomQuote();
}

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize
showRandomQuote();
createAddQuoteForm();
