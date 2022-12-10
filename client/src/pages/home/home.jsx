import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../common/ui/navBar";
import UserImage from "../../common/ui/userImage";
import { findUserById, getCurrentUserId } from "../../store/user";
const Home = () => {
  const userId = useSelector(getCurrentUserId());
  const user = useSelector(findUserById(userId));
  if (userId && user) {
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
                  link={`/${userId}`}
                />
              }
            />
          </div>
        </div>
      </section>
    );
  }
};

export default Home;
