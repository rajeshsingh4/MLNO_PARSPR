import * as React from "react";
import Alert from "@mui/material/Alert";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import Typography from '@mui/material/Typography';
import AuditLogService from "../../services/auditlog.service";
import { getJSONDiffValue } from "../../common/util";

export default function CardActivity(props) {
    const [cardActivityLoader, setCardActivityLoader] = React.useState(false);
    const [cardActivityError, setcardActivityError] = React.useState(false);
    const [cardActivityLogs, setCardActivityLogs] = React.useState(null);

    const getCardTrackingLogs = async () => {
        setCardActivityLoader(true);
        try {
            const activityLogsForCard = await AuditLogService.getCardAuditLogList(props.id);
            setCardActivityLogs(activityLogsForCard.data);
        } catch (err) {
            console.error("Error fetching list of activity logs ", err);
            setcardActivityError(true);
        } finally {
            setCardActivityLoader(false);
        }
    };

    React.useEffect(() => {
        if (props.id) {
            getCardTrackingLogs();
        }
    }, [props.id]);

    if (!props.id) {
        // show error message
        return (
            <Alert severity="info" color="secondary">
                Please provide card details to see logs
            </Alert>
        );
    }

    if (cardActivityLoader) {
        return <Skeleton animation="wave" />
    }

    if (cardActivityError) {
        // show error message
        return (
            <Alert severity="error" color="error">
                Error retrieving logs. Please try again
            </Alert>
        );
    }

    if (cardActivityLogs && cardActivityLogs.length === 0) {
        // show no activity message
        return (
            <Alert severity="info" color="info">
                There is no activity yet. Modify the details to see the changes here.
            </Alert>
        );
    }

    return (
        <Timeline position="right"  sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
            },
          }}>
            {
                (cardActivityLogs && cardActivityLogs.length > 0) && cardActivityLogs.map((logs, i) => {
                    const diffValues = getJSONDiffValue(JSON.parse(logs.previous), JSON.parse(logs.current));
                    let keys = Object.keys(diffValues);
                    return (
                        <TimelineItem key={i}>
                            <TimelineOppositeContent color="text.secondary">
                                {new Date(logs.createdAt).toLocaleString()}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <>
                                    {
                                        keys.map(key => (
                                            <Stack direction="row" spacing={1} key={key} mt={1} mb={1}>
                                                <Typography variant="body2" component="h2">
                                                    {key}:
                                                </Typography>
                                                <Chip label={diffValues[key]} color="success" size="small" />
                                            </Stack>
                                        ))
                                    }
                                </>
                            </TimelineContent>
                        </TimelineItem>
                    )
                })
            }
        </Timeline>
    );
}
