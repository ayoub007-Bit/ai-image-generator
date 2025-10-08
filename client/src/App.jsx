import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';


const App = () => {
  return (
    <BrowserRouter /*composant qui active react router dans l'application*/ > 
       <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"> 
          <Link to="/">
            <img src={logo} alt="" className="w-28 object-contain"/>
          </Link>
          <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
       </header>
       <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(92vh-73px)]" /* main c'est le contenu principal*/>  
          <Routes /* contiennent toutes les définitions de page */> 
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
       </main>
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-lg font-semibold text-white">Dall-E</h2>
        <p className="mt-2 text-sm">
          &copy; {new Date().getFullYear()} Ayoub. All rights reserved.
        </p>
      </div>
    </footer>
    </BrowserRouter>


    
  )
}


export default App