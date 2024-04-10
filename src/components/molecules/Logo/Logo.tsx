import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
function Logo() {
  return (
    <div
      style={{
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "auto",
      }}
    >
      <Link
        to="/"
        style={{
          display: "block",
        }}
      >
        <img
          style={{
            width: "104px",
          }}
          src={logo}
          alt="Netflix"
        />
      </Link>
    </div>
  );
}

export default Logo;
