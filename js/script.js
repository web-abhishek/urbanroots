document.addEventListener("DOMContentLoaded", function () {
  // Get all tab items and content areas
  const tabItems = document.querySelectorAll(".sidebar-item");
  const tabContents = document.querySelectorAll(".tab-content");

  // Add click event listeners to each tab item
  tabItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all tab items and contents
      tabItems.forEach((tab) => tab.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab item
      this.classList.add("active");

      // Show corresponding content area
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
});
