import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Card from './card';
import axios from 'axios';
import logo from './UI-Screen-1.png';

const Blog = () => <div><h2>Blog Page</h2></div>;
const ReleaseNotes = () => <div><h2>Release Notes Page</h2></div>;
const Status = () => <div><h2>Status Page</h2></div>;
const AboutUs = () => <div><h2>About Us Page</h2></div>;
const Careers = () => <div><h2>Careers Page</h2></div>;
const Legal = () => <div><h2>Legal Page</h2></div>;

function App() {
  const [items, setItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/cards")
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    const temp = items.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredItems(temp);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <div className="logo">
              <img src={logo} alt="Abstract Logo" /> 
              <span>Abstract | </span>
              <Link to="/help-center" className="help-center-link">Help Center</Link>
            </div>
            <ul>
              <li><button className="request-button">Submit a request</button></li>
            </ul>
          </nav>
        </header>

        <section className="hero">
          <h1>How can we help?</h1>
          <div className="search-box">
            <input
              type="text"
              placeholder="search"
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Search items"
            />
            <button onClick={() => {}} className="arrow" aria-label="Search">
              →
            </button>
          </div>
        </section>

        <main>
          <div className="content">
            {filteredItems.map((data) => (
              <Card key={data.id} title={data.title} desc={data.description} />
            ))}
          </div>
        </main>

        <footer className="footer">
          <div className="footer-section">
            <h3><Link to="/help-center">Abstract</Link></h3> 
            <ul>
              <li><Link to="/help-center">Branches</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              {/* Removed Help Center link from footer */}
              <li><Link to="/release-notes">Release Notes</Link></li>
              <li><Link to="/status">Status</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Community</h3>
            <ul>
              <li><Link to="/twitter">Twitter</Link></li>
              <li><Link to="/linkedin">LinkedIn</Link></li>
              <li><Link to="/facebook">Facebook</Link></li>
              <li><Link to="/dribbble">Dribbble</Link></li>
              <li><Link to="/podcast">Podcast</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/legal">Legal</Link></li>
              <li>Contact Us: saurabhbisht076@gmail.com</li>
            </ul>
          </div>
          <div className="footer-section copyright">
            ©Copyright 2022 <br/>Abstract Studio Design, <br/> Inc. All rights reserved.
          </div>
        </footer>

        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/release-notes" element={<ReleaseNotes />} />
          <Route path="/status" element={<Status />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;