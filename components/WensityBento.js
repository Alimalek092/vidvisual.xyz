'use client';
import React, { useState } from 'react';

/**
 * WensityValueBento — Modern Asymmetric Bento Grid for Core Value Props
 */
export function WensityValueBento() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const bentoItems = [
    {
      id: 'time',
      size: 'large',
      badge: '⚡ 90% Watch Time Saved',
      accent: 'blue',
      title: 'Stop scrubbing through 2-hour videos for 3 ideas',
      desc: 'Instead of watching long podcasts or university lectures at 2x speed, vidvisual extracts the foundational thesis, arguments, and actionable steps into a scannable visual board in under 20 seconds.',
      statNum: '20s',
      statLabel: 'Avg distillation time',
      extra: 'Skip intros, sponsors & banter',
    },
    {
      id: 'memory',
      size: 'medium',
      badge: '🧠 65% Higher Recall',
      accent: 'violet',
      title: 'Built on Paivio Dual-Coding Cognitive Theory',
      desc: 'Cognitive science proves your brain retains visual concept maps and spatial whiteboard cards significantly longer than linear walls of text bullets.',
      statNum: '65%',
      statLabel: 'Memory retention boost',
      extra: 'Spatial cognitive architecture',
    },
    {
      id: 'extraction',
      size: 'medium',
      badge: '🎯 Structured Core Points',
      accent: 'green',
      title: 'Strict Transcript Grounding (Zero Hallucination)',
      desc: 'All concept definitions and takeaways are extracted strictly from the timestamped captions. Direct quotes, key formulas, and verified facts only.',
      statNum: '100%',
      statLabel: 'Transcript grounded',
      extra: 'No AI approximations',
    },
    {
      id: 'library',
      size: 'large',
      badge: '📚 Private Knowledge Vault',
      accent: 'amber',
      title: 'Build your permanent visual study library',
      desc: 'Every video you summarize is saved automatically to your private dashboard. Revisit, search, export to GoodNotes or Notion, and study before exams.',
      statNum: 'Instant',
      statLabel: 'Cloud sync & library save',
      extra: 'PDF, HD PNG & JPG export',
    },
  ];

  return (
    <div className="wensity-bento-grid" aria-label="Core Value Propositions">
      {bentoItems.map((item, idx) => (
        <div
          key={item.id}
          className={`wensity-bento-card bento-${item.size} accent-${item.accent} ${hoveredCard === idx ? 'is-hovered' : ''}`}
          onMouseEnter={() => setHoveredCard(idx)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="wensity-bento-card-glow" aria-hidden="true" />
          
          <div className="wensity-bento-head">
            <span className="wensity-bento-badge">{item.badge}</span>
            <span className="wensity-bento-extra">{item.extra}</span>
          </div>

          <h3 className="wensity-bento-title">{item.title}</h3>
          <p className="wensity-bento-desc">{item.desc}</p>

          <div className="wensity-bento-stat">
            <span className="wensity-bento-stat-num">{item.statNum}</span>
            <span className="wensity-bento-stat-label">{item.statLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * WensityStepJourney — Interactive 4-Step How It Works Process
 */
export function WensityStepJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      tag: 'Step 1 · Input',
      title: 'Paste Any YouTube Video or Podcast URL',
      desc: 'Works with any video that has captions enabled — tutorials, multi-hour podcasts (Huberman, Lex, Rogan), CS50 lectures, or webinars.',
      sub: 'Zero signup required for your first 3 summaries.',
    },
    {
      num: '02',
      tag: 'Step 2 · Distillation',
      title: 'AI Distills the Core Key Points in 20s',
      desc: 'Powered by Gemini 2.5 Flash. vidvisual parses the complete transcript, strips away conversational filler, and extracts central concepts.',
      sub: 'Structured semantic schema distillation.',
    },
    {
      num: '03',
      tag: 'Step 3 · Exploration',
      title: 'Explore Spatial Whiteboard Cards & Mind Maps',
      desc: 'Review colorful concept cards, follow connecting sub-topic branches, and absorb high-yield takeaway quotes in under a minute.',
      sub: 'Available in Whiteboard, Infographic, and Mind Map.',
    },
    {
      num: '04',
      tag: 'Step 4 · Retention',
      title: 'Export, Save to Vault, and Remember',
      desc: 'Your visual notes are stored in your private library. Download crisp HD PNGs, standard JPGs, or vector PDFs ready for Notion and GoodNotes.',
      sub: 'No watermarks on Pro & Unlimited plans.',
    },
  ];

  return (
    <div className="wensity-steps-wrap" aria-label="Step by Step Walkthrough">
      <div className="wensity-steps-progress" aria-hidden="true">
        <div
          className="wensity-steps-progress-bar"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="wensity-steps-grid">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={`wensity-step-card ${activeStep === i ? 'is-active' : ''}`}
            onClick={() => setActiveStep(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveStep(i);
            }}
          >
            <div className="wensity-step-head">
              <span className="wensity-step-num">{s.num}</span>
              <span className="wensity-step-tag">{s.tag}</span>
            </div>

            <h3 className="wensity-step-title">{s.title}</h3>
            <p className="wensity-step-desc">{s.desc}</p>
            <span className="wensity-step-sub">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * WensityAudienceBento — Targeted Audience Personas
 */
export function WensityAudienceBento() {
  const audiences = [
    {
      emoji: '🎙️',
      title: 'Podcast & Audio Deep-Divers',
      tag: '3-4h Episodes',
      color: 'blue',
      desc: 'Compress Lex Fridman, Huberman Lab, Joe Rogan, and All-In episodes into 5-6 concept cards in 20 seconds. Skip banter, keep the protocol.',
      example: 'Example: Huberman Lab (Focus protocols, 2h 45m)',
    },
    {
      emoji: '🎓',
      title: 'Students & Exam Preppers',
      tag: 'Lectures & Seminars',
      color: 'green',
      desc: 'Turn 90-minute recorded university lectures, MIT OpenCourseWare, and review sessions into 1-page visual study sheets before exams.',
      example: 'Example: CS50 Algorithms & Data Structures',
    },
    {
      emoji: '💼',
      title: 'Founders, Devs & Executives',
      tag: 'Keynotes & Demos',
      color: 'amber',
      desc: 'Extract actionable product insights, technical conference keynotes, and system architecture teardowns to share with your engineering team.',
      example: 'Example: OpenAI DevDay & WWDC architecture keynotes',
    },
    {
      emoji: '🌍',
      title: 'Global & Multilingual Learners',
      tag: '16+ Languages',
      color: 'violet',
      desc: 'Summarize foreign language YouTube videos into your native language instantly. Spanish, German, French, Japanese, Hindi, and more.',
      example: 'Example: French quantum physics tutorial translated to English',
    },
  ];

  return (
    <div className="wensity-audience-grid" aria-label="Who vidvisual is built for">
      {audiences.map((a) => (
        <div key={a.title} className={`wensity-audience-card accent-${a.color}`}>
          <div className="wensity-audience-head">
            <span className="wensity-audience-icon">{a.emoji}</span>
            <span className="wensity-audience-tag">{a.tag}</span>
          </div>
          <h3 className="wensity-audience-title">{a.title}</h3>
          <p className="wensity-audience-desc">{a.desc}</p>
          <div className="wensity-audience-example">
            <span>{a.example}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
