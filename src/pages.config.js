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
import Cadastro from './pages/Cadastro';
import Conquistas from './pages/Conquistas';
import Entrar from './pages/Entrar';
import Home from './pages/Home';
import Modulo1Celebracao from './pages/Modulo1Celebracao';
import Modulo1Licao1 from './pages/Modulo1Licao1';
import Modulo1Licao2 from './pages/Modulo1Licao2';
import Modulo1Licao3 from './pages/Modulo1Licao3';
import Modulo1Licao4 from './pages/Modulo1Licao4';
import Modulo1Licao5 from './pages/Modulo1Licao5';
import Modulo2Licao1 from './pages/Modulo2Licao1';
import Modulo2Licao2 from './pages/Modulo2Licao2';
import Modulo2Licao3 from './pages/Modulo2Licao3';
import Modulo2Licao4 from './pages/Modulo2Licao4';
import Modulo2Licao5 from './pages/Modulo2Licao5';
import Modulo2Licao6 from './pages/Modulo2Licao6';
import Modulos from './pages/Modulos';
import Perfil from './pages/Perfil';
import Ranking from './pages/Ranking';
import Splash from './pages/Splash';
import Modulo2Licao7 from './pages/Modulo2Licao7';
import Modulo2Licao8 from './pages/Modulo2Licao8';
import Modulo2Celebracao from './pages/Modulo2Celebracao';
import Modulo3Licao1 from './pages/Modulo3Licao1';
import Modulo3Licao2 from './pages/Modulo3Licao2';
import Modulo3Licao3 from './pages/Modulo3Licao3';
import Modulo3Licao4 from './pages/Modulo3Licao4';
import Modulo3Licao5 from './pages/Modulo3Licao5';
import Modulo3Celebracao from './pages/Modulo3Celebracao';
import Modulo4Licao1 from './pages/Modulo4Licao1';
import Modulo4Licao2 from './pages/Modulo4Licao2';
import Modulo4Licao3 from './pages/Modulo4Licao3';
import Modulo4Celebracao from './pages/Modulo4Celebracao';
import Modulo5Licao1 from './pages/Modulo5Licao1';
import Modulo5Licao2 from './pages/Modulo5Licao2';
import Modulo5Licao3 from './pages/Modulo5Licao3';
import Modulo5Licao4 from './pages/Modulo5Licao4';
import Modulo5Licao5 from './pages/Modulo5Licao5';
import Modulo5Celebracao from './pages/Modulo5Celebracao';


export const PAGES = {
    "Cadastro": Cadastro,
    "Conquistas": Conquistas,
    "Entrar": Entrar,
    "Home": Home,
    "Modulo1Celebracao": Modulo1Celebracao,
    "Modulo1Licao1": Modulo1Licao1,
    "Modulo1Licao2": Modulo1Licao2,
    "Modulo1Licao3": Modulo1Licao3,
    "Modulo1Licao4": Modulo1Licao4,
    "Modulo1Licao5": Modulo1Licao5,
    "Modulo2Licao1": Modulo2Licao1,
    "Modulo2Licao2": Modulo2Licao2,
    "Modulo2Licao3": Modulo2Licao3,
    "Modulo2Licao4": Modulo2Licao4,
    "Modulo2Licao5": Modulo2Licao5,
    "Modulo2Licao6": Modulo2Licao6,
    "Modulos": Modulos,
    "Perfil": Perfil,
    "Ranking": Ranking,
    "Splash": Splash,
    "Modulo2Licao7": Modulo2Licao7,
    "Modulo2Licao8": Modulo2Licao8,
    "Modulo2Celebracao": Modulo2Celebracao,
    "Modulo3Licao1": Modulo3Licao1,
    "Modulo3Licao2": Modulo3Licao2,
    "Modulo3Licao3": Modulo3Licao3,
    "Modulo3Licao4": Modulo3Licao4,
    "Modulo3Licao5": Modulo3Licao5,
    "Modulo3Celebracao": Modulo3Celebracao,
    "Modulo4Licao1": Modulo4Licao1,
    "Modulo4Licao2": Modulo4Licao2,
    "Modulo4Licao3": Modulo4Licao3,
    "Modulo4Celebracao": Modulo4Celebracao,
    "Modulo5Licao1": Modulo5Licao1,
    "Modulo5Licao2": Modulo5Licao2,
    "Modulo5Licao3": Modulo5Licao3,
    "Modulo5Licao4": Modulo5Licao4,
    "Modulo5Licao5": Modulo5Licao5,
    "Modulo5Celebracao": Modulo5Celebracao,
}

export const pagesConfig = {
    mainPage: "Splash",
    Pages: PAGES,
};