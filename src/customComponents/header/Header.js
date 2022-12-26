import miratsLogo from "../../assets/miratsLogo.png";
import Avatar from "../../components/Avatar/Avatar";
import { useState } from "react";
import { Link, parsePath, useLocation } from "react-router-dom";

const Header = () => {
  let [activeNav, setActiveNav] = useState("Dashboard");
  const location = useLocation();

  let navBarData = [
    {
      title: "APPLICATIONS",
      link: "/application",
    },
    {
      title: "ALLOCATIONS",
      link: "/allocation",
    },
  ];

  // console.log(location.pathname);
  return (
    <>
      <div className="h-[62px] header-background flex ">
        <header className="flex px-[100px] justify-between w-full items-center">
          <div className="flex justify-between gap-[50px] items-center">
            <Link to="/">
              <img src={miratsLogo} alt="" />
            </Link>
            <nav className="flex gap-5">
              {navBarData.map((item) => {
                return (
                  <Link to={item.link}>
                    <p
                      className={`text-[#FFFFFF] cursor-pointer transition-all duration-200  ${
                        location.pathname === item.link &&
                        "border-b-4 scale-105"
                      }`}
                      onClick={() => {
                        setActiveNav(item.title);
                      }}
                    >
                      {item.title}
                    </p>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div>
            <Avatar size="md" type="text" variant="primary">
              KS
            </Avatar>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
