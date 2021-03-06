import { Command } from "./command";
import { User } from "../model/user";

export class SwitchOnCommand extends Command {
    protected getCommandRegexList(): string[] {
        return [
            "turn (.+) on",
            "turn on (.+)",
            "switch (.+) on",
            "switch on (.+)",
            "(.+) on",
            "schalte (.+) an",
            "schalte (.+) ein",
            "mach (.+) an",
            "mache (.+) an",
            "mach das (.+) an",
            "mache das (.+) an",
            "(.+) an"
        ];
    }

    public execute(user: User, params: string[]): Promise<string> {
        return new Promise((resolve) => {
            if (!user.hasBridges()) {
                resolve("Please setup a smart home system first.");
            } else {
                let device: string = user.resolveAlias(params[0]);
                user.getFirstBridge().switchOn(device);
                resolve(`Okay, I've switched ${device} on.`);
            }
        });
    }
}
