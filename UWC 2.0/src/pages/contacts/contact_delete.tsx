import React from "react";
import { redirect } from "react-router-dom";
import { deleteContact } from "./contacts_utils";

export async function action({ params }: any) {
  await deleteContact(params.contactId);
  return redirect(`/contacts`);
}
export default function ContactDelete(): JSX.Element {
  return <></>;
}
