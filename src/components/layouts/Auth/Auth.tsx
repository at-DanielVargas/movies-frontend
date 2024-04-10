import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div>
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  );
}

export default Auth;
