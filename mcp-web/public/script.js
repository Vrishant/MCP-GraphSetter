document.getElementById("sendBtn").addEventListener("click", async () => {
  const queryInput = document.getElementById("queryInput");
  const responseDiv = document.getElementById("response");
  const query = queryInput.value.trim();

  if (!query) {
    responseDiv.textContent = "Please enter a query.";
    return;
  }

  responseDiv.textContent = "Loading...";

  try {
    const res = await fetch("http://localhost:3000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = { error: "Unknown error" };
      }
      responseDiv.textContent = "Error: " + (errorData.error || "Unknown error");
      return;
    }

    let data;
    try {
      data = await res.json();
    } catch {
      responseDiv.textContent = "Error: Invalid JSON response from server";
      return;
    }
    // Show only the final message, not intermediate tool messages
    const finalMessage = data.response.split('\n').filter(line => !line.startsWith('[Tool:')).join('\n');
    responseDiv.innerHTML = marked.parse(finalMessage || "No response");
  } catch (err) {
    responseDiv.innerHTML = marked.parse("Error: " + err.message);
  }
});




//Fruit Management 

const attributesInnerBox = document.getElementById("attributesInnerBox");
const rowInnerBox = document.getElementById("rowInnerBox");
const columnInnerBox = document.getElementById("columnInnerBox");

// Load fruit list initially
async function loadFruits() {
  try {
    const response = await fetch("../assets/fruits.json");
    if (!response.ok) throw new Error("Failed to load fruits");
    const fruits = await response.json();

    attributesInnerBox.innerHTML = "";

    fruits.forEach(fruit => {
      const fruitDiv = createFruitElement(fruit);
      attributesInnerBox.appendChild(fruitDiv);
    });
  } catch (error) {
    attributesInnerBox.textContent = "Failed to load fruits.";
    console.error("Error loading fruits:", error);
  }
}

// Create a fruit div with buttons
function createFruitElement(fruitName) {
  const fruitDiv = document.createElement("div");
  fruitDiv.className = "fruit-item";
  fruitDiv.dataset.name = fruitName;

  fruitDiv.innerHTML = `
    <span>${fruitName}</span>
    <button onclick="moveFruit('${fruitName}', 'attributes')">Back</button>
  `;

  // <button onclick="moveFruit('${fruitName}', 'row')">To Row</button>
  // <button onclick="moveFruit('${fruitName}', 'column')">To Column</button>
    

  return fruitDiv;
}

// Core function: Move fruit by name and target
function moveFruit(fruitName, targetBox) {
  const boxes = {
    attributes: attributesInnerBox,
    row: rowInnerBox,
    column: columnInnerBox
  };

  if (!boxes[targetBox]) {
    alert(`Invalid target box: ${targetBox}`);
    return;
  }

  // Find the existing fruit element in any box
  let fruitElement = null;

  Object.values(boxes).forEach(box => {
    const items = box.querySelectorAll(".fruit-item");
    items.forEach(item => {
      if (item.dataset.name.toLowerCase() === fruitName.toLowerCase()) {
        fruitElement = item;
      }
    });
  });

  if (!fruitElement) {
    alert(`Fruit "${fruitName}" does not exist.`);
    return;
  }

  // Move the element to the target box
  boxes[targetBox].appendChild(fruitElement);
}


// Triggered by manual controls
function handleManualMove() {
  const fruitName = document.getElementById("fruitNameInput").value.trim().toLowerCase();
  const targetBox = document.getElementById("targetBoxInput").value.trim().toLowerCase();

  if (!fruitName || !targetBox) {
    alert("Please enter both fruit name and target box.");
    return;
  }

  moveFruit(fruitName, targetBox);
}

loadFruits();
