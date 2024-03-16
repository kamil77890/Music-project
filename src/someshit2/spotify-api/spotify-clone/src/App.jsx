import { useState } from "react";
import Login from "./Login.jsx";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  return <Login />;
}

export default App;
