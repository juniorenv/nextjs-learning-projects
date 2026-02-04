import { NavLinks } from "./nav-links";
import { NavSearch } from "./nav-search";

export const NavBar = () => {
  console.log("navbar rendered");

  return (
    <div>
      <NavSearch />
      <NavLinks />
    </div>
  );
};
