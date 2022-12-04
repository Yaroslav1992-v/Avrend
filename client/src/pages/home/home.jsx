import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../common/ui/navBar";
import UserImage from "../../common/ui/userImage";
import { getCurrentUserId } from "../../store/user";
const Home = () => {
  const userId = useSelector(getCurrentUserId());
  return (
    <section className="home">
      <div className="container">
        <div className="home__container">
          <NavBar
            check={true}
            children={
              <UserImage
                img={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuS4q9gPpC3J0mYiARB4gNfrwx3QHNglobOpDduKih&s"
                }
                size={50}
                link={`/users/${userId}`}
              />
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
