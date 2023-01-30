import { useRouteError } from "react-router-dom";
import "../App.css";

function Error() {
  const error: { message: string; statusText: string } = useRouteError() as {
    message: string;
    statusText: string;
  };
  return (
    <div className="error-wrapper">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
export default Error;
