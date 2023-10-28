import Link from "next/link";

import { type Event, nip19 } from "nostr-tools";

import { getITagValue, getTagValues, parseProfileContent, websiteLink } from "../lib/utils";
import { useProfileStore } from "../stores/profileStore";
import { useRelayStore } from "../stores/relayStore";

import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface Props {
  applicantEvent: Event;
}

export default function Applicant({ applicantEvent }: Props) {
  const { relayUrl } = useRelayStore();
  const { getProfileEvent, setProfileEvent } = useProfileStore();

  // check if user is in cache
  // if not fetch profile

  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 dark:bg-gray-800">
      <div className="flex flex-col gap-y-4">
        <Link href={`/u/${nip19.npubEncode(applicantEvent.pubkey)}`} className="flex cursor-pointer items-center gap-x-2">
          <img
            src={parseProfileContent(getProfileEvent(relayUrl, applicantEvent.pubkey)?.content).picture}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <span className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            {parseProfileContent(getProfileEvent(relayUrl, applicantEvent.pubkey)?.content).name}
          </span>
        </Link>
        <span className="text-gray-900 dark:text-gray-300">{getTagValues("message", applicantEvent.tags)}</span>
      </div>

      <div className="flex gap-x-4">
        {parseProfileContent(getProfileEvent(relayUrl, applicantEvent.pubkey)?.content).website && (
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={websiteLink(parseProfileContent(getProfileEvent(relayUrl, applicantEvent.pubkey)?.content).website)}
            className="relative inline-block"
          >
            <svg className="h-8 w-8 fill-gray-400 hover:fill-gray-500 dark:hover:fill-gray-300" width="24" height="24" viewBox="0 0 24 24">
              <path d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
        )}

        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href={`https://github.com/${getITagValue(getProfileEvent(relayUrl, applicantEvent.pubkey)?.tags, "github")}`}
          className="relative inline-block"
        >
          <svg className="h-8 w-8 fill-gray-400 hover:fill-gray-500 dark:hover:fill-gray-300" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
          </svg>
          <span className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-gray-100 dark:bg-green-400 dark:ring-gray-900">
            <CheckCircleIcon className="h-full w-full text-gray-100 dark:text-gray-900" />
          </span>
        </a>
      </div>
    </div>
  );
}