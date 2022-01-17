import { useState, useEffect } from "react";

import {
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Snackbar,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

// functions
import { create } from "./api/user";

function App() {
	// create users
	const [createCount, setCreateCount] = useState(0);

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const handleAddUsers = async (e) => {
		e.preventDefault();

		try {
			const { message, error } = await create(createCount);

			if (error) {
				setSnackbarOpen(true);
				setSnackbarMessage(error);
				return;
			}

			// set snackbar
			setSnackbarOpen(true);
			setSnackbarMessage(message);

			// reset create count
			setCreateCount(0);
		} catch (error) {
			setSnackbarOpen(true);
			setSnackbarMessage(error.message);
		}
	};

	return (
		<div className="bg-light vh-100">
			<div className="container py-4 col-10 col-sm-8">
				<div className="text-center">
					<span className="h1 text-secondary d-block">
						MERN Miscellaneous
					</span>
					<span className="h2 text-primary d-block">
						<i>Pagination</i>
					</span>
				</div>
				<div className="mt-5 pt-4 text-center">
					<div className="row">
						<div className="col-md">
							<TextField
								size="small"
								label="Add users"
								variant="outlined"
								value={createCount || ""}
								type="number"
								className="md-float-right"
								onChange={(e) => setCreateCount(e.target.value)}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												edge="end"
												color="primary"
												onClick={handleAddUsers}
												disabled={
													!createCount ||
													createCount <= 0
												}
											>
												<AddBoxIcon fontSize="large" />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</div>
						<div className="col-md-1" />
						<div className="col-md mt-5 mt-md-0">
							<Button
								className="md-float-right"
								variant="contained"
								size="medium"
							>
								Read User Data
							</Button>
						</div>
					</div>
				</div>
			</div>
			<Snackbar
				open={snackbarOpen}
				onClose={() => setSnackbarOpen(false)}
				autoHideDuration={2000}
				message={snackbarMessage}
			/>
		</div>
	);
}

export default App;
