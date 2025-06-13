import React, { useState } from "react";

const QUESTIONS = [
  {
    question: "How do you feel about your current curl routine?",
    answers: [
      { text: "I’m deep in the game — I track what works and tweak often.", type: "scholar" },
      { text: "I’m rebuilding after some damage. It’s fragile right now.", type: "recovery" },
      { text: "I love the ritual — it’s my me-time.", type: "romantic" },
      { text: "It’s gotta be quick and done right. I’ve got stuff to do.", type: "minimalist" },
    ],
  },
  {
    question: "What’s your first instinct when trying a new product?",
    answers: [
      { text: "Read every ingredient and double-check reviews", type: "guardian" },
      { text: "Sniff it, feel it, see how it vibes", type: "romantic" },
      { text: "Trust the friend who swears by it", type: "connector" },
      { text: "Compare routines and see where it fits", type: "scholar" },
    ],
  },
  {
    question: "Which hair compliment makes you light up?",
    answers: [
      { text: "Your curls are glowing — what do you use?", type: "guardian" },
      { text: "Your hair looks so *you* today.", type: "romantic" },
      { text: "You make curly hair look easy!", type: "minimalist" },
      { text: "You always know what works — teach me!", type: "connector" },
    ],
  },
  {
    question: "Be honest — how many products are in your curl stash right now?",
    answers: [
      { text: "More than I can count — I love experimenting", type: "scholar" },
      { text: "Just the essentials — clutter stresses me out", type: "minimalist" },
      { text: "A few tried-and-true that feel like home", type: "romantic" },
      { text: "I keep a little variety for my daughters/friends too", type: "connector" },
    ],
  },
  {
    question: "What does “curl care” mean to you emotionally?",
    answers: [
      { text: "Returning to my roots and undoing past harm", type: "recovery" },
      { text: "Beauty I choose on my terms", type: "romantic" },
      { text: "Empowerment through knowledge", type: "scholar" },
      { text: "Nurturing my health and my values", type: "guardian" },
    ],
  },
  {
    question: "If your curls could talk, what would they say after wash day?",
    answers: [
      { text: "Thank you — we finally feel heard.", type: "recovery" },
      { text: "That was efficient. Let’s move.", type: "minimalist" },
      { text: "I feel soft, seen, and celebrated.", type: "romantic" },
      { text: "Pass this on — your sister needs this routine too.", type: "connector" },
    ],
  },
  {
    question: "Who else influences your curl choices (if anyone)?",
    answers: [
      { text: "I watch tutorials and follow curl experts", type: "scholar" },
      { text: "I go by what works for my family or close friends", type: "connector" },
      { text: "I mostly trust myself — especially ingredient research", type: "guardian" },
      { text: "Honestly, I don’t have time for other voices — I need simple", type: "minimalist" },
    ],
  },
];

const RESULTS = {
  scholar: "You’re a Spiral Scholar — your curiosity fuels your curls.",
  romantic: "You’re a Curl Romantic — ritual is your love language.",
  minimalist: "You’re a Washday Minimalist — simplicity is your magic.",
  recovery: "You’re a Recovery Queen — healing is your curl story.",
  guardian: "You’re an Ingredient Guardian — integrity matters most.",
  connector: "You’re a Curl Connector — your care ripples outward.",
};

export default function App() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (type) => {
    const updated = { ...scores, [type]: (scores[type] || 0) + 1 };
    setScores(updated);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      const winner = Object.entries(updated).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-gray-800">
      {!result ? (
        <div className="max-w-xl w-full">
          <h1 className="text-xl font-bold mb-4">{QUESTIONS[step].question}</h1>
          {QUESTIONS[step].answers.map((a, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(a.type)}
              className="block w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              {a.text}
            </button>
          ))}
          <div className="text-sm text-gray-500 mt-4">Question {step + 1} of {QUESTIONS.length}</div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">{RESULTS[result]}</h2>
          <p className="mb-4">Want your full ritual and product match? Drop your email and we’ll send it.</p>
          <form action="https://your-ghl-form-url.com" method="POST" className="space-y-3">
            <input type="hidden" name="archetype" value={result} />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">Send My Ritual</button>
          </form>
        </div>
      )}
    </div>
  );
}
