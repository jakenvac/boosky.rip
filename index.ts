import { AtpAgent } from "@atproto/api";
import dotenv from "dotenv";

dotenv.config();

const countDownMessages = [
	"{{time}} until #Halloween. Where the veil between worlds grows thin... 👻🎃",
	"Just {{time}} until #Halloween, and the pumpkins glow and spirits roam! 👻🎃",
	"The witching hour approaches... {{time}} to #Halloween! 🧙🎃",
	"{{time}} until #Halloween. let the gourd times roll! 🎃🎃",
	"Ghosts and ghouls are warming up... {{time}} to #Halloween! 👻🎃",
	"Only {{time}} until we can creep it real on #Halloween! 🦇🎃",
	"The monsters are stirring... {{time}} remain 'til #Halloween! 🧟🎃",
	"Time to get spooky in {{time}}! #Halloween approaches! 🕸🎃",
	"Double, double toil and trouble... {{time}} to #Halloween! 🧙🎃",
	"The spirits are restless... And only {{time}} until #Halloween! 👻🎃",
	"Fasten your sheet belts! Only {{time}} until #Halloween! 🦇🎃",
	"{{time}} until #Halloween. The skeleton crew assembles! 💀🎃",
	"{{time}} until #Halloween and the midnight hour strikes! 🕐🎃",
	"Just {{time}} until #Halloween and we can howl at the moon! 🐺🎃",
	"{{time}} until spooky season reaches its peak! #Halloween draws near 👻🎃",
	"The cobwebs are gathering... {{time}} to #Halloween! 🕷🎃",
	"{{time}} until #Halloween... Then... we unleash our inner boo-geyman! 👻🎃",
	"Brewing up some fun in {{time}}! #Halloween gets closer! 🧪🎃",
	"The jack-o'-lanterns are grinning... {{time}} remain 'til #Halloween! 👻🎃",
	"{{time}} until we can raise hell on #Halloween! 😈🎃",
	"We'll have a fang-tastic time on #Halloween in {{time}}! 🧛🎃",
	"Nearly time to get our ghoul on! Just {{time}} 'til #Halloween 👻🎃",
	"Preparing the broomsticks for #Halloween... {{time}} to takeoff! 🧙🎃",
	"The cauldron is bubbling... {{time}} until it spills over on #Halloween! 🪄🎃",
];

const halloweenDayMessages = [
	"The witching hour has arrived! Happy #Halloween! 🧙🎃",
	"Tonight we creep it real! Happy #Halloween! 👻🎃",
	"The veil is thin and spirits walk among us... Happy #Halloween! 🦇🎃",
	"Double, double toil and trouble, Happy #Halloween you bunch of ghouls! 🧙🎃",
	"The skeleton crew has assembled! Happy #Halloween! 💀🎃",
	"Release the bats! It's #Halloween! 🦇🎃",
	"The jack-o'-lanterns are lit and the spirits are stirring... Happy #Halloween! 👻🎃",
	"Grab your broomsticks, it's time to fly! Happy #Halloween! 🧙🎃",
	"The monsters have come out to play! Happy #Halloween! 🧟🎃",
	"Let's get sheet-faced, it's #Halloween! 👻🎃",
	"Time to unleash your inner boo-geyman! Happy #Halloween! 😈🎃",
	"The cauldron's bubbling over with excitement - Happy #Halloween! 🪄🎃",
	"Calling all ghouls and ghosts, the party starts NOW! 👻🎃",
	"The spookiest night of the year has arrived! 🦇🎃",
	"Tonight we feast on candy and chaos! Happy #Halloween! 🍬🎃",
	"Beware... the haunting has begun! Happy #Halloween! 👻🎃",
	"Time to live our beast life! Happy #Halloween! 🧟🎃",
];

function getRandom(messages: string[]): string {
	return messages[Math.floor(Math.random() * messages.length)];
}

function getMessage(): string {
	const today = new Date();
	const isHalloween = today.getMonth() === 9 && today.getDate() === 31;
	if (isHalloween) return getRandom(halloweenDayMessages);

	const isAfterHalloween = today.getMonth() > 9;
	const nextHalloweenYear = isAfterHalloween
		? today.getFullYear() + 1
		: today.getFullYear();

	const tUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
	const hUTC = Date.UTC(nextHalloweenYear, 9, 31);

	const diff = hUTC - tUTC;
	const daysToGo = Math.floor(diff / (1000 * 60 * 60 * 24));
	const daysToGoMsg = daysToGo > 1 ? `${daysToGo} nights` : `${daysToGo} night`;

	return getRandom(countDownMessages).replace("{{time}}", daysToGoMsg);
}

const agent = new AtpAgent({
	service: "https://bsky.social",
});

await agent.login({
	identifier: process.env.BLUESKY_USERNAME!,
	password: process.env.BLUESKY_PASSWORD!,
});

let message = "@jakenvac.dev I am broken. Pls help :(";
try {
	message = getMessage();
} catch (error) {
	console.log("Something went wrong!!!", error);
}

console.log(`Posting message: ${message}`);

await agent.post({
	text: message,
});
