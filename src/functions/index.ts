import { AuthorizationError } from "../errors";

type ClientInstance = {
	authorizationToken: string;
};

/**
 * Decorator function used to enforce authorization on specific functions.
 * @param {ClientInstance} target
 * @param {string} propertyKey
 * @param {PropertyDescriptor} descriptor
 * @returns {PropertyDescriptor}
 */
export function AuthorizationRequired(
	target: ClientInstance,
	propertyKey: string,
	descriptor: PropertyDescriptor,
): PropertyDescriptor {
	const caller = descriptor.value;

	descriptor.value = function (...args: any[]) {
		if (!(this as ClientInstance).authorizationToken) {
			throw new AuthorizationError();
		}
		return caller.apply(this, args);
	};

	return descriptor;
}

export function generateRandomDeviceID(): string {
	return [...Array(20)]
		.map(() => Math.floor(Math.random() * 16).toString(16))
		.join("");
}

export * from "./requests";
export * from "./games";
