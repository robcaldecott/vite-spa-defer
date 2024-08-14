import type { ActionFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";
import { toast } from "sonner";
import { deleteVehicle } from "../api";

export async function action({ params }: ActionFunctionArgs) {
  await deleteVehicle(params.id as string);
  toast.success("Vehicle successfully deleted");
  return redirect("/");
}

export function Component() {
  return null;
}
