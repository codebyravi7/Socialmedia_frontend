import React, { useState } from "react";
import MyPostWidget from "./widgets/MyPostWidget";
import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";

import "./Editpage.css";

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  fontSize: "34px", // Increase the size as needed
  fontWeight: "bold",
  cursor: "pointer", // Make it clickable
  transition: "background-color 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "linear-gradient(to right, #336699, #003366)",
  },
}));

function Editpage({ postId, postPicturePath }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { picturePath } = useSelector((state) => state.user);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mainbody">
      {/* Your main content */}
      <CreateIcon
        className="editIcon"
        sx={{ color: "yellow" }}
        onClick={handleOpenModal}
      />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="parent">
            <div className="modal-content ">
              <MyPostWidget
                picturePath={picturePath}
                postPicturePath={postPicturePath}
                postId={postId}
                isEditing={true}
              />
              <div className="close">
                <StyledCloseIcon
                  className="closeIcon"
                  onClick={handleCloseModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editpage;
