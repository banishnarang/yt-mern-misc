import { useState, useEffect } from "react";

import {
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Snackbar,
	Table,
	TableCell,
	tableCellClasses,
	TableHead,
	TableRow,
	TableBody,
	TableContainer,
	Paper,
	TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";

// functions
import { create, read } from "./api/user";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

function App() {
	// create users
	const [createCount, setCreateCount] = useState(0);

	// read users
	const [users, setUsers] = useState([]);
	const [count, setCount] = useState(0);

	// pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const fetchUsers = async () => {
		try {
			const { users, count, error } = await read({
				page: page + 1,
				perPage: rowsPerPage,
			});

			if (error) {
				setSnackbarOpen(true);
				setSnackbarMessage(error);
				return;
			}

			// set users
			setUsers(users);
			setCount(count);

			// set snackbar
			setSnackbarOpen(true);
			setSnackbarMessage(`${users?.length} user(s) fetched`);
		} catch (error) {
			setSnackbarOpen(true);
			setSnackbarMessage(error.message);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [page, rowsPerPage]);

	const handleReadUsers = async (e) => {
		e.preventDefault();
		await fetchUsers();
	};

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

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
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
								onClick={handleReadUsers}
							>
								Read User Data
							</Button>
						</div>
					</div>
				</div>
				<div className="mt-5">
					{count ? (
						<Paper elevation={2}>
							<TableContainer sx={{ maxHeight: 440 }}>
								<Table stickyHeader>
									<TableHead>
										<TableRow>
											<StyledTableCell>
												<b>Index</b>
											</StyledTableCell>
											<StyledTableCell>
												<b>First Name</b>
											</StyledTableCell>
											<StyledTableCell>
												<b>Last Name</b>
											</StyledTableCell>
											<StyledTableCell>
												<b>Email</b>
											</StyledTableCell>
											<StyledTableCell>
												<b>Job Title</b>
											</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{users?.map(
											(
												{
													firstName,
													lastName,
													email,
													job,
												},
												index
											) => (
												<TableRow key={email} hover>
													<TableCell>
														{index + 1}
													</TableCell>
													<TableCell>
														{firstName}
													</TableCell>
													<TableCell>
														{lastName}
													</TableCell>
													<TableCell>
														{email}
													</TableCell>
													<TableCell>{job}</TableCell>
												</TableRow>
											)
										)}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								component="div"
								count={count}
								page={page}
								rowsPerPage={rowsPerPage}
								rowsPerPageOptions={[
									5, 10, 25, 50, 100, 150, 200, 250, 300, 400,
									500, 600, 700, 800, 900, 1000,
								]}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								labelRowsPerPage={
									<div className="mt-3">Rows per page</div>
								}
								labelDisplayedRows={({ from, to, count }) => (
									<div className="mt-3">
										{from}-{to} of{" "}
										{count !== -1
											? count
											: `more than ${to}`}
									</div>
								)}
							/>
						</Paper>
					) : (
						<h4 className="alert alert-primary p-4 text-center">
							No users to display
						</h4>
					)}
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
