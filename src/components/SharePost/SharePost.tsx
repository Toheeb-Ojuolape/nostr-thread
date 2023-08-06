import { useState } from "react";
import "./SharePost.css";
import { EventTemplate, Event, getEventHash } from "nostr-tools";
import { RELAYS } from "../../App";
import { toast } from "react-hot-toast";
import { InputProps,ButtonProps,SharePostProps } from "../../types/interfaces";


const Input = ({ setInput, onSubmit, input }: InputProps) => {
  return (
    <div className="input">
      <form onSubmit={onSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What is happening?!"
        />
      </form>
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

function SharePost({ hashtags, pool }: SharePostProps) {
  const [input, setInput] = useState("");
  const albylink =
    "https://chrome.google.com/webstore/detail/alby-bitcoin-lightning-wa/iokeahhehimjnekafflcihljlcjccdbe";

  const onSubmit = async () => {
    if (!window.nostr) {
      toast.error(() => (
        <p className="description">
          Nostr extension not detected.{" "}
          <a href={albylink} className="link" target="_blank">
            Try installing Alby
          </a>
        </p>
      ));
      return;
    }

    // Construct the event object
    const _baseEvent = {
      content: input,
      created_at: Math.round(Date.now() / 1000),
      kind: 1,
      tags: [...hashtags.map((hashtag) => ["t", hashtag])],
    } as EventTemplate;

    // Sign this event (allow the user to sign it with their private key)
    // // check if the user has a nostr extension
    const toastId = toast.loading("Loading")
    try {
      const pubkey = await window.nostr.getPublicKey();
      const sig = await (await window.nostr.signEvent(_baseEvent)).sig;

      const event: Event = {
        ..._baseEvent,
        sig,
        pubkey,
        id: getEventHash({ ..._baseEvent, pubkey }),
      };

      const pubs = pool.publish(RELAYS, event);

      let clearedInput = false;

      pubs.on("ok", () => {
        if (clearedInput) return;
        clearedInput = true;
        setInput("");
        toast.dismiss(toastId)
        toast.success("Post submitted successfully")
      });
    } catch (error) {
      toast.error("Something went wrong. Please try later")
    }

    try {
      const pubkey = await window.nostr.getPublicKey();
      const sig = await (await window.nostr.signEvent(_baseEvent)).sig;
      const event: Event = {
        ..._baseEvent,
        sig,
        pubkey,
        id: getEventHash({ ..._baseEvent, pubkey }),
      };

      const pubs = pool.publish(RELAYS, event);

      let clearedInput = false;

      pubs.on("ok", () => {
        toast.dismiss(toastId)
        clearedInput = true;
        setInput("");
        if (clearedInput) return;
        toast.success("Post submitted successfully")
      });
    } catch (error) {
      toast.dismiss(toastId)
      toast.error("Something went wrong. Please try later")
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="sharePost">
        <img
          className="avatar"
          src="https://pbs.twimg.com/profile_images/1557656097409929216/x7JTvjC-_400x400.jpg"
        />
        <Input
          input={input}
          setInput={setInput}
          hashtags={hashtags}
          pool={pool}
          onSubmit={onSubmit}
        />
      </div>
      <div className="submitButton">
        <Button
          title={"Post"}
          isActive={input.length === 0 ? false : true}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}

export default SharePost;
