import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../common/ui/navBar";
import UserImage from "../../common/ui/userImage";
import { getCurrentUser } from "../../store/user";
import HomeHeader from "./components/homeHeader";
import HomeContent from "./components/homenContent";
const Home = () => {
  const user = useSelector(getCurrentUser());
  return (
    <section className="home">
      <div className="container">
        <div className="home__container">
          <NavBar
            check={true}
            children={
              <UserImage
                img={user.picturePath}
                size={50}
                link={`/${user._id}`}
              />
            }
          />
          <HomeHeader />
          <HomeContent following={user.following} />
        </div>
      </div>
    </section>
  );
};

export default Home;
