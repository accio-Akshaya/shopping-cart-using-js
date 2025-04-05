document.addEventListener("DOMContentLoaded", () => {
  const allItems = document.querySelectorAll(".item");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter");
  const addButtons = document.querySelectorAll(".addBtn");

  const colorInputs = document.querySelectorAll('input[name="color"]');
  const sizeInputs = document.querySelectorAll('input[name="size"]');
  const priceInputs = document.querySelectorAll('input[name="prange"]');
  const ratingRange = document.getElementById("range");
  const applyBtn = document.querySelector("section button"); // Sidebar filter button

  // ✅ ADD TO CART logic (with null checks and safe access)
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".item");
      if (!item) return alert("Item element not found");
  
      const img = item.querySelector("img");
      const size = item.querySelector(".sized");
      const price = item.querySelector(".price");
  
      // Make sure all elements exist
      if (!img || !size || !price) {
        console.warn("Missing product data:", { img, size, price });
        return alert("Product data is missing. Cannot add to cart.");
      }
  
      const product = {
        id: img.alt.trim() + size.textContent.trim(),
        name: img.alt.trim(),
        image: img.src,
        price: parseFloat(price.textContent.replace("$", "")),
        size: size.textContent.trim(),
        quantity: 1,
      };
  
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Filter out any bad/null items
      cart = cart.filter((item) => item && item.id);
  
      const existing = cart.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(product);
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    });
  });
  

  // 🔍 Filter by Category
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.textContent.toLowerCase();
      document.querySelector(".filter.active")?.classList.remove("active");
      btn.classList.add("active");

      allItems.forEach((item) => {
        const section = item.closest("section")?.querySelector("h1")?.textContent.toLowerCase();
        item.style.display = (category === "all" || section?.includes(category)) ? "block" : "none";
      });
    });
  });

  // 🔎 Search
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    allItems.forEach((item) => {
      const title = item.querySelector("img")?.alt.toLowerCase() || "";
      item.style.display = title.includes(query) ? "block" : "none";
    });
  });

  // 🧩 Apply Sidebar Filters
  applyBtn?.addEventListener("click", () => {
    const selectedColors = Array.from(colorInputs).filter((c) => c.checked).map((c) => c.value.toLowerCase());
    const selectedSizes = Array.from(sizeInputs).filter((s) => s.checked).map((s) => s.value.toUpperCase());
    const selectedPrices = Array.from(priceInputs).filter((p) => p.checked).map((p) => p.value);
    const selectedRating = parseFloat(ratingRange.value);

    allItems.forEach((item) => {
      let match = true;

      const sizesText = item.querySelector(".sized")?.textContent || "";
      const sizes = sizesText.split(",").map((s) => s.trim());
      if (selectedSizes.length && !selectedSizes.some((size) => sizes.includes(size))) match = false;

      const itemColors = Array.from(item.querySelectorAll(".circle")).map((c) => c.style.backgroundColor.toLowerCase());
      if (selectedColors.length && !selectedColors.some((color) => itemColors.includes(color))) match = false;

      const priceText = item.querySelector(".price")?.textContent || "$0";
      const price = parseFloat(priceText.replace("$", ""));
      if (selectedPrices.length) {
        const priceMatch = selectedPrices.some((range) => {
          if (range === "100") return price >= 100;
          const [min, max] = range.split("-").map(Number);
          return price >= min && price <= max;
        });
        if (!priceMatch) match = false;
      }

      const rating = 4; // hardcoded for now
      if (rating < selectedRating) match = false;

      item.style.display = match ? "block" : "none";
    });
  });
});
