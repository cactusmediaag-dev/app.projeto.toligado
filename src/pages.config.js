/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Splash from './pages/Splash';
import Cadastro from './pages/Cadastro';
import Entrar from './pages/Entrar';
import Home from './pages/Home';
import Modulos from './pages/Modulos';
import Ranking from './pages/Ranking';
import Conquistas from './pages/Conquistas';
import Perfil from './pages/Perfil';
import Modulo1Licao1 from './pages/Modulo1Licao1';
import Modulo1Licao2 from './pages/Modulo1Licao2';
import Modulo1Licao3 from './pages/Modulo1Licao3';
import Modulo1Licao4 from './pages/Modulo1Licao4';
import Modulo1Licao5 from './pages/Modulo1Licao5';
import Modulo1Celebracao from './pages/Modulo1Celebracao';


export const PAGES = {
    "Splash": Splash,
    "Cadastro": Cadastro,
    "Entrar": Entrar,
    "Home": Home,
    "Modulos": Modulos,
    "Ranking": Ranking,
    "Conquistas": Conquistas,
    "Perfil": Perfil,
    "Modulo1Licao1": Modulo1Licao1,
    "Modulo1Licao2": Modulo1Licao2,
    "Modulo1Licao3": Modulo1Licao3,
    "Modulo1Licao4": Modulo1Licao4,
    "Modulo1Licao5": Modulo1Licao5,
    "Modulo1Celebracao": Modulo1Celebracao,
}

export const pagesConfig = {
    mainPage: "Splash",
    Pages: PAGES,
};