import { Button } from "antd";
import React from "react";
import { Form, useFetcher, useLoaderData, useSubmit } from "react-router-dom";
import { ContactProps, getContact, updateContact } from "./contacts_utils";

interface LoaderProps {
  contactId: string;
}

export async function loader({ params }: any) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return contact;
}

export async function action({ request, params }: any) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}
const Contact: React.FC = () => {
  const contact = useLoaderData() as ContactProps;
  const submit = useSubmit();

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite {...contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <Button
              type="primary"
              onClick={(event: any) => {
                submit(event.currentTarget.form);
              }}
            >
              Edit
            </Button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Button
              type="ghost"
              onClick={(event: any) => {
                if (confirm("Please confirm you want to delete this record.")) {
                  submit(event.currentTarget.form);
                }
              }}
            >
              Delete
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

const Favorite: React.FC<ContactProps> = ({ favorite }: ContactProps) => {
  const fetcher = useFetcher();

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};

export default Contact;
