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
import Modulo2Celebracao from './pages/Modulo2Celebracao';
import Modulo2Licao1 from './pages/Modulo2Licao1';
import Modulo2Licao2 from './pages/Modulo2Licao2';
import Modulo2Licao3 from './pages/Modulo2Licao3';
import Modulo2Licao4 from './pages/Modulo2Licao4';
import Modulo2Licao5 from './pages/Modulo2Licao5';
import Modulo2Licao6 from './pages/Modulo2Licao6';
import Modulo2Licao7 from './pages/Modulo2Licao7';
import Modulo2Licao8 from './pages/Modulo2Licao8';
import Modulo3Celebracao from './pages/Modulo3Celebracao';
import Modulo3Licao1 from './pages/Modulo3Licao1';
import Modulo3Licao2 from './pages/Modulo3Licao2';
import Modulo3Licao3 from './pages/Modulo3Licao3';
import Modulo3Licao4 from './pages/Modulo3Licao4';
import Modulo3Licao5 from './pages/Modulo3Licao5';
import Modulo4Celebracao from './pages/Modulo4Celebracao';
import Modulo4Licao1 from './pages/Modulo4Licao1';
import Modulo4Licao2 from './pages/Modulo4Licao2';
import Modulo4Licao3 from './pages/Modulo4Licao3';
import Modulo5Celebracao from './pages/Modulo5Celebracao';
import Modulo5Licao1 from './pages/Modulo5Licao1';
import Modulo5Licao2 from './pages/Modulo5Licao2';
import Modulo5Licao3 from './pages/Modulo5Licao3';
import Modulo5Licao4 from './pages/Modulo5Licao4';
import Modulo5Licao5 from './pages/Modulo5Licao5';
import Modulo6Celebracao from './pages/Modulo6Celebracao';
import Modulo6Licao1 from './pages/Modulo6Licao1';
import Modulo6Licao2 from './pages/Modulo6Licao2';
import Modulo6Licao3 from './pages/Modulo6Licao3';
import Modulo7Celebracao from './pages/Modulo7Celebracao';
import Modulo7Licao1 from './pages/Modulo7Licao1';
import Modulo7Licao2 from './pages/Modulo7Licao2';
import Modulo7Licao3 from './pages/Modulo7Licao3';
import Modulo7Licao4 from './pages/Modulo7Licao4';
import Modulo8Celebracao from './pages/Modulo8Celebracao';
import Modulo8Licao1 from './pages/Modulo8Licao1';
import Modulo8Licao2 from './pages/Modulo8Licao2';
import Modulo8Licao3 from './pages/Modulo8Licao3';
import Modulo8Licao4 from './pages/Modulo8Licao4';
import Modulo8Licao5 from './pages/Modulo8Licao5';
import Modulo8Licao6 from './pages/Modulo8Licao6';
import Modulo9Celebracao from './pages/Modulo9Celebracao';
import Modulo9Licao1 from './pages/Modulo9Licao1';
import Modulo9Licao2 from './pages/Modulo9Licao2';
import Modulo9Licao3 from './pages/Modulo9Licao3';
import Modulo9Licao4 from './pages/Modulo9Licao4';
import Modulo9Licao5 from './pages/Modulo9Licao5';
import Modulos from './pages/Modulos';
import Perfil from './pages/Perfil';
import Ranking from './pages/Ranking';
import Biblioteca from './pages/Biblioteca';
import Splash from './pages/Splash';
import Turma from './pages/Turma';
import DemoAcesso from './pages/DemoAcesso';


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
    "Modulo2Celebracao": Modulo2Celebracao,
    "Modulo2Licao1": Modulo2Licao1,
    "Modulo2Licao2": Modulo2Licao2,
    "Modulo2Licao3": Modulo2Licao3,
    "Modulo2Licao4": Modulo2Licao4,
    "Modulo2Licao5": Modulo2Licao5,
    "Modulo2Licao6": Modulo2Licao6,
    "Modulo2Licao7": Modulo2Licao7,
    "Modulo2Licao8": Modulo2Licao8,
    "Modulo3Celebracao": Modulo3Celebracao,
    "Modulo3Licao1": Modulo3Licao1,
    "Modulo3Licao2": Modulo3Licao2,
    "Modulo3Licao3": Modulo3Licao3,
    "Modulo3Licao4": Modulo3Licao4,
    "Modulo3Licao5": Modulo3Licao5,
    "Modulo4Celebracao": Modulo4Celebracao,
    "Modulo4Licao1": Modulo4Licao1,
    "Modulo4Licao2": Modulo4Licao2,
    "Modulo4Licao3": Modulo4Licao3,
    "Modulo5Celebracao": Modulo5Celebracao,
    "Modulo5Licao1": Modulo5Licao1,
    "Modulo5Licao2": Modulo5Licao2,
    "Modulo5Licao3": Modulo5Licao3,
    "Modulo5Licao4": Modulo5Licao4,
    "Modulo5Licao5": Modulo5Licao5,
    "Modulo6Celebracao": Modulo6Celebracao,
    "Modulo6Licao1": Modulo6Licao1,
    "Modulo6Licao2": Modulo6Licao2,
    "Modulo6Licao3": Modulo6Licao3,
    "Modulo7Celebracao": Modulo7Celebracao,
    "Modulo7Licao1": Modulo7Licao1,
    "Modulo7Licao2": Modulo7Licao2,
    "Modulo7Licao3": Modulo7Licao3,
    "Modulo7Licao4": Modulo7Licao4,
    "Modulo8Celebracao": Modulo8Celebracao,
    "Modulo8Licao1": Modulo8Licao1,
    "Modulo8Licao2": Modulo8Licao2,
    "Modulo8Licao3": Modulo8Licao3,
    "Modulo8Licao4": Modulo8Licao4,
    "Modulo8Licao5": Modulo8Licao5,
    "Modulo8Licao6": Modulo8Licao6,
    "Modulo9Celebracao": Modulo9Celebracao,
    "Modulo9Licao1": Modulo9Licao1,
    "Modulo9Licao2": Modulo9Licao2,
    "Modulo9Licao3": Modulo9Licao3,
    "Modulo9Licao4": Modulo9Licao4,
    "Modulo9Licao5": Modulo9Licao5,
    "Modulos": Modulos,
    "Perfil": Perfil,
    "Ranking": Ranking,
    "Biblioteca": Biblioteca,
    "Splash": Splash,
    "Turma": Turma,
    "demo/projeto/livre": DemoAcesso,
}

export const pagesConfig = {
    mainPage: "Splash",
    Pages: PAGES,
};