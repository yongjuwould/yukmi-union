import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LockKeyhole, LogOut, Menu, X, Users, ScrollText, Images, CalendarDays, Megaphone, ArrowUpRight, ChevronRight, Shield } from 'lucide-react';
import emblem from './assets/yukmi-emblem.jpeg';
import './style.css';

const members = [
  { name: '김혜환', role: '최고지도자', en: 'SUPREME LEADER', mark: '壹' },
  { name: '김종명', role: '설립자', en: 'FOUNDER', mark: '貳' },
  { name: '이용주', role: '트레이너', en: 'TRAINER', mark: '參' },
  { name: '유성재', role: '행동대장', en: 'FIELD LEADER', mark: '肆' },
  { name: '이민찬', role: '디자이너', en: 'DESIGNER', mark: '伍' },
  { name: '송태윤', role: '아티스트', en: 'ARTIST', mark: '陸' },
];
const demoPassword = import.meta.env.VITE_DEMO_PASSCODE || 'yukmi2026';

function Login({ onEnter }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (password === demoPassword) onEnter();
    else setError('비밀번호가 일치하지 않습니다.');
  };
  return <main className="login-screen">
    <div className="login-grain" />
    <div className="login-seal"><img src={emblem} alt="육미연합 공식 엠블럼" /></div>
    <div className="login-kicker">PRIVATE MEMBERS SOCIETY <span>✦</span> EST. YUKMI</div>
    <h1 className="login-title">六友會</h1>
    <p className="login-subtitle">YUKMI UNION</p>
    <div className="login-rule"><i /> <span>六人一心</span> <i /></div>
    <p className="login-copy">여섯 사람이 하나의 뜻으로 모인 곳<br/>구성원 전용 공간입니다.</p>
    <form className="login-form" onSubmit={submit}>
      <label htmlFor="passcode"><LockKeyhole size={15}/> ACCESS CODE</label>
      <input id="passcode" type="password" value={password} onChange={e => {setPassword(e.target.value); setError('');}} placeholder="공통 비밀번호를 입력하세요" autoComplete="current-password" />
      {error && <p className="error">{error}</p>}
      <button type="submit" className="gold-button">입장하기 <ArrowUpRight size={16}/></button>
    </form>
    <p className="login-foot">YUKMI UNION · PRIVATE ARCHIVE</p>
  </main>;
}

const navItems = [
  { id: 'home', label: '대문', en: 'HOME', icon: Shield },
  { id: 'members', label: '구성원', en: 'MEMBERS', icon: Users },
  { id: 'history', label: '연혁', en: 'CHRONICLE', icon: ScrollText },
  { id: 'archive', label: '기록실', en: 'ARCHIVE', icon: Images },
  { id: 'schedule', label: '일정', en: 'SCHEDULE', icon: CalendarDays },
  { id: 'notice', label: '공지', en: 'NOTICE', icon: Megaphone },
];
import recordFirst from './assets/archive/record001-first-group.jpg';
import recordGathering from './assets/archive/record001-gathering.jpg';
import recordTraining from './assets/archive/record001-training.jpg';
import recordItaewon from './assets/archive/record001-itaewon.jpg';
import recordHongdae from './assets/archive/record001-hongdae.jpg';
import recordReunion from './assets/archive/record001-reunion.jpg';
import recordYangyang from './assets/archive/record001-yangyang.jpg';

