import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPosts } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useEffect, useState } from "react";
import Editpage from "../scenes/Editpage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Friend = ({
  postId,
  friendId,
  name,
  subtitle,
  userPicturePath,
  postPicturePath,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  // const { firstName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [isUserFriend, setIsUserFriend] = useState(false);
  const [reload, setReload] = useState(false);
  const posts = useSelector((state) => state.posts);

  const handleDelete = async (req, res) => {
    try {
      const response = await fetch(
        `https://backendsocialmedia-3.onrender.com/posts/${postId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const posts = data?.post;
      dispatch(setPosts({ posts }));
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const patchFriend = async () => {
    const response = await fetch(
      `https://backendsocialmedia-3.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    setReload(!reload);
  };
  const getUserFriends = async () => {
    const response = await fetch(
      `https://backendsocialmedia-3.onrender.com/users/${friendId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log("postCreator: ", friendId, "data", data);
    return data;
  };
  async function helper() {
    const friends = await getUserFriends();
    // console.log("friendsOfPostOwner:: ", friendsOfPostOwner);
    setIsUserFriend(isFriend(friends));
  }
  const isFriend = (friends) => {
    let found = false;
    friends?.forEach((friend) => {
      if (friend._id === _id) {
        found = true;
      }
    });
    return found;
  };

  useEffect(() => {
    helper();
  }, [reload]);

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id !== friendId ? (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isUserFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      ) : (
        <Box display="flex" justifyContent="flex-end">
          <Editpage postId={postId} postPicturePath={postPicturePath} />
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Friend;
