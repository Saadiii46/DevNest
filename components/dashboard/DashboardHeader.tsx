"use client";

interface Props {
  logOut: () => Promise<void>;
}

const LogoutButton = ({ logOut }: Props) => {
  return (
    <div>
      <button onClick={logOut} className="upload-area-btn">
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
