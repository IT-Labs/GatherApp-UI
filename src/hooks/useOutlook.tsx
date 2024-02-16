import { toast } from "react-toastify";
import { SingleEvent } from "ts/types/Event";
import { mapInvitationStatusToGraphApiResponseStatus } from "utils/helpers";
import { getAccessToken, graphConfig } from "utils/msalInstance";

// eslint-disable-next-line consistent-return

type OutlookReturnType = {
  add: (event: SingleEvent) => Promise<any>;
};
const useOutlook = (): OutlookReturnType => {
  const add = async (event: SingleEvent) => {
    const token = await getAccessToken(["User.Read", "Calendars.ReadWrite"]);

    if (!token) return;

    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        subject: event.title,
        organizer: {
          emailAddress: {
            name: event.createdBy,
            address: event.createdByEmail,
          },
        },
        start: { dateTime: event.dateStart, timeZone: "UTC" },
        end: { dateTime: event.dateEnd, timeZone: "UTC" },
        categories: [event.category],
        location: {
          displayName: event.locationUrl,
          locationUri: event.locationUrl,
        },
        attendees: event.invitations?.length
          ? [
              ...event.invitations.map((invitation) => {
                return {
                  status: {
                    response: mapInvitationStatusToGraphApiResponseStatus(
                      invitation.inviteStatus
                    ),
                  },
                  emailAddress: {
                    address: invitation.user.email,
                    name: invitation.user.fullName,
                  },
                };
              }),
            ]
          : [],
        bodyPreview: event.description,
        body: {
          contentType: "html",
          content: `<html><head><meta http-equiv="Content-Type" content="text/html"; charset="utf-8"></head><body><img src="${event.banner}" style="width: 100%; height: auto; margin: 0 auto;" alt="Event Banner"/>${event.description}<p>For more information about the event, please visit <a href="${window.location.href}" target="_blank">this link</a>.</p>
            </body></html>`,
        },
      }),
    };
    try {
      const request = await fetch(graphConfig.graphEventsEndpoint, options);

      const response = await request.json();
      toast.success(
        <a href={response.webLink} rel="noreferrer" target="_blank">
          Successfully added to Outlook. Click here to check it out!
        </a>
      );
    } catch (err) {
      toast.error("Something went wrong, please try again later");
      console.log(err);
    }
  };

  return {
    add,
  };
};

export default useOutlook;
