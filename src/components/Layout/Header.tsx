import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex w-full h-min flex-col items-center transition duration-300 text-brown">
      <div className="bg-beige flex w-full items-center justify-center border-b border-gray p-3 transition-all duration-300">
        <Link to="/">
          <span className="font-bold text-brown text-4xl">Kanbun</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
