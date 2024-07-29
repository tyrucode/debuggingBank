const accounts = [
	{ id: 1, owner: "Alice", balance: 500 },
	{ id: 2, owner: "Bob", balance: 300 }
];

function getAccountById(id) {
	if (typeof id !== "number") {
		throw new Error("id must be a number not a string");
	}
	for (let account of accounts) {
		if (account.id === id) {
			return account;
		}
	}
}

function createAccount(newAccountId, newAccountOwner) {
	for (let account of accounts) {
		if (account.id === newAccountId) {
			throw new Error("account id is already taken");
		}
	}
	if (typeof newAccountId !== "number") {
		throw new Error("account id must be a number");
	}
	if (newAccountId < 0) {
		throw new Error("account ID cannot be negative");
	}
	if (typeof newAccountOwner !== "string") {
		throw new Error("account owner must be a string");
	}
	if (newAccountOwner.indexOf(" ") !== -1) {
		throw new Error("No spaces in owner name.");
	}
	if (newAccountOwner.indexOf("") !== -1) {
		throw new Error("Can not leave it blank ");
	}
	accounts.push(
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0
		}
	);
}

function depositMoney(accountId, amount) {
	const account = getAccountById(accountId);
	if (typeof amount !== "number") {
		throw new Error("amount must be a number");
	}
	if (amount <= 0) {
		throw new Error("amount must be positive and above 1 dollar.");
	}
	if (amount === Infinity) {
		throw new Error("amount can not be Infinity.");
	}
	if (!account) {
		throw new Error("Account not found");
	}

	account.balance += amount;
}

function withdrawMoney(accountId, amount) {
	const account = getAccountById(accountId);
	if (amount <= 0) {
		throw new Error("amount must be positive and above 1 dollar.");
	}

	if (!account) {
		throw new Error("Account not found.");
	}
	if (account.balance < amount) {
		throw new Error("You cant withdraw more than is in account");
	}

	if (!Number.isFinite(amount)) {
		throw new Error("Invalid value for withdrawal amount: The amount must be a finite number.");
	}
	if (accounts.balance < amount) {
		throw new Error("You cant withdraw more than is in account");
	}
	account.balance -= amount;
}
function transferMoney(fromAccountId, toAccountId, amount) {
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount) {
		throw new Error("Source account not found.");
	}
	if (fromAccount.balance < amount) {
		throw new Error("You cant withdraw more than is in account");
	}
	if (!toAccount) {
		throw new Error("Account Depositing to is not found.");
	}
	if (!Number.isFinite(amount) || amount < 0) {
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}
	fromAccount.balance -= amount;
	toAccount.balance += amount;
}

/*
Hints:

getAccountById("1");F

createAccount(1, "Alice");F
createAccount("3", "Charlie");F
createAccount(-3, "Charlie");F
createAccount(3, ["Charlie"]);F
createAccount(3, "");   F
createAccount(3, "  ");F
depositMoney(1, "300")            F            
depositMoney(1, -300)		FF
depositMoney(1, 0)			F
depositMoney(1, Infinity)	F
depositMoney(4, 100)			this one works no matter what so i am not sure what to do to solve it since it is already solved. 

withdrawMoney(1, -100)		F
withdrawMoney(1, 0)			F
withdrawMoney(1, 501)		F

transferMoney(1, 4, 100)			F
transferMoney(1, 2, 501);		F
transferMoney(1, 2, 100);	F
*/
