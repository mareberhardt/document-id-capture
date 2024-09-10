import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './views/Intro/IntroPage/IntroPage';
import WarmupPage from './views/Warmup/WarmupPage/WarmupPage';
import CameraPage from './views/Camera/CameraPage/CameraPage';
import PreviewPage from './views/Preview/PreviewPage/PreviewPage';
import ConfirmationPage from './views/Confirmation/ConfirmationPage/ConfirmationPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/warmup" element={<WarmupPage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
