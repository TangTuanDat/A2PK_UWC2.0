import { Button } from "antd";
import React from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";

import { MeetService } from "../../services";
import { MeetProps } from "../../services/meet";

interface LoaderProps {
  meetId: string;
}

export async function loader({ params }: any) {
  const meet = await MeetService.getMeet(params.meetId);
  if (!meet) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return meet;
}

export const Meet: React.FC = () => {
  const meet = useLoaderData() as MeetProps;
  const submit = useSubmit();

  return (
    <div id="meet">
      <div>
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
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <Button type="ghost">Delete</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
