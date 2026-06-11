import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { UserButton, useUser } from "@clerk/react";

function UserCard() {
  const { user } = useUser();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-center sm:text-left">PROFILE</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center sm:justify-start items-center sm:items-end h-full ">
        <div className=" flex flex-col items-center sm:items-start">
          <div className="flex items-center justify-center p-1 scale-150 ml-2 bg-primary/20 w-fit rounded-full">
            <UserButton />
          </div>
          <div className="mt-4">
            <p className="text-lg font-medium text-center sm:text-left">
              {user?.fullName}
            </p>
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
