// script.js

document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}

function addRadical() {
  const radicalInput = document.getElementById("radicalInput");
  radicalInput.value += "√";
  radicalInput.focus(); // Focus on the input field
}


function simplifyRadical() {
  const radicalInput = document.getElementById("radicalInput").value;
  const simplifiedRadical = simplify(radicalInput);
  document.getElementById("simplifiedRadical").textContent = simplifiedRadical;
}

function convertToFraction() {
  const decimalInput = document.getElementById("decimalInput").value;
  const fractionResult = decimalToFraction(decimalInput);
  document.getElementById("fractionResult").textContent = fractionResult;
}

function simplify(radical) {
  const matches = radical.match(/(\d*)\*?√(\d+)/);
  if (!matches) return "Invalid input";

  const coefficient = matches[1] ? parseInt(matches[1]) : 1;
  const radicand = parseInt(matches[2]);

  // Check if the radicand is a perfect square
  const sqrt = Math.sqrt(radicand);
  if (Number.isInteger(sqrt)) {
    // If it's a perfect square, return the square root without the radical
    return coefficient === 1 ? sqrt.toString() : (coefficient * sqrt).toString();
  }

  // Find the largest square that the radicand is divisible by
  let largestSquare = 1;
  for (let i = 2; i <= radicand; i++) {
    if (radicand % (i * i) === 0) {
      largestSquare = i;
    }
  }

  // If no square is found, return the original radical
  if (largestSquare === 1) {
    return radical;
  }

  // Construct the simplified radical
  const coefficientPart = coefficient === 1 ? '' : coefficient.toString();
  const radicandPart = radicand / (largestSquare * largestSquare);
  return coefficientPart + largestSquare + '√' + radicandPart;
}


function decimalToFraction(decimal) {
  const tolerance = 1.0E-13;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let n = Math.floor(decimal);
  let a, h = h1, k = k1;

  while (decimal - n > tolerance * k * k) {
    a = Math.floor(1 / (decimal - n));
    [h1, h2, k1, k2] = [a * h1 + h2, h1, a * k1 + k2, k1];
    n = Math.floor((h1 * decimal + h2) / k1);
    h = h1;
    k = k1;
  }
  return h + "/" + k;
}
