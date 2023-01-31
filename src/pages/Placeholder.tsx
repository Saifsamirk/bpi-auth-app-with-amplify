import { withAuthenticator, Button } from "@aws-amplify/ui-react";
import { AmplifyUser, AuthEventData } from "@aws-amplify/ui";
import "../App.css";

function Placeholder({
  user,
  signOut,
}: {
  user: AmplifyUser | undefined;
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}) {
  return (
    <div className="App">
      <h1>Email: {user?.attributes?.email}</h1>
      <Button variation="primary" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
}

export default withAuthenticator(Placeholder, {
  signUpAttributes: ["email"],
  socialProviders: ["apple", "facebook"],
});
