import React from "react";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./contact";
import ContactEdit, { action as editAction } from "./contact_edit";
import ContactDelete, { action as deleteAction } from "./contact_delete";
import ContactCreate, { action as createAction } from "./contact_create";

function ContactIndex() {
  return (
    <p id="zero-state">
      Contact List
      <br />
      Select contact showed on the left side
    </p>
  );
}

const contactRoutes = [
  {
    index: true,
    path: "",
    element: <ContactIndex />,
  },
  {
    path: ":contactId",
    element: <Contact />,
    loader: contactLoader,
    action: contactAction,
  },
  {
    path: ":contactId/edit",
    element: <ContactEdit />,
    loader: contactLoader,
    action: editAction,
  },
  {
    path: ":contactId/destroy",
    element: <ContactDelete />,
    action: deleteAction,
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: "create",
    element: <ContactCreate />,
    action: createAction,
    errorElement: <div>Oops! There was an error.</div>,
  },
];

export default contactRoutes;
