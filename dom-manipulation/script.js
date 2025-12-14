const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
async function fetchServerQuotes() {
  const response = await fetch(SERVER_URL);
  const data = await response.json();

  // Simulate server quotes structure
  return data.slice(0, 5).map(item => ({
    text: item.title,
    category: "Server"
  }));
}
async function syncWithServer() {
  const serverQuotes = await fetchServerQuotes();

  const localQuotesJSON = JSON.stringify(quotes);
  const serverQuotesJSON = JSON.stringify(serverQuotes);

  if (localQuotesJSON !== serverQuotesJSON) {
    // Conflict resolution: server wins
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();

    document.getElementById("syncStatus").textContent =
      "⚠ Conflicts detected. Server data applied.";
  } else {
    document.getElementById("syncStatus").textContent =
      "✅ Data already in sync.";
  }
}
setInterval(() => {
  syncWithServer();
}, 30000); // every 30 seconds
document
  .getElementById("syncServer")
  .addEventListener("click", syncWithServer);
function manualResolve(useServer) {
  if (useServer) {
    syncWithServer();
  } else {
    saveQuotes();
    document.getElementById("syncStatus").textContent =
      "ℹ Local data preserved.";
  }
}

// Quotes array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "JavaScript powers the web.", category: "Programming" },
  { text: "Success comes from consistency.", category: "Motivation" }
];
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing categories except "All"
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(
      quote => quote.category === selectedCategory
    );
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes found for this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.innerHTML = `
    <p>"${filteredQuotes[randomIndex].text}"</p>
    <small>Category: ${filteredQuotes[randomIndex].category}</small>
  `;
}
function restoreLastFilter() {
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    document.getElementById("categoryFilter").value = savedCategory;
  }
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
populateCategories();
filterQuotes();



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
populateCategories();
restoreLastFilter();
filterQuotes();
