import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import React from "react";
import LoginPage from "./pages/LoginPage";
import Contact from "./pages/Contact";
import Feed from "./pages/Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
