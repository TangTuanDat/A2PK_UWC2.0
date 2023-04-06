import React from "react";
import { Meet } from "./_id";

export function MeetIndex() {
  return (
    <p id="zero-state">
      This is TMS Meet List
      <br />
      Check out{" "}
      <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
    </p>
  );
}

const meetRoutes = [
  { path: "", element: <MeetIndex />, index: true },
  {
    path: ":meetId",
    element: <Meet />,
  },
];

export default meetRoutes;
