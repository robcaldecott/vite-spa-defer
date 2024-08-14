import * as React from "react";
import type { ActionFunctionArgs } from "react-router-dom";
import {
  Await,
  defer,
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import {
  createVehicle,
  getColors,
  getManufacturers,
  getModels,
  getTypes,
} from "../api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/breadcrumb";
import { Button } from "../components/button";
import { Card, CardContent, CardFooter } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { LoadingButton } from "../components/loading-button";
import { Select } from "../components/select";
import { Separator } from "../components/separator";
import { Skeleton } from "../components/skeleton";
import { getColorName } from "../lib/color";
import { privateLoader } from "../lib/private-loader";

export const loader = privateLoader(() =>
  defer({
    manufacturers: getManufacturers(),
    models: getModels(),
    types: getTypes(),
    colors: getColors(),
  }),
);

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const vehicle = await createVehicle({
    vrm: formData.get("vrm") as string,
    manufacturer: formData.get("manufacturer") as string,
    model: formData.get("model") as string,
    type: formData.get("type") as string,
    color: formData.get("color") as string,
    fuel: formData.get("fuel") as string,
    mileage: Number(formData.get("mileage")),
    price: formData.get("price") as string,
    registrationDate: formData.get("registrationDate") as string,
    vin: formData.get("vin") as string,
  });
  return redirect(`/vehicles/${vehicle.id}`);
}

export function Component() {
  const data = useLoaderData() as {
    manufacturers: Promise<Array<string>>;
    models: Promise<Array<string>>;
    types: Promise<Array<string>>;
    colors: Promise<Array<string>>;
  };
  const navigation = useNavigation();

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add Vehicle</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Form method="post">
        <Card>
          <CardContent className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* VRM */}
            <div className="space-y-1">
              <Label htmlFor="vrm">Registration number</Label>
              <Input id="vrm" name="vrm" type="text" required />
            </div>

            <Separator className="col-span-full" />

            {/* Manufacturer */}
            <div className="col-start-1 space-y-1">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <React.Suspense
                fallback={<Skeleton className="h-10 rounded-md" />}
              >
                <Await resolve={data.manufacturers}>
                  {(manufacturers: Array<string>) => (
                    <Select
                      id="manufacturer"
                      name="manufacturer"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select a manufacturer
                      </option>
                      {manufacturers.map((manufacturer) => (
                        <option key={manufacturer}>{manufacturer}</option>
                      ))}
                    </Select>
                  )}
                </Await>
              </React.Suspense>
            </div>

            {/* Model */}
            <div className="space-y-1">
              <Label htmlFor="model">Model</Label>
              <React.Suspense
                fallback={<Skeleton className="h-10 rounded-md" />}
              >
                <Await resolve={data.models}>
                  {(models: Array<string>) => (
                    <Select id="model" name="model" defaultValue="" required>
                      <option value="" disabled>
                        Select a model
                      </option>
                      {models.map((model) => (
                        <option key={model}>{model}</option>
                      ))}
                    </Select>
                  )}
                </Await>
              </React.Suspense>
            </div>

            {/* Type */}
            <div className="space-y-1">
              <Label htmlFor="type">Type</Label>
              <React.Suspense
                fallback={<Skeleton className="h-10 rounded-md" />}
              >
                <Await resolve={data.types}>
                  {(types: Array<string>) => (
                    <Select id="type" name="type" defaultValue="" required>
                      <option value="" disabled>
                        Select a type
                      </option>
                      {types.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </Select>
                  )}
                </Await>
              </React.Suspense>
            </div>

            {/* Color */}
            <div className="space-y-1">
              <Label htmlFor="color">Colour</Label>
              <React.Suspense
                fallback={<Skeleton className="h-10 rounded-md" />}
              >
                <Await resolve={data.colors}>
                  {(colors: Array<string>) => (
                    <Select id="color" name="color" defaultValue="" required>
                      <option value="" disabled>
                        Select a colour
                      </option>
                      {colors.map((color) => (
                        <option key={color}>{getColorName(color)}</option>
                      ))}
                    </Select>
                  )}
                </Await>
              </React.Suspense>
            </div>

            {/* Fuel type */}
            <div className="space-y-1">
              <Label htmlFor="fuel">Fuel</Label>
              <Select id="fuel" name="fuel" defaultValue="" required>
                <option value="" disabled>
                  Select a fuel type
                </option>
                <option value="Gasoline">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </Select>
            </div>

            {/* Mileage */}
            <div className="space-y-1">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="text"
                inputMode="numeric"
                required
                pattern="\d*"
                title="Only whole numbers are allowed"
              />
            </div>

            {/* Registration date */}
            <div className="space-y-1">
              <Label htmlFor="registrationDate">Registration date</Label>
              <Input
                id="registrationDate"
                name="registrationDate"
                type="date"
                required
              />
            </div>

            {/* VIN */}
            <div className="space-y-1">
              <Label htmlFor="vin">VIN</Label>
              <Input id="vin" name="vin" type="text" required />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="text"
                inputMode="numeric"
                required
                pattern="\d*"
                title="Only whole numbers are allowed"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link to="/">Cancel</Link>
            </Button>
            <LoadingButton
              type="submit"
              loading={navigation.state === "submitting"}
            >
              Add
            </LoadingButton>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}
Component.displayName = "Add";
