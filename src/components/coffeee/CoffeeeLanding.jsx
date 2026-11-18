import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Code2, Coffee, FolderCode, Github, Linkedin, MessageSquare, Moon, Sun, UserRound } from "lucide-react";
import CoffeeeBot from "./CoffeeeBot";

const questions = [
  { label: "Tell me about your engineering journey", prompt: "Tell me about Dhiraj's engineering journey.", icon: UserRound },
  { label: "What are you building at Connecticus?", prompt: "What is Dhiraj building at Connecticus?", icon: Code2 },
  { label: "Show me your most interesting projects", prompt: "Show me Dhiraj's most interesting projects.", icon: FolderCode },
  { label: "What is your approach to backend engineering?", prompt: "What is Dhiraj's approach to backend engineering?", icon: MessageSquare },
  { label: "What makes you different as an engineer?", prompt: "What makes Dhiraj different as an engineer?", icon: Coffee },
];

const work = [
  { title: "Anuvada AI", category: "AI · RETRIEVAL SYSTEMS", description: "A philosophy-aware guidance system with intent-based source routing and quote-faithful retrieval.", stack: "Python / FastAPI / RAG", url: "https://github.com/dhiraj-wasu/Anuvada_AI-A-Philosophy-Aware-Guidance-System", kind: "anuvada" },
  { title: "AI Mesh System", category: "BACKEND · DISTRIBUTED SYSTEMS", description: "Distributed AI task orchestration with queue-based workers, retries, heartbeats and load scaling.", stack: "FastAPI / Redis / Python", url: "https://github.com/dhiraj-wasu/AI-Mesh-System-with-Queue-Based-Distribution", kind: "mesh" },
  { title: "ZeroTrust Defender", category: "SECURITY · AUTOMATION", description: "An AI-driven ransomware defence architecture for endpoint detection and threat orchestration.", stack: "Python / EDR / SOAR", url: "https://github.com/dhiraj-wasu/ZeroTrust-Defender-AI-Driven-Ransomware-Detection", kind: "security" },
  { title: "High-Performance Cache", category: "SYSTEMS · C++", description: "A low-latency in-memory cache exploring multithreading, memory structures and eviction algorithms.", stack: "C++ / Concurrency / Systems", url: "https://github.com/dhiraj-wasu/High-Performance-Cache-Speed-focused-C-", kind: "cache" },
];

export default function CoffeeeLanding({theme,toggleTheme,question,setQuestion,submitQuestion,navigate,newConversation}) {
  return <div className={`coffeee-app coffeee-landing theme-${theme}`}>
    <header className="coffeee-landing-header">
      <button className="coffeee-landing-brand" onClick={newConversation}>dhiraj.wasu<span>.</span><small>PORTFOLIO V2.0</small></button>
      <nav className="coffeee-landing-nav" aria-label="Main navigation">
        <button onClick={()=>navigate("/about")}>About</button><button onClick={()=>navigate("/projects")}>Projects</button><button onClick={()=>navigate("/academics")}>Experience</button>
      </nav>
      <div className="coffeee-landing-actions">
        <a className="coffeee-resume-link" href="mailto:dhirajwasu120@gmail.com?subject=Request%20for%20resume">Request resume <ArrowUpRight size={14}/></a>
        <a className="coffeee-social-link" href="https://github.com/dhiraj-wasu" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>
        <a className="coffeee-social-link" href="https://www.linkedin.com/in/dhiraj-wasu/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
        <button className="coffeee-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button>
      </div>
    </header>
    <main className="coffeee-landing-main">
      <section className="coffeee-hero">
        <motion.div className="coffeee-hero-mascot" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
          <CoffeeeBot state={question.trim() ? "curious" : "greeting"} onClick={()=>submitQuestion("Who is Dhiraj?")}/>
        </motion.div>
        <div className="coffeee-hero-kicker">YOUR PERSONAL PORTFOLIO ASSISTANT</div>
        <motion.h1 initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.08}}>Hey, I’m Coffeee!</motion.h1>
        <motion.h2 initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.14}}>Let’s explore Dhiraj’s world.</motion.h2>
        <p className="coffeee-hero-copy">I can tell you about his engineering journey, projects, skills and everything he’s building.</p>
        <form className="coffeee-landing-composer" onSubmit={e=>{e.preventDefault();submitQuestion();}}>
          <textarea value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submitQuestion();}}} placeholder="Ask anything about Dhiraj..." rows={2} aria-label="Ask Coffeee about Dhiraj"/>
          <div className="coffeee-landing-composer-bottom"><span className="coffeee-composer-hint"><Coffee size={15}/> Coffeee is ready to help you explore</span><button type="submit" disabled={!question.trim()} aria-label="Send question"><ArrowUp size={18}/></button></div>
        </form>
        <div className="coffeee-try-asking"><span>TRY ASKING</span><div>{questions.map(({label,prompt,icon:Icon})=><button key={label} onClick={()=>submitQuestion(prompt)}><Icon size={14}/>{label}</button>)}</div></div>
      </section>
      <section className="coffeee-selected-work" id="selected-work">
        <div className="coffeee-section-heading"><div><span>SELECTED WORK</span><h3>A few things I’ve been building.</h3></div><button onClick={()=>navigate("/projects")}>All projects <ArrowUpRight size={15}/></button></div>
        <div className="coffeee-featured-grid">{work.map((p,i)=><a className="coffeee-featured-card" href={p.url} target="_blank" rel="noreferrer" key={p.title}>
          <div className={`coffeee-project-visual coffeee-project-visual--${p.kind}`}><span className="coffeee-visual-index">0{i+1}</span>
            {p.kind==="anuvada"&&<div className="coffeee-visual-orbit"><span>Intent</span><i/><b>Source</b><i/><strong>Answer</strong></div>}
            {p.kind==="mesh"&&<div className="coffeee-visual-nodes"><i/><i/><i/><i/><i/><b>QUEUE</b></div>}
            {p.kind==="security"&&<div className="coffeee-visual-shield"><div>ZT</div><span>DEFENCE LAYER</span></div>}
            {p.kind==="cache"&&<div className="coffeee-visual-cache"><span>GET</span><b>key → value</b><span>HIT · 0.4ms</span></div>}
            <ArrowUpRight className="coffeee-project-open" size={17}/>
          </div>
          <div className="coffeee-featured-meta">{p.category}</div><h4>{p.title}</h4><p>{p.description}</p><small>{p.stack}</small>
        </a>)}</div>
      </section>
    </main>
    <footer className="coffeee-landing-footer"><span>© {new Date().getFullYear()} Dhiraj Wasu</span><span>BUILT WITH CURIOSITY <Coffee size={12}/></span></footer>
  </div>;
}
