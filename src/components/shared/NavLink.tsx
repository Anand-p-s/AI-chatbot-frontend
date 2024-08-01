import { Link } from "react-router-dom";

type props = {
  to: string;
  bgcolor: string;
  text: string;
  textcolor: string;
  onClick?: () => Promise<void>;
};

const NavLink = (props: props) => {
  return (
    <>
      <Link
        className="nav-link"
        to={props.to}
        style={{
          background: props.bgcolor,
          color: props.textcolor,
        }}
        onClick={props.onClick}
      >
        {props.text}
      </Link>
    </>
  );
};

export default NavLink;
