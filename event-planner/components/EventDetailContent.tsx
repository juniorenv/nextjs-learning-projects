import { prisma } from "@/lib/prisma";
import { countByStatus } from "./DashboardContent";
import { notFound } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Form } from "./ui/form";
import { createInviteLinkAction } from "@/lib/actions/events";

export async function EventDetailContent({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) {
  const row = await prisma.event.findFirst({
    where: {
      id: eventId,
      ownerUserId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      eventRsvps: { select: { status: true } },
    },
  });

  if (!row) {
    notFound();
  }

  const counts = countByStatus(row.eventRsvps);

  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate ? row.eventDate.toISOString() : null,
    inviteToken: row.invite?.token ?? null,
    goingCount: counts.goingCount,
    maybeCount: counts.maybeCount,
    notGoingCount: counts.notGoingCount,
  };

  const createInviteActionForEvent = createInviteLinkAction.bind(null, row.id);

  const inviteUrl = event.inviteToken
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invite/${event.inviteToken}`
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {event.title}
          </h1>
          <p>
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "No date selected"}

            {event.location ? `- ${event.location}` : ""}
          </p>
          {event.description ? (
            <p className="bg-muted-foreground text-sm">{event.description}</p>
          ) : null}
        </div>
        <Button asChild variant="outline">
          <Link href={"/dashboard"}>Back</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <Badge>Going: {event.goingCount}</Badge>
        <Badge variant="secondary">Maybe: {event.maybeCount}</Badge>
        <Badge variant="outline">Not Going: {event.notGoingCount}</Badge>
      </div>

      <Card>
        <CardHeader>Invite Link</CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Share this link with guests so they can RSVP without creating an
            account.
          </p>

          {inviteUrl ? (
            <div
              className="
                rounded-md border border-border bg-(--surface) p-3 text-sm
              "
            >
              {inviteUrl}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No invite link generated yet.
            </p>
          )}

          <Form action={createInviteActionForEvent}>
            <Button type="submit">Generate Link</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
