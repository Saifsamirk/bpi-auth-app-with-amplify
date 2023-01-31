import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import Placeholder from "./pages/Placeholder";
import config from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(config);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AmplifyProvider>
    <Placeholder user={undefined} signOut={undefined} />
  </AmplifyProvider>
);
