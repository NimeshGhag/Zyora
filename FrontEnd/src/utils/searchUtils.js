export const normalizeQuery = (q) => String(q || "").trim().toLowerCase();

export const filterProducts = (products = [], query) => {
  const q = normalizeQuery(query);
  if (!q) return [];
  return (products || []).filter((p) => {
    const hay = [p.title, p.description, p.category, p.id]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
};

export default { normalizeQuery, filterProducts };
