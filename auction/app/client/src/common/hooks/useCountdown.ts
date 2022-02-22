import { useEffect, useState } from "react";

export const useCountdown = (start: string) => {
	const [countdown, setCountdown] = useState<string | undefined>(undefined);
	const [isCountdownComplete, setIsCountdownComplete] = useState<
		boolean | undefined
	>(undefined);

	useEffect(() => {
		let sto: ReturnType<typeof setInterval>;

		let then: Date;

		if (start) {
			const [big, small] = start.split(" ");
			const [year, month, day] = big.split("-");
			const [time] = small.split(".");
			const [hours, minutes, seconds] = time.split(":");

			const parsed = [year, month, day, hours, minutes, seconds].map(
				(x) => parseInt(x)
			);

			then = new Date(
				Date.UTC(
					parsed[0],
					parsed[1] - 1,
					parsed[2],
					parsed[3],
					parsed[4],
					parsed[5]
				)
			);
		} else {
			then = new Date();
		}

		then.setDate(then.getDate() + 1);
		// then.setHours(then.getHours() + 1);

		if (start) {
			setInterval(() => {
				const now = new Date();
				const diff = then.valueOf() - now.valueOf();

				// console.log(now.valueOf());
				// console.log(then.valueOf());

				setIsCountdownComplete(diff < 0);

				const hours = Math.max(Math.floor(diff / 1000 / 60 / 60), 0);
				const minutes = Math.max(Math.floor(diff / 1000 / 60) % 60, 0);
				const seconds = Math.max(Math.floor(diff / 1000) % 60, 0);
				setCountdown(`${hours}h ${minutes}m ${seconds}s`);
			}, 1000);
		}

		return () => {
			clearInterval(sto);
		};
	}, [start]);

	return { isCountdownComplete, countdown };
};
