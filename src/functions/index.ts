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

export * from "./requests";
export * from "./games";
