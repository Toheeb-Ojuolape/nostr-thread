import { SimplePool } from "nostr-tools";
import { FormEventHandler } from "react";
import { Event } from "nostr-tools";


export interface User {
    name?: string;
    about?: string;
    picture?: string;
    nip05?: string;
  }

export interface InputProps {
  input: string;
  setInput: Function;
  hashtags: string[];
  pool: SimplePool;
  onSubmit: FormEventHandler;
}

export interface ButtonProps {
  title: String;
  isActive: boolean;
  onClick: Function;
}

export interface SharePostProps {
  pool: SimplePool;
  hashtags: string[];
}

export interface Tag {
  name: string;
  color: string;
  id: number;
  slug: string;
}

export interface TagProps {
  tag: Tag;
  setTags: Function;
}

export interface NostrTags {
  setTags: Function;
}

export interface ContentProps {
  content: string;
}

export interface SkeletonFeed {
  feed: Tag;
}

export interface SkeletonProps {
  width: string;
  height: string;
  border: string;
}

export interface NostrSkeletonListProps {
  isLoading: boolean;
}

export interface NostrFeedProps {
  content: string;
  user: {
    name: string;
    image: string;
    pubkey: string;
  };
  created_at: number;
  hashtags: string[];
}

export interface FeedsProps {
  feeds: Event[];
  users: Record<string, User>;
}