function App() {
  const [entered, setEntered] = useState(sessionStorage.getItem('yukmi-entered') === 'yes');
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const enter = () => { sessionStorage.setItem('yukmi-entered', 'yes'); setEntered(true); };
  const logout = () => { sessionStorage.removeItem('yukmi-entered'); setEntered(false); };
  const go = (id) => { setActive(id); setMobileOpen(false); };
  if (!entered) return <Login onEnter={enter}/>;
  const current = navItems.find(n => n.id === active);
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="side-brand"><img src={emblem} alt=""/><div><b>六友會</b><span>YUKMI UNION</span></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={19}/></button></div>
      <div className="side-caption">PRIVATE TERRITORY</div>
      <nav>{navItems.map(item => {const Icon = item.icon; return <button key={item.id} className={`nav-link ${active === item.id ? 'active' : ''}`} onClick={() => go(item.id)}><Icon size={17}/><span>{item.label}</span><small>{item.en}</small>{active === item.id && <ChevronRight size={14} className="nav-arrow"/>}</button>;})}</nav>
      <div className="side-bottom"><div className="side-status"><span className="status-dot"/> SIX MEMBERS · ONE UNION</div><button className="logout" onClick={logout}><LogOut size={15}/> 로그아웃</button><div className="side-motto">六人一心</div></div>
    </aside>
    {mobileOpen && <button className="scrim" aria-label="메뉴 닫기" onClick={() => setMobileOpen(false)}/>}
    <main className="main-area">
      <header className="topbar"><button className="menu-toggle" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="breadcrumb">YUKMI UNION <span>/</span> {current.en}</div><div className="top-right"><span className="top-private"><LockKeyhole size={12}/> PRIVATE</span><span className="top-date">六人一心</span></div></header>
      {active === 'home' && <Home go={go}/>}
      {active === 'members' && <Members/>}
      {active === 'history' && <History/>}
      {active === 'archive' && <Archive/>}
      {active === 'schedule' && <EmptySection eyebrow="SCHEDULE" title="함께하는 일정" desc="함께한 날과 앞으로의 약속을 기록하는 공간입니다." icon={<CalendarDays/>} />}
      {active === 'notice' && <EmptySection eyebrow="NOTICE" title="공지사항" desc="육미연합의 소식과 안내를 모아두는 공간입니다." icon={<Megaphone/>} />}
      <footer className="footer"><span>六友會 · YUKMI UNION</span><span>SIX MEMBERS, ONE UNION.</span></footer>
    </main>
  </div>;
}

function Home({ go }) {
  return <div className="content home-content">
    <section className="hero-panel">
      <div className="hero-ornament">六</div><div className="hero-content">
        <p className="eyebrow">WELCOME TO OUR PRIVATE SPACE</p>
        <h1>六人一心<span>.</span></h1>
        <p className="hero-ko">여섯 사람, 하나의 마음.</p>
        <div className="hero-line"/><p className="hero-desc">서로 다른 여섯 개의 개성.<br/>그 차이를 존중하며 하나의 연합으로.</p>
        <button className="outline-button" onClick={() => go('members')}>구성원 만나기 <ArrowUpRight size={15}/></button>
      </div>
      <div className="hero-seal"><img src={emblem} alt="육미연합 공식 엠블럼"/></div>
      <div className="hero-bottom"><span>YUKMI UNION</span><span>六友會</span></div>
    </section>
    <section className="section-block">
      <div className="section-heading"><div><p className="eyebrow">THE UNION</p><h2>여섯 명의 구성원</h2></div><button className="text-link" onClick={() => go('members')}>전체 보기 <ArrowUpRight size={14}/></button></div>
      <div className="member-grid">{members.map(m => <article className="member-card" key={m.name}><div className="member-mark">{m.mark}</div><div className="member-info"><span>{m.en}</span><h3>{m.name}</h3><p>{m.role}</p></div><div className="member-card-edge">✦</div></article>)}</div>
    </section>
    <section className="featured-record" onClick={() => go('archive')} role="button" tabIndex="0" onKeyDown={e => e.key === 'Enter' && go('archive')}>
      <div className="featured-copy"><p className="eyebrow">FIRST ENTRY</p><span className="record-number">記錄 001</span><h2>최초의 육미연합</h2><p>여섯 사람의 인연이 하나의 이름으로 모인 순간.</p><span className="record-more">기록 열람 <ArrowUpRight size={14}/></span></div>
      <img src={recordFirst} alt="육미연합 최초 단체사진"/>
    </section>
    <section className="quick-grid">
      <button className="quick-card" onClick={() => go('archive')}><Images/><span><b>기록실</b><small>우리의 순간을 보관하다</small></span><ArrowUpRight/></button>
      <button className="quick-card" onClick={() => go('schedule')}><CalendarDays/><span><b>일정</b><small>다음 만남을 준비하다</small></span><ArrowUpRight/></button>
      <button className="quick-card" onClick={() => go('notice')}><Megaphone/><span><b>공지</b><small>연합의 소식을 확인하다</small></span><ArrowUpRight/></button>
    </section>
  </div>;
}

