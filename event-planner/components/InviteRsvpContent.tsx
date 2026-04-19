import { Button } from "./ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { notFound } from "next/navigation";
import { Form, FormField } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";

export async function InviteRsvpContent({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) {
  const row = await prisma.eventInvite.findFirst({
    where: {
      token,
    },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const rowEvent = row.event;

  const event = {
    id: rowEvent.id,
    title: rowEvent.title,
    description: rowEvent.description,
    location: rowEvent.location,
    eventDate: rowEvent.eventDate ? rowEvent.eventDate.toISOString() : null,
  };

  const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            RSVP
          </Badge>
          <CardTitle>{event.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "No date selected"}
            {event.location ? `- ${event.location}` : ""}
          </p>
          {event.description && (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {event.description}
            </p>
          )}
        </CardHeader>
        {submitted ? (
          <p
            className="
              mb-4 rounded-md border border-(--accent)/50 bg-(--accent)/15 p-3
              text-sm text-[#e9dbff]
            "
          >
            Thanks. Your RSVP has been recorded (or updated).
          </p>
        ) : null}
        <CardContent>
          <Form action={submitRsvpForToken}>
            <FormField>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Your name" />
            </FormField>
            <FormField>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </FormField>
            <FormField>
              <Label htmlFor="status">Attendance</Label>
              <select
                id="status"
                name="status"
                required
                defaultValue="going"
                className="
                  flex h-10 w-full rounded-md border border-(--border)
                  bg-(--surface) px-3 py-2 text-sm text-foreground
                "
              >
                <option value="going">Going</option>
                <option value="maybe">Maybe</option>
                <option value="not_going">Not going</option>
              </select>
            </FormField>
            <Button type="submit">Submit RSVP</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
