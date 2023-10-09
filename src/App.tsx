import { ArcCard } from "./arc-card";
import "./index.css";

function App() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-900">
      <ArcCard name="Jeroen" title="The GOAT 🐐" since="22 Jul 2022" />
    </main>
  );
}

export default App;
