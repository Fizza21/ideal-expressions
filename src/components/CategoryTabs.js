import React from "react";

export default function CategoryTabs({ activeCategory, setActiveCategory }) {

  const categories = [
    "ALL",
    "LIPS",
    "FACE",
    "EYES",
    "BODY"
  ];

  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <button
          key={category}
          className={
            activeCategory === category
              ? "category-tab active"
              : "category-tab"
          }
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}