type ClientInstance = {
	authorizationToken: string;
};

export function AuthorizationRequired(
	target: ClientInstance,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	const caller = descriptor.value;

	descriptor.value = function (...args: any[]) {
		if (!(this as ClientInstance).authorizationToken) {
			throw new Error(
				"Authorization is required in order to call this function",
			);
		}
		return caller.apply(this, args);
	};

	return descriptor;
}

export * from "./requests";
export * from "./games";
