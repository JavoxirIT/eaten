import { Router } from 'Router/Router';
import ContextProvider from 'provider/ContextProvider';
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}
