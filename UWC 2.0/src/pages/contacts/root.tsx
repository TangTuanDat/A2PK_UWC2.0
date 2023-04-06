import React from "react";
import { Button } from "antd";
import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ContactProps, getContacts } from "./contacts_utils";

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

interface DataProps {
  contacts: Array<ContactProps>;
  q: string;
}

export function Root() {
  const { contacts, q } = useLoaderData() as DataProps;
  const navigation = useNavigation();
  const navigate = useNavigate();

  const submit = useSubmit();
  useEffect(() => {
    const serachBox = document.getElementById("q") as HTMLInputElement;
    if (serachBox) serachBox.value = q;
  }, [q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div id="sidebar">
        <h1>Meetings</h1>
        <div>
          <Button onClick={() => navigate(`/`)}>Home</Button>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, { replace: !isFirstSearch });
              }}
              className={searching ? "loading" : ""}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />

            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form
            action="create"
            method="get"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Button
              type="primary"
              onClick={(event: any) => {
                submit(event.currentTarget.form);
              }}
            >
              New
            </Button>
          </Form>
        </div>
        <nav>
          {contacts?.length ? (
            <ul>
              {contacts?.map((contact: ContactProps) => (
                <li key={contact.id}>
                  <NavLink
                    to={`${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet /> {/* Render child route elements*/}
      </div>
    </>
  );
}
export default Root;
