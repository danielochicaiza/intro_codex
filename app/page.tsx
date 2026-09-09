'use client';

import Image from 'next/image';
import { FormEvent, useState } from 'react';

type Verdict = 'junk' | 'no' | 'international';

type FoodResult = {
  name: string;
  verdict: Verdict;
  headline: string;
  description: string;
  emoji: string;
  reason: string;
};

const junkKeywords = [
  'chips', 'fries', 'french fry', 'soda', 'cola', 'candy', 'chocolate', 'donut', 'doughnut',
  'cookie', 'cookies', 'pizza', 'burger', 'hamburger', 'hot dog', 'ice cream', 'cake',
  'nachos', 'popcorn', 'instant noodle', 'ramen', 'crisps', 'cereal bar', 'energy drink',
];

const healthyKeywords = [
  'apple', 'banana', 'orange', 'salad', 'oatmeal', 'oats', 'yogurt', 'yoghurt', 'egg',
  'avocado', 'rice', 'bean', 'beans', 'chicken', 'salmon', 'water', 'smoothie', 'carrot',
  'broccoli', 'sandwich', 'nuts', 'almonds', 'fruit', 'vegetable', 'soup', 'toast',
];

const internationalKeywords = [
  'sushi', 'taco', 'tacos', 'curry', 'paella', 'falafel', 'bibimbap', 'pho', 'dim sum',
  'pierogi', 'empanada', 'empanadas', 'biryani', 'pad thai', 'ramen',
];

const examples = ['🍕 Pizza', '🍎 Apple', '🍩 Donut', '🥗 Salad', '🌍 Sushi', '🌍 Curry'];

function classifyFood(rawFood: string): FoodResult {
  const name = rawFood.trim().replace(/\s+/g, ' ');
  const lower = name.toLowerCase();
  const isInternational = internationalKeywords.some((keyword) => lower.includes(keyword));
  const isJunk = junkKeywords.some((keyword) => lower.includes(keyword));
  const isHealthy = healthyKeywords.some((keyword) => lower.includes(keyword));

  if (isInternational) {
    return {
      name,
      verdict: 'international',
      headline: 'Not sure, what about asking a local?',
      description: 'Internation food changes a lot and has many versions.',
      emoji: '🌍',
      reason: 'The preparation might make it more or less beneficial for your health. Be careful.',
    };
  }

  if (isJunk && !isHealthy) {
    return {
      name,
      verdict: 'junk',
      headline: 'Yep, that’s junk food.',
      description: 'Totally okay as an occasional treat — just not the everyday hero.',
      emoji: '🍟',
      reason: 'Usually high in added sugar, salt, or saturated fat and low in filling nutrients.',
    };
  }

  if (isHealthy && !isJunk) {
    return {
      name,
      verdict: 'no',
      headline: 'Nope, not junk food!',
      description: 'A solid choice with something useful to give your body.',
      emoji: '✨',
      reason: 'Foods like this can bring helpful nutrients, fiber, or protein to your day.',
    };
  }

  return {
    name,
    verdict: 'no',
    headline: 'It depends a little.',
    description: 'There’s no need to label food as “good” or “bad” — balance is the real goal.',
    emoji: '🤔',
    reason: 'Portion, ingredients, and how often you eat it all matter more than one food alone.',
  };
}

function FoodIllustration() {
  return (
    <svg aria-hidden="true" className="h-28 w-28 text-ink" viewBox="0 0 120 120">
      <path className="doodle-line" strokeWidth="4" d="M26 77c4-20 18-33 35-33 19 0 29 16 32 33" />
      <path className="doodle-line" strokeWidth="4" d="M19 77h82c-2 16-17 27-41 27S22 93 19 77Z" fill="#fff" />
      <path className="doodle-line" strokeWidth="4" d="M38 62c5-13 14-19 24-19 9 0 18 5 23 19" />
      <path className="doodle-line" strokeWidth="4" d="M38 24c-4 7-4 13 0 18M57 18c-2 8-1 14 3 19M78 23c-4 7-3 13 1 18" />
      <circle cx="54" cy="68" r="3.5" fill="currentColor" />
      <circle cx="70" cy="68" r="3.5" fill="currentColor" />
      <path className="doodle-line" strokeWidth="3" d="M55 80c5 5 11 5 16 0" />
    </svg>
  );
}

function CheckIcon() {
  return <span aria-hidden="true" className="text-[22px] leading-none">✓</span>;
}

