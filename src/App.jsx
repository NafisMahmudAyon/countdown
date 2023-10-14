import React, { useState, useEffect } from "react";

function App() {
	const [countdown, setCountdown] = useState({
		options: {
			tag: "div",
			class: "",
			type: "fixed",
			startDate: "2023-10-12T20:29",
			endDate: "2023-12-31T20:29",
			everGreenTime: {
				day: "1",
				hour: "2",
				minute: "11",
				second: "",
			},
		},
	});

	const handleDropdownChange = (e) => {
		setCountdown({
			...countdown,
			options: {
				...countdown.options,
				type: e.target.value,
			},
		});
	};
	const handleStartDateTimeChange = (startDate) => {
		setCountdown({
			...countdown,
			options: {
				...countdown.options,
				startDate: startDate.target.value,
			},
		});
	};
	const handleEndDateTimeChange = (endDate) => {
		setCountdown({
			...countdown,
			options: {
				...countdown.options,
				endDate: endDate.target.value,
			},
		});
	};
	const handleDayChange = (e) => {
		let newDay = e.target.value;
		newDay = Math.max(0, Math.min(newDay, 365));

		setCountdown((prevCountdown) => ({
			...prevCountdown,
			options: {
				...prevCountdown.options,
				everGreenTime: {
					...prevCountdown.options.everGreenTime,
					day: newDay,
				},
			},
		}));
	};

	const handleHourChange = (e) => {
		let newHour = e.target.value;
		newHour = Math.max(0, Math.min(newHour, 24));

		setCountdown((prevCountdown) => ({
			...prevCountdown,
			options: {
				...prevCountdown.options,
				everGreenTime: {
					...prevCountdown.options.everGreenTime,
					hour: newHour,
				},
			},
		}));
	};

	const handleMinuteChange = (e) => {
		let newMinute = e.target.value;
		newMinute = Math.max(0, Math.min(newMinute, 60));

		setCountdown((prevCountdown) => ({
			...prevCountdown,
			options: {
				...prevCountdown.options,
				everGreenTime: {
					...prevCountdown.options.everGreenTime,
					minute: newMinute,
				},
			},
		}));
	};

	const [remindTime, setRemindTime] = useState(0);
	const [remindDay, setRemindDay] = useState(0);
	const [remindHour, setRemindHour] = useState(0);
	const [remindMinute, setRemindMinute] = useState(0);
	const [remindSecond, setRemindSecond] = useState(0);

	useEffect(() => {
		const dateInput1 = countdown.options.startDate;
		const dateInput2 = countdown.options.endDate;
		const currentDate = new Date();
		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		const formattedDate = currentDate.toLocaleDateString(undefined, options);

		const date1 = new Date(dateInput1);
		const date2 = new Date(dateInput2);

		const startDate = currentDate > date1 ? currentDate : date1;

		const timeDifference = Math.abs(date2 - startDate);
		setRemindTime(timeDifference);

		if (currentDate < date1) {
			setRemindTime(0);
		}
	}, [countdown.options.startDate, countdown.options.endDate]);

	useEffect(() => {
		if (remindTime > 0) {
			const intervalId = setInterval(() => {
				const remindTimeX = remindTime - 1000;
				setRemindTime(remindTimeX);
				const days = Math.floor(remindTimeX / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(remindTimeX % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor(
					(remindTimeX % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((remindTimeX % (1000 * 60)) / 1000);
				const formattedDays = String(days).padStart(2, "0");
				const formattedHours = String(hours).padStart(2, "0");
				const formattedMinutes = String(minutes).padStart(2, "0");
				const formattedSeconds = String(seconds).padStart(2, "0");

				setRemindDay(formattedDays);
				setRemindHour(formattedHours);
				setRemindMinute(formattedMinutes);
				setRemindSecond(formattedSeconds);
				if (remindTimeX <= 0) {
					clearInterval(intervalId);
				}
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [remindTime, countdown.options.startDate, countdown.options.endDate]);

	const [remindTimes, setRemindTimes] = useState(0);
	const [remindDays, setRemindDays] = useState(0);
	const [remindHours, setRemindHours] = useState(0);
	const [remindMinutes, setRemindMinutes] = useState(0);
	const [remindSeconds, setRemindSeconds] = useState(0);

	useEffect(() => {
		const days = countdown.options.everGreenTime.day;
		const hours = countdown.options.everGreenTime.hour;
		const minutes = countdown.options.everGreenTime.minute;

		const currentTime = new Date().getTime();
		const endTime =
			currentTime +
			days * 24 * 60 * 60 * 1000 +
			hours * 60 * 60 * 1000 +
			minutes * 60 * 1000;

		const duration = endTime - currentTime;
		setRemindTimes(duration);
	}, [countdown.options.everGreenTime]);

	useEffect(() => {
		if (remindTimes > 0) {
			const intervalId = setInterval(() => {
				const remindTimesX = remindTimes - 1000;
				setRemindTimes(remindTimesX);
				const days = Math.floor(remindTimesX / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(remindTimesX % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor(
					(remindTimesX % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((remindTimesX % (1000 * 60)) / 1000);
				const formattedDays = String(days).padStart(2, "0");
				const formattedHours = String(hours).padStart(2, "0");
				const formattedMinutes = String(minutes).padStart(2, "0");
				const formattedSeconds = String(seconds).padStart(2, "0");

				setRemindDays(formattedDays);
				setRemindHours(formattedHours);
				setRemindMinutes(formattedMinutes);
				setRemindSeconds(formattedSeconds);
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [remindTimes]);

	return (
		<>
			<h1 className="flex justify-center items-center border-b gap-3 w-[100%] text-7xl md:text-5xl sm:text-2xl bg-gray-800 m-0 p-3  text-teal-300  border-teal-300">
				Countdown
			</h1>
			<div className="flex gap-3 w-[100%] h-[100vh] bg-gray-800 m-0 p-0 text-white lg:flex md:flex-row md:flex sm:flex-col max-w-[1280px] mx-auto  ">
				<div className="w-1/4 min-w-[340px] text-center border-r border-teal-300 sm:w-full md:w-1/4 sm:border-0 md:border-r ">
					<h1 className="text-5xl md:text-3xl sm:text-xl my-6 text-teal-300">
						Setting
					</h1>
					<div>
						<select
							id="dropdown"
							value={countdown.options.type}
							onChange={handleDropdownChange}
							className="mb-10 text-teal-900 bg-teal-300  rounded-md py-1 px-2 transition duration-300 ease-in-out ">
							<option value="fixed" className="text-teal-900 bg-teal-100">
								Fixed
							</option>
							<option value="everGreen" className="text-teal-900 bg-teal-100">
								Ever Green
							</option>
						</select>

						{countdown.options?.type === "fixed" && (
							<div className=" ">
								<div className="mb-3 flex flex-col gap-2 items-start ml-4 md:ml-0 sm:ml-0 sm:items-center ">
									<label htmlFor="start-date" className="text-teal-300">
										Start Date :{" "}
									</label>
									<input
										type="datetime-local"
										id="start-date"
										className="border bg-teal-300 border-teal-300 text-teal-900 rounded-md py-1 px-2 transition duration-300 ease-in-out "
										value={countdown.options.startDate}
										onChange={handleStartDateTimeChange}
									/>
								</div>
								<div className="mb-3 flex flex-col gap-2 items-start ml-4 md:ml-0 sm:ml-0 sm:items-center ">
									<label htmlFor="start-date" className="text-teal-300">
										End Date :{" "}
									</label>
									<input
										type="datetime-local"
										id="end-date"
										className="border bg-teal-300 text-teal-900 border-teal-300 rounded-md py-1 px-2 transition duration-300 ease-in-out "
										value={countdown.options.endDate}
										onChange={handleEndDateTimeChange}
									/>
								</div>
							</div>
						)}
						{countdown.options?.type === "everGreen" && (
							<div>
								<div className="flex justify-center gap-1">
									<div className="mb-3 flex flex-col gap-2 items-start ml-4">
										<label htmlFor="" className="text-teal-300">
											Day
										</label>
										<input
											type="number"
											className="border bg-teal-300 text-teal-900 border-teal-300 rounded-md py-1 px-2 transition duration-300 ease-in-out w-2/3 "
											value={countdown.options.everGreenTime.day}
											onChange={handleDayChange}
										/>
									</div>
									<div className="mb-3 flex flex-col gap-2 items-start ml-4">
										<label htmlFor="" className="text-teal-300">
											Hour
										</label>
										<input
											type="number"
											className="border bg-teal-300 text-teal-900 border-teal-300 rounded-md py-1 px-2 transition duration-300 ease-in-out w-2/3 "
											value={countdown.options.everGreenTime.hour}
											onChange={handleHourChange}
										/>
									</div>
									<div className="mb-3 flex flex-col gap-2 items-start ml-4">
										<label htmlFor="" className="text-teal-300">
											Minute
										</label>
										<input
											type="number"
											className="border bg-teal-300 text-teal-900 border-teal-300 rounded-md py-1 px-2 transition duration-300 ease-in-out w-2/3 "
											value={countdown.options.everGreenTime.minute}
											onChange={handleMinuteChange}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="w-3/4  text-center  sm:w-full md:w-3/4 lg:w-3/4 xl:w-3/4 ">
					<h1 className="text-5xl md:text-3xl sm:text-xl my-6 text-teal-300">
						Output
					</h1>

					{countdown.options?.type === "fixed" && (
						<div className="flex justify-center items-center  py-10 px-1 ">
							<div className="bg-teal-300  p-[20px] md:p-[15px] sm:p-[12px] text-teal-900 text-5xl lg:text-5xl md:text-3xl sm:text-lg font-bold shadow-teal-900/40 shadow-lg flex flex-col items-center justify-center rounded-[10px] ">
								{remindDay}
							</div>{" "}
							<div className=" text-teal-300 p-[10px] text-5xl font-bold flex flex-col items-center justify-center rounded-[10px] ">
								:
							</div>{" "}
							<div className="bg-teal-300  p-[20px] md:p-[15px] sm:p-[12px] text-teal-900 text-5xl lg:text-5xl md:text-3xl sm:text-lg font-bold shadow-teal-900/40 shadow-lg flex flex-col items-center justify-center rounded-[10px] ">
								{remindHour}
							</div>{" "}
							<div className=" text-teal-300 p-[10px] text-5xl font-bold flex flex-col items-center justify-center rounded-[10px] ">
								:
							</div>
							<div className="bg-teal-300  p-[20px] md:p-[15px] sm:p-[12px] text-teal-900 text-5xl lg:text-5xl md:text-3xl sm:text-lg font-bold shadow-teal-900/40 shadow-lg flex flex-col items-center justify-center rounded-[10px] ">
								{remindMinute}
							</div>
							<div className=" text-teal-300 p-[10px] text-5xl font-bold flex flex-col items-center justify-center rounded-[10px] ">
								:
							</div>
							<div className="bg-teal-300  p-[20px] md:p-[15px] sm:p-[12px] text-teal-900 text-5xl lg:text-5xl md:text-3xl sm:text-lg font-bold shadow-teal-900/40 shadow-lg flex flex-col items-center justify-center rounded-[10px] ">
								{remindSecond}
							</div>
						</div>
					)}
					{countdown.options?.type === "everGreen" && (
						<div className="flex justify-center items-center  py-10 px-1 ">
							<div className="bg-teal-300  p-[20px] md:p-[15px] sm:p-[12px] text-teal-900 text-5xl lg:text-5xl md:text-3xl sm:text-lg font-bold shadow-teal-900/40 shadow-lg flex flex-col items-center justify-center rounded-[10px] ">
								{remindDays}
							</div>{" "}
							<div className=" text-teal-300 p-[10px] text-5xl font-bold flex flex-col items-center justify-center rounded-[10px] ">
								:
							</div>{" "}
							<div className="bg-teal-300  p-[20px] md:p-[15px] sm:p-[12px] text-teal-900 text-5xl lg:text-5xl md:text-3xl sm:text-lg font-bold shadow-teal-900/40 shadow-lg flex flex-col items-center justify-center rounded-[10px] ">
								{remindHours}
							</div>{" "}
							<div className=" text-teal-300 p-[10px] text-5xl font-bold flex flex-col items-center justify-center rounded-[10px] ">
								:
							</div>
							<div className="bg-teal-300  p-[20px] md:p-[15px] sm:p-[12px] text-teal-900 text-5xl lg:text-5xl md:text-3xl sm:text-lg font-bold shadow-teal-900/40 shadow-lg flex flex-col items-center justify-center rounded-[10px] ">
								{remindMinutes}
							</div>
							<div className=" text-teal-300 p-[10px] text-5xl font-bold flex flex-col items-center justify-center rounded-[10px] ">
								:
							</div>
							<div className="bg-teal-300  p-[20px] md:p-[15px] sm:p-[12px] text-teal-900 text-5xl lg:text-5xl md:text-3xl sm:text-lg font-bold shadow-teal-900/40 shadow-lg flex flex-col items-center justify-center rounded-[10px] ">
								{remindSeconds}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default App;

