import React from "react";
import { useRouteError } from "react-router-dom";
import "./error-page.css"
interface ErrorResponse {
  data: string;
  internal: boolean;
  status: number;
  statusText: string;
}

export default function ErrorPage() {
  const error: ErrorResponse = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
}
