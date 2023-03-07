export class GenerateId {
	constructor() {
		this.listIDs = [];
		this.numberID = Math.floor(Math.random() * 999999);
	}

	getID() {
		while (this.listIDs.includes(this.numberID)) {
			this.numberID = Math.floor(Math.random() * 999999);
		}

		return this.numberID;
	}
}
