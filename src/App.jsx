import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Contact from './pages/Contact'
import ArticleDetail from './pages/ArticleDetail'
import Careers from './pages/Careers'
import Services from './pages/Services'
import Insights from './pages/Insights'
import NotFound from './pages/NotFound'
import Chatbot from './components/Chatbot'
import './styles/chatbot.css'

function App() {
  const routerFutureFlags = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  };

  return (
    <HashRouter future={routerFutureFlags}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<ArticleDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </HashRouter>
  )
}

export default App
