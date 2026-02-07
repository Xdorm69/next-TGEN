import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { getAuthUser } from "@/utils/authUtil";
import { capText } from "@/utils/textUtils";
import { CreateRoomDialog } from "./_components/CreateRoomDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const page = async () => {
  const user = await getAuthUser();
  const role = user?.role;
  const rooms = [
    {
      _id: 1,
      otp: "122332",
      roomTitle: "Room 1",
      password: "password1",
      createdBy: "admin",
      createdAt: "2023-01-01",
      status: "active",
    },
    {
      _id: 2,
      otp: "122323",
      roomTitle: "Room 2",
      password: "password2",
      createdBy: "admin",
      createdAt: "2023-01-01",
      status: "ended",
    },
    {
      _id: 3,
      otp: "122323",
      roomTitle: "Room 2",
      password: "password2",
      createdBy: "admin",
      createdAt: "2023-01-01",
      status: "waiting",
    },
  ];
  return (
    <section className="py-8">
      <MaxWidthWrapper>
        <div className="flex justify-between">
          {/* WELCOME  */}
          <div>
            <h1 className="heading">Welcome to competitve mode</h1>
            <p className="description">
              Competitive mode is a mode where you can compete with other users
            </p>
          </div>

          {/* LOGGED IN AS  */}
          <div>
            <Badge
              className={cn(
                role === "admin" && "bg-red-500",
                "text-md text-white font-sans",
              )}
            >
              {capText(role || "")}
            </Badge>
          </div>
        </div>

        {/* OPTIONS  */}
        <div className="mt-4">
          <CreateRoomDialog />
        </div>

        {/* AVAILABLE ROOMS  */}
        <div className="mt-8">
          <div className="">
            <h2 className="heading">Available Rooms</h2>
            <p className="description">Available rooms for you to join</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {rooms.map((r) => (
              <Card
                key={r._id}
                className={cn(
                  r.status === "active" &&
                    "bg-emerald-900 border border-green-600",
                  r.status === "waiting" && "bg-yellow-900 border border-yellow-600",
                )}
              >
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      <h1>{r.roomTitle}</h1>
                    </CardTitle>
                    <CardDescription>room des</CardDescription>
                  </div>
                  {/* JOIN BTN  */}
                  {r.status !== "ended" && (
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <p>Room Password: {r.password}</p>
                  <p>Room OTP: {r.otp}</p>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                  <p>{r.createdBy}</p>
                  <p className="text-xs">{r.createdAt}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
