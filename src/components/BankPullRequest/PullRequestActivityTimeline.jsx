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
import PullRequestLogService from "../../services/pull-request-log.service";
import { getJSONDiffValue } from "../../common/util";

export default function PullRequestActivityTimeline(props) {
    const [pullRequestActivityLoader, setCardActivityLoader] = React.useState(false);
    const [pullRequestActivityError, setPullRequestActivityError] = React.useState(false);
    const [pullRequestActivityLogs, setPullRequestActivityLogs] = React.useState(null);

    const getCardTrackingLogs = async () => {
        setCardActivityLoader(true);
        try {
            const pullrequestTimelineLogs = await PullRequestLogService.getPullRequestLogsListByQueryParams(`pullRequestId=${props.id}`);
            setPullRequestActivityLogs(pullrequestTimelineLogs.data);
        } catch (err) {
            console.error("Error fetching list of pull request activity logs ", err);
            setPullRequestActivityError(true);
        } finally {
            setCardActivityLoader(false);
        }
    };

    React.useEffect(() => {
        getCardTrackingLogs();
    }, []);

    if (pullRequestActivityLoader) {
        return <Skeleton animation="wave" />
    }

    if (pullRequestActivityError) {
        // show error message
        return (
            <Alert severity="error" color="error">
                Error retrieving logs. Please try again
            </Alert>
        );
    }

    if (pullRequestActivityLogs && pullRequestActivityLogs.length === 0) {
        // show no activity message
        return (
            <Alert severity="info" color="info">
                There is no activity yet. Create/Modify the details to see the changes here.
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
                (pullRequestActivityLogs && pullRequestActivityLogs.length > 0) && pullRequestActivityLogs.map((logs, i) => {
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
