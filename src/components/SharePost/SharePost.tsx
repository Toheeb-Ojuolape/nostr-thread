import { useState } from "react";
import "./SharePost.css";

interface InputProps {
  setInput: Function;
}

interface ButtonProps {
  title: String;
  isActive: boolean;
  onClick: Function;
}

const Input = ({ setInput }: InputProps) => {
  return (
    <div className="input">
      <textarea
        onChange={(e) => setInput(e.target.value)}
        placeholder="What is happening?!"
      />
    </div>
  );
};

const Button = ({ title, isActive, onClick }: ButtonProps) => {
  return (
    <button
      onClick={() => onClick()}
      disabled={!isActive}
      className={isActive ? "primaryBtn active" : "primaryBtn inactive"}
    >
      {title}
    </button>
  );
};

function SharePost() {
  const [input, setInput] = useState("");
  const submitPost = () => {
    alert(input);
  };
  return (
    <div style={{"padding":"20px"}}>
      <div className="sharePost">
        <img
          className="avatar"
          src="https://pbs.twimg.com/profile_images/1557656097409929216/x7JTvjC-_400x400.jpg"
        />
        <Input setInput={setInput} />
      </div>
      <div className="submitButton">
        <Button
          title={"Post"}
          isActive={input.length === 0 ? false : true}
          onClick={submitPost}
        />
      </div>
    </div>
  );
}

export default SharePost;
