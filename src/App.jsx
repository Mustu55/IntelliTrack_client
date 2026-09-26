import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CaseProvider } from "@/context/CaseContext";
import { CommandPaletteProvider } from "@/context/CommandPaletteContext";
import { AppRoutes } from "@/routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <CaseProvider>
              <CommandPaletteProvider>
                <BrowserRouter>
                  <AppRoutes />
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      style: {
                        background: '#0e1726',
                        color: '#e2e8f0',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                      },
                    }}
                  />
                </BrowserRouter>
              </CommandPaletteProvider>
            </CaseProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export { App };
export default App;
