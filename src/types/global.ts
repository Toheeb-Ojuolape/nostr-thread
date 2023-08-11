import { EventTemplate, Event } from "nostr-tools";
import { WebLNProvider } from 'webln';

declare global {
  interface Window {
    nostr: Nostr;
    webln: WebLNProvider
  }
}

type Nostr = {
  getPublicKey(): Promise<string>;
  signEvent(event: EventTemplate): Promise<Event>;
};