function Members() {
  return <div className="content inner-content"><div className="page-intro"><p className="eyebrow">SIX MEMBERS · ONE UNION</p><h1>구성원 <span>名簿</span></h1></div><div className="members-large-grid">{members.map(m => <article className="member-large" key={m.name}><div className="large-mark">{m.mark}</div><div className="large-detail"><span>{m.en}</span><h2>{m.name}</h2><p>{m.role}</p></div></article>)}</div></div>;
}
const archiveItems = [
  { title:'최초의 육미연합', category:'FOUNDING PHOTO', text:'육미연합 최초 단체사진이 기록된 날.', image:recordFirst, featured:true },
  { title:'강원랜드 카지노 접수 및 단합회', category:'GATHERING', text:'함께 모여 식사하며 시간을 보낸 단합의 기록.', image:recordGathering },
  { title:'수원 접수', category:'FIELD NOTE', text:'수원에서 남긴 단체 활동 기록.', image:recordTraining },
  { title:'양양 접수', category:'FIELD NOTE', text:'양양에서 남긴 단체 활동 기록.', image:recordYangyang },
  { title:'이태원 접수', category:'FIELD NOTE', text:'이태원에서 함께 남긴 순간.', image:recordItaewon },
  { title:'완전체 식사자리 및 홍대 접수', category:'FULL ASSEMBLY', text:'육미연합 완전체 식사자리와 홍대 활동을 담은 게시물.', image:recordHongdae },
  { title:'오랜만에 상봉', category:'REUNION', text:'다시 모여 함께한 날. 게시물에는 아티스트팀의 불참이 언급되어 있다.', image:recordReunion },
];
function Archive() {
  return <div className="content inner-content archive-content">
    <div className="page-intro"><p className="eyebrow">YUKMI UNION · ARCHIVE</p><h1>기록실 <span>記錄室</span></h1><p>여섯 사람이 함께한 순간을 시간의 순서대로 보관합니다.</p></div>
    <section className="record-feature"><div className="record-feature-copy"><span className="record-number">RECORD 001</span><h2>최초의 육미연합</h2><p>여섯 사람의 인연이 하나의 이름으로 모인 순간. 이 사진을 시작으로 육미연합의 기록을 남긴다.</p><div className="record-stamp">六人一心</div></div><img src={recordFirst} alt="육미연합 최초 단체사진"/></section>
    <div className="archive-heading"><div><p className="eyebrow">THE CHRONICLE</p><h2>함께한 발자취</h2></div><span>7 ENTRIES</span></div>
    <div className="archive-grid">{archiveItems.slice(1).map((item,i)=><article className="archive-card" key={item.title}><div className="archive-image"><img src={item.image} alt={item.title}/><span>{String(i+2).padStart(3,'0')}</span></div><div className="archive-card-body"><div className="archive-meta"><span>{item.category}</span></div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
    
  </div>;
}
function History() {
  return <div className="content inner-content"><div className="page-intro"><p className="eyebrow">CHRONICLE · TIMELINE</p><h1>연합의 기록 <span>沿革</span></h1><p>육미연합이 함께한 순간과 발자취를 기록합니다.</p></div><div className="timeline">{[{title:'최초의 육미연합',desc:'최초 단체사진 및 강원랜드 카지노 접수·단합회 기록'},{title:'수원 · 양양 접수',desc:'수원과 양양에서 남긴 활동 기록'},{title:'이태원 · 완전체 식사자리 및 홍대 접수',desc:'이태원과 홍대에서 함께한 순간'},{title:'오랜만에 상봉',desc:'다시 모여 함께한 모습을 기록'}].map((x,i)=><article className="timeline-item" key={x.title}><span className="timeline-dot"/><h2>{x.title}</h2><p>{x.desc}</p><button className="text-link" onClick={()=>document.querySelector('.nav-link:nth-child(4)')?.click()}>기록실에서 보기 <ArrowUpRight size={13}/></button></article>)}</div></div>;
}
function EmptySection({ eyebrow, title, desc, icon }) { return <div className="content inner-content"><div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title} <span>記錄</span></h1><p>{desc}</p></div><div className="empty-panel"><div className="empty-icon">{icon}</div><h2>아직 등록된 내용이 없습니다.</h2><p>이 공간은 육미연합 구성원들의 기록으로 채워집니다.</p><span>COMING SOON · 六友會</span></div></div>; }

createRoot(document.getElementById('root')).render(<App/>);
