import React, {useState} from "react";
import './styles/main.css';
import './App.css';

const categories = [
  {
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1513442542250-854d436a73f2?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Start your day with energy.",
  },
  {
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1078&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Sweet treats to end the day.",
  },
  {
    name: "Drinks",
    image: "https://plus.unsplash.com/premium_photo-1687354253403-1a7500195e47?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Refreshing beverages for every mood.",
  },
  {
    name: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Plant-based and delicious.",
  },
  {
    name: "Snacks",
    image: "https://plus.unsplash.com/premium_photo-1679591002405-13fec066bd53?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Quick bites and munchies.",
  },
  {
    name: "Dinner",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Hearty meals to end your day.",
  },
];

const App = () => {
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  // handle search submitted
  const handleSearch = async (e) =>{
    e.preventDefault();
    if(!query) return;

    try{
      const res = await fetch(
       `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${query}&number=6&addRecipeInformation=true&sort=popularity&apiKey=${apiKey}`
      );
 
      const data = await res.json();
      if(data.results && data.results.length > 0){
        setMeal(data.results[0]);
        setError("");
        console.log("Meal data:", data.results[0]);
      }else{
        setMeal(null);
        setError(`No recipe found for "${query}"`);
      }
    }catch (err){
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };
  const getIngredients = (meal) => {
    if (!meal.extendedIngredients) return [];
    return meal.extendedIngredients.map(ing => ing.original);
  };


  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="text">
          <div className="masking-container">
            <h1 className="masked-text">Discover Delicious Recipes Anytime</h1>
          </div>
          <p>
            From breakfast to dinner and everything in between discover a world
            of recipes crafted to satisfy every craving, taste, and occasion. Whether
            you're cooking for one or a family feast, there's something delicious waiting for you.
          </p>
          <button className="button" onClick={() =>{
            const input = document.querySelector('.recipe-search-section input');
            if (input){
              input.scrollIntoView({behavior: 'smooth', block: 'center'});
              setTimeout(() => input.focus(),500);
            }
          }}>Explore Recipes</button>
        </div>
        <div className="hero-image">
          <img src="/food.jpg" alt="Delicious Food" />
        </div>
      </section>

      {/* Categories Section */}
      <section id='categories' className="categories-section">
        <h2 className="section-title">Popular Categories</h2>
        <p className="section-subtext">
          Browse by category to find exactly what you’re craving.
        </p>

        <div className="category-grid">
          {categories.map((category, index) => (
            <div key={index} className="wrap animate pop">
              <div className="overlay">
                <div className="overlay-content animate slide-left delay-2">
                  <h1 className="animate slide-left pop delay-4">{category.name}</h1>
                  <p
                    className="animate slide-left pop delay-5"
                    style={{ color: 'white', marginBottom: '2.5rem' }}
                  >
                    Description: <em>{category.description}</em>
                  </p>
                </div>
                <div
                  className="image-content animate slide delay-5"
                  style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '250px',
                    width: '350px',
                  }}
                ></div>
                <div className="dots animate">
                  <div className="dot animate slide-up delay-6"></div>
                  <div className="dot animate slide-up delay-7"></div>
                  <div className="dot animate slide-up delay-8"></div>
                </div>
              </div>

              <div className="category-text">
                <p>
                  <img
                    className="inset"
                    src={category.image}
                    alt={category.name}
                    style={{ maxWidth: '100px', float: 'left', marginRight: '1rem' }}
                  />
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* search section */}
       <section className="recipe-search-section animate slide-up delay-2" style={{ marginTop: "3rem", textAlign: "center" }}>
        <h2 className="section-title">Find a Recipe</h2>
        <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search for a recipe..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: "0.5rem", width: "60%", maxWidth: "400px", marginRight: "0.5rem" }}
          />
          <button type="submit" className="button">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
  {meal && (
  <div className="recipe-card" style={{ maxWidth: "600px", margin: "1rem auto", textAlign: "left" }}>
    <h3>{meal.title || "Untitled Recipe"}</h3>

    {meal.image && (
      <img
        src={meal.image}
        alt={meal.title || "Recipe image"}
        style={{ maxWidth: "100%", borderRadius: "10px", textAlign: 'center' }}
      />
    )}

    <p><strong>Ready in:</strong> {meal.readyInMinutes || "N/A"} minutes</p>
    <p><strong>Servings:</strong> {meal.servings || "N/A"}</p>

    {meal.summary ? (
      <p>
        <strong>Summary:</strong>{" "}
        <span dangerouslySetInnerHTML={{ __html: meal.summary }} />
      </p>
    ) : (
      <p><strong>Summary:</strong> Not available.</p>
    )}

    <h4>Ingredients</h4>
    <ul>
      {(getIngredients(meal) || []).map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>

    {meal.sourceUrl && (
      <a href={meal.sourceUrl} target="_blank" rel="noreferrer" style={{ color: "#0077cc", fontWeight: "bold" }}>
        View Full Recipe
      </a>
    )}
  </div>
)}
      </section>
      {/* about section */}
       <section id='about' className="about-us-section animate slide-up delay-2">
          <div className="about-us-content">
            <h2 className="section-title animate pop delay-3">About Us</h2>
              <p className="section-subtext animate slide-up delay-4">
               We are passionate about food and dedicated to helping you discover, cook, and enjoy the best recipes. 
               Our platform offers a wide variety of dishes to suit every mood, occasion, and taste.
             </p>
              <div className="about-us-image-text animate slide-up delay-5">
                 <img 
                  src="https://images.unsplash.com/photo-1645932067745-c10b7fa2df6b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZiUyMHByZXBhcmluZyUyMGZvb2R8ZW58MHx8MHx8fDA%3D" 
                  alt="About Us" 
                  className="about-us-image"
                />
                <p>
                  Whether you’re a beginner or a seasoned chef, our mission is to make cooking fun, easy, and inspiring. 
                  Explore a diverse range of recipes crafted with love and presented with clarity to make your kitchen 
                  experience seamless.
                </p>
             </div>
          </div>
       </section>
    </>
  );
};

export default App;
