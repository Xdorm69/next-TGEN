import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateRoomDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Create Room</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Room Title</Label>
              <Input id="name-1" name="name" placeholder="Room Title" />
            </Field>
            <Field>
              <Label htmlFor="desc-1">Room Description</Label>
              <Input id="desc-1" name="desc" placeholder="Room Description" />
            </Field>
            <Field>
              <Label htmlFor="password-1">Password</Label>
              <Input id="password-1" name="password" placeholder="Password" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
