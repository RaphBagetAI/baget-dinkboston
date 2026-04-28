import { useState } from "react";

const WAITLIST_DB_ID = "687b29c3-ff38-46b2-b8ec-c9c9cb31b091";

export default function Home() {
  const [playerForm, setPlayerForm] = useState({ name: "", email: "", source: "" });
  const [coachForm, setCoachForm] = useState({ name: "", email: "", experience: "", neighborhood: "", certifications: "" });
  const [playerStatus, setPlayerStatus] = useState(null);
  const [coachStatus, setCoachStatus] = useState(null);

  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPlayerForm({ ...playerForm, [e.target.name]: e.target.value });
  };

  const handleCoachChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCoachForm({ ...coachForm, [e.target.name]: e.target.value });
  };

  const submitPlayerForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlayerStatus(null);
    if (!playerForm.email || !playerForm.name) {
      setPlayerStatus({ error: "Please fill in both name and email." });
      return;
    }

    try {
      const res = await fetch(`https://app.baget.ai/api/public/databases/${WAITLIST_DB_ID}/rows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { name: playerForm.name, email: playerForm.email, source: playerForm.source } }),
      });

      if (res.ok) {
        setPlayerStatus({ success: true });
        setPlayerForm({ name: "", email: "", source: "" });
      } else {
        setPlayerStatus({ error: "Failed to submit, please try again." });
      }
    } catch {
      setPlayerStatus({ error: "Failed to submit, please try again." });
    }
  };

  const submitCoachForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setCoachStatus(null);
    if (!coachForm.email || !coachForm.name) {
      setCoachStatus({ error: "Please fill in both name and email." });
      return;
    }

    // Ideally coach application submissions go to a separate database for supply side leads
    // Currently using the same WAITLIST_DB_ID for simplicity per instructions

    try {
      const res = await fetch(`https://app.baget.ai/api/public/databases/${WAITLIST_DB_ID}/rows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            name: coachForm.name,
            email: coachForm.email,
            source: "Coach Application",
            experience_level: coachForm.experience,
            neighborhood: coachForm.neighborhood,
            certifications: coachForm.certifications,
          },
        }),
      });

      if (res.ok) {
        setCoachStatus({ success: true });
        setCoachForm({ name: "", email: "", experience: "", neighborhood: "", certifications: "" });
      } else {
        setCoachStatus({ error: "Failed to submit, please try again." });
      }
    } catch {
      setCoachStatus({ error: "Failed to submit, please try again." });
    }
  };

  return (
    <>
      <header className="header">
        <nav className="container" aria-label="Primary navigation">
          <a href="#hero" className="header-logo">
            DinkBoston
          </a>
        </nav>
      </header>

      <main>
        <section id="hero" className="text-center" style={{padding: '4rem 1rem 6rem'}}>
          <h1 className="hero-title">Elevate Your Pickleball Game with Boston’s Premier Private Coaches</h1>
          <p className="hero-subtitle" style={{maxWidth: '600px', margin: '0 auto 2rem'}}>Connect with vetted local coaches, book real-time hourly drills, and master your dink in the city’s best courts.</p>
          <div className="flex-center" style={{gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="#player-form" className="primary-cta" style={{minWidth: 180}}>I want a Coach</a>
            <a href="#coach-form" className="primary-cta" style={{minWidth: 180}}>Start Coaching</a>
          </div>
        </section>

        <section className="background-section-light container grid-2">
          <div>
            <h2 className="section-title">Rec-League Players: Get Tailored Private Coaching</h2>
            <p>Whether you're new to pickleball or aiming to sharpen your skills, our vetted coaches provide hourly drills focused on your unique play style and goals.</p>
            <ul>
              <li>Trusted local coaches with 4.0+ DUPR ratings</li>
              <li>Access to legal, premium courts guaranteed</li>
              <li>Easy real-time booking, cancel anytime</li>
              <li>Personalized drills to elevate your dink and strategy</li>
            </ul>
          </div>
          <form id="player-form" onSubmit={submitPlayerForm} aria-label="Player waitlist form" className="card">
            <h3>Join the Player Waitlist</h3>
            <div className="form-group">
              <label htmlFor="player-name">Name</label>
              <input
                type="text"
                id="player-name"
                name="name"
                value={playerForm.name}
                onChange={handlePlayerChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="player-email">Email</label>
              <input
                type="email"
                id="player-email"
                name="email"
                value={playerForm.email}
                onChange={handlePlayerChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="player-source">How did you hear about us?</label>
              <input
                type="text"
                id="player-source"
                name="source"
                value={playerForm.source}
                onChange={handlePlayerChange}
                placeholder="Facebook, Friend, etc."
                aria-describedby="player-source-desc"
              />
              <small id="player-source-desc" className="text-muted">Optional - helps us understand our reach.</small>
            </div>
            <button type="submit" className="primary-cta">Join Waitlist</button>
            {playerStatus?.error && <p className="error-message" role="alert">{playerStatus.error}</p>}
            {playerStatus?.success && <p className="notice-message">Thanks — we'll be in touch soon!</p>}
          </form>
        </section>

        <section className="container grid-2">
          <div>
            <h2 className="section-title">Boston Pickleball Coaches: Grow Your Coaching Business</h2>
            <p>Join DinkBoston’s network of vetted coaches and gain access to legal courts, seamless booking, and a growing community of serious players looking for top instruction.</p>
            <ul>
              <li>Vetted marketplace with strict quality standards</li>
              <li>Guaranteed court access with our trusted venue partners</li>
              <li>Low commission fees compared to traditional clubs</li>
              <li>Dedicated support for coaches and lesson management</li>
            </ul>
          </div>
          <form id="coach-form" onSubmit={submitCoachForm} aria-label="Coach application form" className="card">
            <h3>Apply to Coach With Us</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="coach-name">Name</label>
                <input
                  type="text"
                  id="coach-name"
                  name="name"
                  value={coachForm.name}
                  onChange={handleCoachChange}
                  required
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="coach-email">Email</label>
                <input
                  type="email"
                  id="coach-email"
                  name="email"
                  value={coachForm.email}
                  onChange={handleCoachChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="coach-experience">Experience Level (DUPR rating or years)</label>
                <input
                  type="text"
                  id="coach-experience"
                  name="experience"
                  value={coachForm.experience}
                  onChange={handleCoachChange}
                  placeholder="e.g., 4.0 DUPR or 5 years"
                />
              </div>
              <div className="form-group">
                <label htmlFor="coach-neighborhood">Neighborhood</label>
                <input
                  type="text"
                  id="coach-neighborhood"
                  name="neighborhood"
                  value={coachForm.neighborhood}
                  onChange={handleCoachChange}
                  placeholder="e.g., Cambridge, Southie"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="coach-certifications">Certifications</label>
              <input
                type="text"
                id="coach-certifications"
                name="certifications"
                value={coachForm.certifications}
                onChange={handleCoachChange}
                placeholder="e.g., USAPA, ICPTN"
              />
            </div>
            <button type="submit" className="primary-cta">Submit Application</button>
            {coachStatus?.error && <p className="error-message" role="alert">{coachStatus.error}</p>}
            {coachStatus?.success && <p className="notice-message">Thanks — you’re on the path to joining DinkBoston!</p>}
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 DinkBoston. All rights reserved.</p>
      </footer>
    </>
  );
}
