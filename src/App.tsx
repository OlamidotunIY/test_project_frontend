import { BrowserRouter } from "react-router";
import { AppRouter } from "./AppRouter";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
