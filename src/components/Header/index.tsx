import { useState, useEffect } from "react";
import SwitchComponent from "../Switch";

export default function Header() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  function toggleTheme() {
    setDark(!dark);
  }
  return (
    <header>
      <div className="container px-2 mx-auto flex flex-row justify-between py-4">
        <h1 className="text-2xl font-semibold text-indigo-100 font-mono">
          Todo App
        </h1>
        <SwitchComponent checked={dark} onChange={toggleTheme} />
      </div>
    </header>
  );
}
