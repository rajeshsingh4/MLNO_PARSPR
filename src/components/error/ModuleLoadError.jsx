import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

export default function ModuleLoadError({ errorMessage }) {
	return (
		<Card
			sx={{
				marginTop: 4,
				width: {
					xs: '100%',
					sm: '100%',
				},
			}}
		>
			<Stack direction="column" spacing={1}>
				<Box my={1} textAlign="center">
					<ErrorOutline />
					<Typography variant="h5">{errorMessage}</Typography>
				</Box>
			</Stack>
		</Card>
	);
}
