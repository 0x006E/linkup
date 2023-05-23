import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flowbite } from "flowbite-react";
import DashboardPage from "./pages/DashboardPage";

const queryClient = new QueryClient();

function App() {
  return (
    <Flowbite >
    <QueryClientProvider client={queryClient}>
      <DashboardPage />
    </QueryClientProvider>
    </Flowbite>
  );
}

export default App;
