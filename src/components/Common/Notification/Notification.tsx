import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../redux/store";
import { SmallUser } from "../../../dtos/User";
import { TfiBell } from "react-icons/tfi";
import TabOne from "./TabOne";

interface User {
  profile: string;
  username: string;
  role: string;
  email: string;
  followers: SmallUser[];
  following: SmallUser[];
}

export const Notification = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tab, setTab] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.userReducer);
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#drop-down")) {
        setDrop(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className={"flex flex-row items-center w-fit h-fit relative"}
        id={"drop-down"}
      >
        <div
          className={
            "h-full border-accent-color-one profile-picture cursor-pointer"
          }
          onClick={() => setDrop((state) => !state)}
        >
          <TfiBell style={{ fontSize: "18px" }} />
        </div>
        {drop && (
          <div
            className={`navbar-dropdown z-50 fixed md:absolute top-24 right-14 md:top-14 md:right-0 bg-white shadow-md rounded 
          flex flex-col w-fit min-w-[383px]`}
            id={"second-component"}
          >
            <div className="flex w-full h-full justify-around items-center text-[13px] p-3">
              {currentUser?.role === "tutor" ? (
                <div
                  className={` border-transparent border ${
                    tab === 0 ? "border-b-primary" : ""
                  } p-3`}
                  onClick={() => setTab(0)}
                >
                  Followers
                </div>
              ) : (
                <div
                  className={` border-transparent border ${
                    tab === 0 ? "border-b-primary" : ""
                  }  p-3`}
                  onClick={() => setTab(0)}
                >
                  Following
                </div>
              )}
            </div>
              <TabOne currentUser={currentUser as User}/>
          </div>
        )}
      </div>
    </>
  );
};