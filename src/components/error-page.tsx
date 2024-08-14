import { Link, useLocation, useRouteError } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();

  const message = error instanceof Error ? error.message : "";

  return (
    <Card className="m-6 flex flex-col items-center gap-4 p-6">
      <AlertCircle className="size-10 text-destructive" />
      <h2 className="text-xl font-semibold">Something went wrong!</h2>

      {message && (
        <p className="text-center text-sm text-muted-foreground">{message}</p>
      )}

      {location.pathname !== "/" && (
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
      )}
    </Card>
  );
}
