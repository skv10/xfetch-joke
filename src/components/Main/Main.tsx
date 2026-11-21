import { useState } from "react";
import Button from "../Button/Button";

type Joke = { setup: string; punchline: string };

export default function JokeMain() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as Joke;
      if (!data?.setup) throw new Error("Bad data");
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch {
      setJoke(null);
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="card">
        <h1 className="card-title">Random Joke</h1>
        <p className="card-subtitle">Click the button to fetch a fresh one.</p>
        <div className="card-actions">
          <Button loading={loading} onClick={fetchJoke} />
        </div>
        {error ? (
          <div className="error-state">
            <p className="error-text">{error}</p>
            <Button loading={loading} onClick={fetchJoke} label="Try again" />
          </div>
        ) : joke ? (
          <div className="joke">
            <p className="joke-setup">{joke.setup}</p>
            <p className="joke-punchline">{joke.punchline}</p>
          </div>
        ) : (
          <p className="empty-state">No joke yet.</p>
        )}
      </div>
    </main>
  );
}
