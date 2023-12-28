import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SkeletonLoader from "../../common/SkeletonLoader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import FileMasterListService from "../../services/files.services";

export const BureauReportDashboard = (props) => {
  const [bureauList, setBureauList] = React.useState([]);
  const [fileList, setFileList] = React.useState([]);
  const [selectedBureau, setSelectedBureau] = React.useState("");
  const [fileListLoader, setFileListLoader] = React.useState(false);
  const [fileListError, setFileListError] = React.useState(false);
  const [bureauReport, setBureauReport] = React.useState(null);
  const [bureauReportLoader, setBureauReportLoader] = React.useState(false);
  const [bureauReportError, setBureauReportError] = React.useState(false);
  const [summaryDataPointsToDisplay] = React.useState([
    "TotalCountAllocated",
    "countDispatched",
  ]);
  /* const [summaryDataPointsToDisplay]=React.useState(['TotalCountAllocated','countDispatched']);
    const [tagLabel]=React.useState({
        'TotalCountAllocated' : 'Total Count Allocated',
        'countDispatched': 'Count Dispatched'
    });*/

  const createUniqueBureauList = (bureauDetails) => {
    const uniqueBureauData = [
      ...new Map(
        bureauDetails.map((item) => [item["BureauName"], item])
      ).values(),
    ];
    setBureauList(uniqueBureauData);
  };

  const getFileList = async () => {
    setFileListLoader(true);
    try {
      const bureauDetails = await FileMasterListService.getFileMasterList();
      createUniqueBureauList(bureauDetails.data);
      setFileList(bureauDetails.data);
    } catch (err) {
      console.error("Error fetching list of files for bureau report dashboard ", err);
      setFileListError(true);
    } finally {
      setFileListLoader(false);
    }
  };

  const getReportForBureau = async (bureauName) => {
    setBureauReportLoader(true);
    try {
      const bureauDetails = await FileMasterListService.getBureauReport(
        bureauName
      );
      setBureauReport(bureauDetails.data);
    } catch (err) {
      console.error("Error fetching bureau report ", err);
      setBureauReportError(true);
    } finally {
      setBureauReportLoader(false);
    }
  };

  React.useEffect(() => {
    getFileList();
  }, []);

  React.useEffect(() => {
    if (bureauList.length > 0) {
      getReportForBureau(bureauList[0].BureauName);
      setSelectedBureau(bureauList[0].BureauName);
    }
  }, [bureauList]);

  const handleBureauSelect = (e) => {
    setSelectedBureau(e.target.value);
    getReportForBureau(e.target.value);
  };

  const getSelectedFilesForBureau = (bureauName) =>
    fileList((item) => item.BureauName === bureauName);

  if (fileListLoader || bureauReportLoader) {
    return <SkeletonLoader count={20} />;
  }

  if (fileListError) {
    return <>Error loading bureau list....!!</>;
  }

  if (bureauReportError) {
    return <>Error loading bureau reports....!!</>;
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid xs={12} sm={3}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="select-bureau-dashboard">Select Bureau</InputLabel>
            <Select
              labelId="select-bureau-dashboard"
              id="select-bureau"
              value={selectedBureau}
              label="Select Bureau"
              onChange={(e) => handleBureauSelect(e)}
            >
              {bureauList.map((item, index) => (
                <MenuItem key={index} value={item.BureauName}>
                  {item.BureauName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <TableContainer>
            <Table aria-label="Bureau List">
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    Oldest Data
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    10/05/2023
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    Count of days for which old data is pending
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    44
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    Overall data allocated
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    {bureauReport && bureauReport.oldestDate.overAllDataAllocated}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    Overall cards within TAT
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    {bureauReport && bureauReport.oldestDate.overCardsWithInTAT}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    Overall data pending
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    {bureauReport && bureauReport.oldestDate.overCardsCountPending}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    Overall cards within TAT %
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    {bureauReport && bureauReport.oldestDate.overAllTotalCardWithInTATPercentage} %
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    Overall data outside TAT %
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    {bureauReport && bureauReport.oldestDate.overAllTotalCardOutsideTATPercentage} %
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid xs={12} sm={12}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="bureau report list">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return <TableCell key={index}>{d}</TableCell>;
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Total Count Allocated</TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell key={index}>
                          {
                            bureauReport.oldestDate.TATWiseGroup[d].TotalCountAllocated
                          }
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow>
                  <TableCell>Count Dispatched</TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell key={index}>
                          {
                            bureauReport.oldestDate.TATWiseGroup[d].countDispatched
                          }
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow>
                  <TableCell>Count Pending</TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell key={index}>
                          {bureauReport.oldestDate.TATWiseGroup[d].countPending}
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow>
                  <TableCell>Beyond TAT</TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell d={index}>
                          {bureauReport.oldestDate.TATWiseGroup[d].beyondTAT}
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow>
                  <TableCell>Within TAT</TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell key={index}>
                          {bureauReport.oldestDate.TATWiseGroup[d].withinTAT}
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow>
                  <TableCell>Beyond TAT %</TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell key={index}>
                          { bureauReport.oldestDate.TATWiseGroup[d].beyondTATPercentage } %
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow>
                  <TableCell>Overall % within TAT</TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell key={index}>
                          {
                            bureauReport.oldestDate.TATWiseGroup[d].overallPercentageWithinTAT
                          } %
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow>
                  <TableCell>Outof TAT (Today)</TableCell>
                  {bureauReport &&
                    bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell key={index}>
                          {
                            bureauReport.oldestDate.TATWiseGroup[d].willBeOutsideTATToday
                          }
                        </TableCell>
                      );
                    })}
                </TableRow>
                <TableRow>
                  <TableCell>Outof TAT (Tommorow)</TableCell>
                  {bureauReport && bureauReport.oldestDate.TATDateLIST.map((d, index) => {
                      return (
                        <TableCell key={index}>
                          {
                            bureauReport.oldestDate.TATWiseGroup[d].willBeOutsideTATTommorow
                          }
                        </TableCell>
                      )
                    })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};
