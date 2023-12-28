import React from "react";
import ChartPie from './Chart'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FileMasterListService from '../../services/files.services';

const bureauListSample = [
  {
    id: 1,
    name: 'BureauName_a'
  },
  {
    id: 2,
    name: 'BureauName_b'
  },
  {
    id: 3,
    name: 'BureauName_c1'
  }
]

const BureauComparisionDashBoard = () => {
  const [bureauList, setBureauList] = React.useState(bureauListSample);
  const [fileList, setFileList] = React.useState([]);
  const [selectedBureau, setSelectedBureau] = React.useState([]);
  const [fileListLoader, setFileListLoader] = React.useState(false);
  const [fileListError, setFileListError] = React.useState(false);
  
  const setBureauGroupfun = (bureauDetails) => {
    const uniqueBureauData = [...new Map(bureauDetails.map(item => [item['BureauName'], item])).values()]; 
    setBureauList(uniqueBureauData);
  }
  const getFileList = async () => {
    setFileListLoader(true);
    try {
      const bureauDetails = await FileMasterListService.getFileMasterList();
      setBureauGroupfun(bureauDetails.data);
      setFileList(bureauDetails.data);
    } catch (err) {
      console.error("Error fetching list of files in dashboard ", err);
      setFileListError(true);
    } finally {
      setFileListLoader(false);
    }
  };

  React.useEffect(() => {
    getFileList();
  }, []);

  const handleBureauSelect = (e, bureau) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedBureau([...selectedBureau, bureau.BureauName]);
    } else {
      setSelectedBureau(selectedBureau.filter(bu => bu !== bureau.BureauName));
    }
  }
  
  const getBureauFilesNCards = (bureauName) => fileList.filter(file => file.BureauName === bureauName);

  const getSelectedBureauFiles = () => fileList.filter(file => selectedBureau.includes(file.BureauName));

  if(fileListLoader) {
    return <>Loading....</>
  }

  if (fileListError) {
    return <>Error loading files....</>
  }

  return (
    <div className="bureau-dashboard" id="dashboard">
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <h3>Bureau Dashboard</h3>
          <FormGroup>
            {
              bureauList.map(bureau => (
                <FormControlLabel key={bureau.id} control={<Checkbox onChange={(e) => handleBureauSelect(e, bureau)} />} label={bureau.BureauName} />
              ))
            }
          </FormGroup>
        </Grid>
        <Grid xs={12} md={6} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid xs={12} sm={6} className="overall-matrix">
            <ChartPie files={fileList} bureau={{ BureauName: 'Overall Matrix' }} />
          </Grid>
          {
            selectedBureau.length > 0 && (
              <Grid xs={12} sm={6} className="consolidated-matrix">
                <ChartPie files={getSelectedBureauFiles()} bureau={{ BureauName: 'Consolidated Matrix' }} />
              </Grid>
            )
          }
        </Grid>
        {
          bureauList.map(bureau => selectedBureau.includes(bureau.BureauName) && (
            <Grid xs={12} sm={4} key={bureau.id} className="selected-bureau-matrix">
              <ChartPie files={getBureauFilesNCards(bureau.BureauName)} bureau={bureau} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
};

export default BureauComparisionDashBoard;
