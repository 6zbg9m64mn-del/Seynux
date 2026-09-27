import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TestPage from "./pages/test/page.tsx";
import ResultsPage from "./pages/results/page.tsx";
import TrackPage from "./pages/track/page.tsx";
import DashboardPage from "./pages/dashboard/page.tsx";
import HistoryPage from "./pages/history/page.tsx";
import ProfilePage from "./pages/profile/page.tsx";
import PricingPage from "./pages/pricing/page.tsx";
import AdminPage from "./pages/admin/page.tsx";
import MentionsLegalesPage from "./pages/legal/mentions-legales.tsx";
import PrivacyPolicyPage from "./pages/legal/privacy.tsx";
import CguPage from "./pages/legal/cgu.tsx";
import OrientationPage from "./pages/orientation/page.tsx";
import OrientationResultsPage from "./pages/orientation/results.tsx";
import GradesPage from "./pages/grades/page.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="/confidentialite" element={<PrivacyPolicyPage />} />
          <Route path="/cgu" element={<CguPage />} />
          <Route path="/orientation" element={<OrientationPage />} />
          <Route path="/orientation/results/:id" element={<OrientationResultsPage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
