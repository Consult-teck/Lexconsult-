import { useState } from "react";
import { LAWYERS, SPECIALIZATIONS } from "../data/store";
import LawyerCard from "../components/LawyerCard";
import "./Lawyers.css";

const LOCATIONS = [...new Set(LAWYERS.map(l => l.location))];

export default function Lawyers() {
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("All");
  const [location, setLocation] = useState("All");
  const [available, setAvailable] = useState(false);
  const [sort, setSort] = useState("rating");

  const filtered = LAWYERS
    .filter(l => {
      const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.specialization.toLowerCase().includes(search.toLowerCase());
      const matchSpec = spec === "All" || l.specialization === spec;
      const matchLoc = location === "All" || l.location === location;
      const matchAvail = !available || l.available;
      return matchSearch && matchSpec && matchLoc && matchAvail;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "experience") return b.experience - a.experience;
      if (sort === "fee_asc") return a.fee - b.fee;
      if (sort === "fee_desc") return b.fee - a.fee;
      return 0;
    });

  return (
    <div>
      <div className="page-hero">
        <span className="hero-eyebrow" style={{ borderColor: "rgba(201,168,76,0.3)", color: "var(--gold)" }}>Find Legal Help</span>
        <h1>Our Legal Experts</h1>
        <div className="gold-line"></div>
        <p>Browse verified lawyers by specialty, location, and availability.</p>
      </div>

      <section className="section lawyers-list-section">
        <div className="container">
          {/* Filters */}
          <div className="filters-bar">
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="filter-search"
            />
            <select value={spec} onChange={e => setSpec(e.target.value)}>
              <option value="All">All Specializations</option>
              {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={location} onChange={e => setLocation(e.target.value)}>
              <option value="All">All Locations</option>
              {LOCATIONS.map(l => <option key={l}>{l}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="rating">Sort: Top Rated</option>
              <option value="experience">Sort: Most Experienced</option>
              <option value="fee_asc">Sort: Fee (Low–High)</option>
              <option value="fee_desc">Sort: Fee (High–Low)</option>
            </select>
            <label className="toggle-label">
              <input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} />
              <span>Available Only</span>
            </label>
          </div>

          <div className="results-count">
            Showing <strong>{filtered.length}</strong> lawyer{filtered.length !== 1 ? "s" : ""}
          </div>

          {filtered.length > 0 ? (
            <div className="grid-3">
              {filtered.map(l => <LawyerCard key={l.id} lawyer={l} />)}
            </div>
          ) : (
            <div className="no-results">
              <span>🔍</span>
              <h3>No lawyers found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