export default function Home() {
  const [food, setFood] = useState('');
  const [result, setResult] = useState<FoodResult | null>(null);
  const [recent, setRecent] = useState<FoodResult[]>([]);

  function checkFood(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!food.trim()) return;
    const nextResult = classifyFood(food);
    setResult(nextResult);
    setRecent((current) => [nextResult, ...current.filter((item) => item.name.toLowerCase() !== nextResult.name.toLowerCase())].slice(0, 3));
  }

  function useExample(example: string) {
    setFood(example.replace(/^\S+\s/, ''));
  }

  function checkRecent(item: FoodResult) {
    setFood(item.name);
    setResult(item);
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/orange-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.02] object-cover object-[65%_center] opacity-75 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/95 via-gray-200/65 to-gray-400/10" />
      </div>

      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 lg:px-10">
        <button className="flex items-center gap-3 text-left" onClick={() => { setFood(''); setResult(null); }} aria-label="Reset Junk or No">
          <span className="flex h-10 w-10 rotate-[-7deg] items-center justify-center rounded-[14px] bg-ink text-xl shadow-[4px_4px_0_#ff765c]">🍎</span>
          <span className="text-lg font-black tracking-[-0.04em]">Junk or No?</span>
        </button>
        <span className="hidden rounded-full bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 shadow-sm sm:inline-flex">Food, decoded</span>
      </nav>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-14 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-24 lg:pt-16">
        <div className="relative z-10">
          <div className="mb-6 inline-flex -rotate-2 items-center gap-2 rounded-full border border-[#f3c8b4] bg-[#fff0e8] px-4 py-2 text-sm font-bold text-[#c55b46] shadow-[3px_3px_0_#f3c8b4]">
            <span>👋</span> No food shaming here
          </div>
          <h1 className="display-heading max-w-2xl">
            Is it junk<br /><span className="relative inline-block text-coral">or no? <span className="absolute -bottom-2 left-1 h-2 w-full rounded-full bg-[#ffd0c3]" /></span>
          </h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-slate-600 sm:text-xl">Type a food below and get a quick, friendly answer. No guilt trips, promise.</p>

          <form onSubmit={checkFood} className="mt-9 max-w-xl">
            <label htmlFor="food" className="mb-3 block text-sm font-extrabold text-ink">What are you eating?</label>
            <div className="flex flex-col gap-3 rounded-[22px] border-2 border-ink bg-white p-2 shadow-[6px_6px_0_#18243f] sm:flex-row">
              <input id="food" value={food} onChange={(event) => setFood(event.target.value)} placeholder="e.g. chocolate chip cookies" className="min-w-0 flex-1 rounded-[15px] bg-transparent px-4 py-3 text-base text-ink outline-none placeholder:text-slate-400" />
              <button type="submit" className="rounded-[15px] bg-coral px-6 py-3 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#f1664d] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50" disabled={!food.trim()}>Check it <span aria-hidden="true">→</span></button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="mr-1 font-semibold">Try:</span>
              {examples.map((example) => <button type="button" key={example} onClick={() => useExample(example)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold transition hover:border-ink hover:text-ink">{example}</button>)}
            </div>
          </form>

          {recent.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="mr-1 font-semibold">Recent:</span>
              {recent.map((item) => <button type="button" key={item.name} onClick={() => checkRecent(item)} className="rounded-full bg-white/70 px-3 py-1.5 font-semibold transition hover:bg-white hover:text-ink">{item.emoji} {item.name}</button>)}
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
          <div className="absolute -left-4 top-10 h-16 w-16 rounded-[20px] bg-[#cdeedc] opacity-80 blur-[1px] sm:-left-10" />
          <div className="absolute -right-2 bottom-7 h-24 w-24 rounded-full bg-[#e3ddff] opacity-70 sm:-right-10" />
          <div className="relative rounded-[34px] border-2 border-ink bg-white p-5 shadow-[10px_12px_0_#18243f] sm:p-7">
            <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-5">
              <div><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Today’s check</p><p className="mt-1 font-bold text-ink">{result ? result.name : 'A tiny food verdict'}</p></div>
              <div className="animate-float text-4xl">{result?.emoji ?? '🥑'}</div>
            </div>
            <div className={`mt-6 rounded-[25px] p-6 ${result?.verdict === 'junk' ? 'bg-[#fff0e8]' : result?.verdict === 'international' ? 'bg-[#dbeafe]' : result?.verdict === 'no' ? 'bg-[#eaf9f0]' : 'bg-[#eef0ff]'}`}>
              <div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">{result ? 'Your result' : 'How it works'}</span><span className="text-2xl">{result ? (result.verdict === 'junk' ? '😅' : result.verdict === 'international' ? '✈️' : '🎉') : '💡'}</span></div>
              {result ? <><h2 className="text-3xl font-black leading-tight tracking-[-0.04em]">{result.headline}</h2><p className="mt-3 leading-7 text-slate-600">{result.description}</p><div className="mt-5 flex gap-3 rounded-2xl bg-white/70 p-4 text-sm leading-6 text-slate-600"><span className="text-xl">{result.verdict === 'junk' ? '🔎' : result.verdict === 'international' ? '🌍' : '🌱'}</span><span>{result.reason}</span></div></> : <><h2 className="text-3xl font-black leading-tight tracking-[-0.04em]">Curious about that snack?</h2><p className="mt-3 leading-7 text-slate-600">Pop a food into the checker and we’ll help you make sense of it in seconds.</p><div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-sm font-bold leading-6 text-slate-600"><span className="text-xl">👇</span> Start with something you ate today!</div></>}
            </div>
            <div className="mt-6 flex items-start gap-3 px-1 text-sm leading-6 text-slate-500"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-black text-white"><CheckIcon /></span><span>Food is more than a label. Aim for variety, balance, and what makes you feel good.</span></div>
          </div>
          <div className="absolute -bottom-7 -right-2 hidden -rotate-6 rounded-2xl border-2 border-ink bg-[#fff1a9] px-4 py-3 text-sm font-black shadow-[4px_4px_0_#18243f] sm:block">you’ve got this! ✌️</div>
        </div>
      </section>

      <section className="relative z-10 border-t border-[#f0e5d9] bg-white/45 px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-coral">A kinder way to think about food</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">Simple answers. Zero judgment.</h2></div>
          <div className="grid gap-5 text-sm text-slate-600 sm:grid-cols-3 sm:gap-8"><div className="flex gap-3"><span className="text-2xl">⚡</span><span><strong className="block text-ink">Quick</strong>Instant food checks</span></div><div className="flex gap-3"><span className="text-2xl">💛</span><span><strong className="block text-ink">Kind</strong>No good or bad food</span></div><div className="flex gap-3"><span className="text-2xl">🧠</span><span><strong className="block text-ink">Helpful</strong>Built for learning</span></div></div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7 text-xs font-semibold text-slate-400 lg:px-10"><span>Made for curious eaters.</span><span>Junk or No? © 2024</span></footer>
    </main>
  );
}
