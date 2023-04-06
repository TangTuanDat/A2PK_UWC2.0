import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
export interface ContactProps {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  createdAt?: number;
}

export async function getContacts(query: string | null = "") {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: Array<ContactProps> | null = await localforage.getItem(
    "contacts"
  );
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact(contactData?: ContactProps) {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const contact: ContactProps = {
    id,
    createdAt: Date.now(),
    ...contactData,
  };
  const contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string): Promise<ContactProps | null> {
  await fakeNetwork(`contact:${id}`);
  const contacts: Array<ContactProps> | null = await localforage.getItem(
    "contacts"
  );
  const contact = contacts?.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id: string, updates: ContactProps) {
  await fakeNetwork();
  const contacts: Array<ContactProps> | null = await localforage.getItem(
    "contacts"
  );
  const contact = contacts?.find((contact) => contact.id === id);
  if (!contact) throw new Error("No contact found for", { cause: id });
  Object.assign(contact, updates);
  if (contacts) await set(contacts);
  return contact;
}

export async function deleteContact(id: string) {
  const contacts: Array<ContactProps> | null = await localforage.getItem(
    "contacts"
  );
  if (contacts) {
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index > -1) {
      contacts.splice(index, 1);
      await set(contacts);
      return true;
    }
  }
  return false;
}

function set(contacts: Array<ContactProps>) {
  return localforage.setItem("contacts", contacts);
}
interface DependData {
  [key: string]: string;
}

interface FakeCakeProps {
  [key: string]: boolean;
}
// fake a cache so we don't slow down stuff we've already seen
let fakeCache: FakeCakeProps = {};

async function fakeNetwork(key = "") {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
