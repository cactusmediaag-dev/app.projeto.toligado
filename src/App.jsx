import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/PoliticaPrivacidade" element={<PoliticaPrivacidade />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [mostrarBanner, setMostrarBanner] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setMostrarBanner(true), 3000);
    });
    window.addEventListener('appinstalled', () => {
      setMostrarBanner(false);
      setDeferredPrompt(null);
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const applyDark = (e) => document.documentElement.classList.toggle('dark', e.matches);
    applyDark(mq);
    mq.addEventListener('change', applyDark);
    return () => mq.removeEventListener('change', applyDark);
  }, []);

  const instalarApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setMostrarBanner(false);
    setDeferredPrompt(null);
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
      {mostrarBanner && deferredPrompt && (
        <div style={{
          position: 'fixed', bottom: '20px', left: '16px', right: '16px',
          background: '#fff', borderRadius: '20px', padding: '16px',
          boxShadow: '0 8px 32px rgba(92,46,127,0.3)', zIndex: 99999,
          border: '2px solid rgba(92,46,127,0.15)',
          animation: 'slideUpFeedback 0.4s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <img src="/logo_to_ligado.png" alt="Tô Ligado"
              style={{ width: '52px', height: '52px', borderRadius: '14px', objectFit: 'cover' }}
              onError={e => e.target.style.display = 'none'}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '16px', fontWeight: '800', color: '#5C2E7F', margin: '0 0 2px' }}>Instalar Tô Ligado 📱</p>
              <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: 1.4 }}>Adicione na tela inicial para acessar mais fácil!</p>
            </div>
            <button onClick={() => setMostrarBanner(false)}
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999', padding: '4px', flexShrink: 0 }}>
              ✕
            </button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setMostrarBanner(false)}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #eee', background: '#fafafa', color: '#999', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Agora não
            </button>
            <button onClick={instalarApp}
              style={{ flex: 2, padding: '12px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #5C2E7F, #9B59B6)', color: '#fff', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 12px rgba(92,46,127,0.4)' }}>
              ⬇️ Instalar agora!
            </button>
          </div>
        </div>
      )}
    </AuthProvider>
  )
}

export default App